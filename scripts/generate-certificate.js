// Local certificate PDF generator for GenAIEducate.
// Fills scripts/certificate/certificate_template.html (via renderCertificateHTML)
// with the student's details and renders it to PDF using the system's
// installed Edge/Chrome in headless mode (no puppeteer/playwright dependency needed).
//
// Usage:
//   node scripts/generate-certificate.js --name "Rahul Sharma" --date "June 2026" [--course appliedGenAI] [--id GEE-2026-XXXXXX]
//
// The certificate ID is auto-generated (random, non-sequential) unless you pass
// --id explicitly. If Google Sheets credentials are present in .env.local, the
// row is appended to the sheet automatically; otherwise it's printed for you
// to add by hand. Google Sheet columns: certificate_id, student_name,
// program_name, completion_date, issue_date, status

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execFile } = require('child_process');
const QRCode = require('qrcode');
const { renderCertificateHTML } = require('./certificate/certificate');
const { COURSES } = require('./certificate/courses');

const VERIFY_BASE_URL = 'https://genaieducate.com/verify';
const DEFAULT_COURSE_KEY = 'appliedGenAI';
const SHEET_RANGE = 'Sheet1!A:F';

// Crockford Base32: excludes I, L, O, U to avoid confusion with 1, 1, 0, V.
// Keeps generated IDs unambiguous when read aloud or typed by hand.
const ID_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const ID_SUFFIX_LENGTH = 6;

const BROWSER_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const value = argv[i + 1];
      args[key] = value;
      i += 1;
    }
  }
  return args;
}

// Loads scripts/../.env.local into process.env (without overwriting anything
// already set). Standalone Node scripts don't get Next.js's automatic env
// loading, and pulling in the `dotenv` package for six lines of parsing isn't
// worth a new dependency.
function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) return;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    const isQuoted = (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));
    if (isQuoted) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  });
}

function findBrowser() {
  const found = BROWSER_CANDIDATES.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error(
      'Could not find Edge or Chrome. Install one, or edit BROWSER_CANDIDATES in this script with the correct path.'
    );
  }
  return found;
}

// Resolve which course config (highlights, skills, footer text, authority) to
// render. --course selects a courses.js key directly; --program (the value
// that also goes in the Google Sheet's program_name column) is matched
// against each course's programName as a fallback.
function resolveCourse({ course, program }) {
  if (course) {
    if (!COURSES[course]) {
      throw new Error(`Unknown course key "${course}". Available: ${Object.keys(COURSES).join(', ')}`);
    }
    return COURSES[course];
  }
  if (program) {
    const match = Object.values(COURSES).find(
      (c) => c.programName.toLowerCase() === program.toLowerCase()
    );
    if (match) return match;
  }
  return COURSES[DEFAULT_COURSE_KEY];
}

function randomIdSuffix() {
  let out = '';
  for (let i = 0; i < ID_SUFFIX_LENGTH; i += 1) {
    out += ID_ALPHABET[crypto.randomInt(ID_ALPHABET.length)];
  }
  return out;
}

function yearFromDate(dateStr) {
  const match = dateStr.match(/\d{4}/);
  return match ? match[0] : String(new Date().getFullYear());
}

// Returns a Sheets client + spreadsheetId, or null if credentials aren't
// configured (the script then falls back to printing the row for manual entry).
function getSheetsContext() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!spreadsheetId || !email || !key) return null;

  const { google } = require('googleapis');
  const auth = new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, '\n'),
    // Full read/write scope: this script needs to append rows and check for ID
    // collisions. The public /api/verify-certificate route requests
    // spreadsheets.readonly regardless, so a leak of that route never grants
    // write access even though the underlying service account can write here.
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return { sheets: google.sheets({ version: 'v4', auth }), spreadsheetId };
}

async function fetchExistingCertificateIds({ sheets, spreadsheetId }) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A2:A',
  });
  const rows = response.data.values || [];
  return new Set(rows.map((row) => (row[0] || '').trim().toUpperCase()).filter(Boolean));
}

async function appendSheetRow({ sheets, spreadsheetId }, row) {
  // RAW (not USER_ENTERED): dates like "July 2026" are display text, not real
  // dates. USER_ENTERED lets Sheets parse them and silently store a date
  // serial number instead of the string.
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: SHEET_RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}

async function generateCertificate({ id, name, date, issueDate, course, program }) {
  const outputDir = path.join(__dirname, '..', 'certificates');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, `${id}.pdf`);

  const verifyUrl = `${VERIFY_BASE_URL}?id=${encodeURIComponent(id)}`;
  const qrDataUri = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 300 });
  const courseConfig = resolveCourse({ course, program });

  const filledHtml = renderCertificateHTML(courseConfig, {
    studentName: name,
    certificateId: id,
    issuedOn: issueDate,
    completedOn: date,
    verifyUrl,
    qrCode: `<img src="${qrDataUri}" alt="Verify QR">`,
  });

  const tmpHtmlPath = path.join(os.tmpdir(), `genaieducate-cert-${id}-${Date.now()}.html`);
  fs.writeFileSync(tmpHtmlPath, filledHtml, 'utf8');

  const browserPath = findBrowser();

  try {
    await new Promise((resolve, reject) => {
      execFile(
        browserPath,
        [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          `--print-to-pdf=${outputPath}`,
          '--no-pdf-header-footer',
          `file:///${tmpHtmlPath.replace(/\\/g, '/')}`,
        ],
        (error) => {
          if (error) reject(error);
          else resolve();
        }
      );
    });
  } finally {
    fs.unlinkSync(tmpHtmlPath);
  }

  return { outputPath, programName: courseConfig.programName };
}

async function main() {
  loadEnvLocal();
  const args = parseArgs(process.argv.slice(2));

  if (!args.name || !args.date) {
    console.error('Usage: node scripts/generate-certificate.js --name "Rahul Sharma" --date "June 2026" [--course appliedGenAI] [--id GEE-2026-XXXXXX]');
    console.error(`Available courses: ${Object.keys(COURSES).join(', ')}`);
    process.exit(1);
  }

  const name = args.name.trim();
  const date = args.date.trim();
  const course = args.course ? args.course.trim() : undefined;
  const program = args.program ? args.program.trim() : undefined;
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const sheetsContext = getSheetsContext();
  let existingIds = null;
  if (sheetsContext) {
    try {
      existingIds = await fetchExistingCertificateIds(sheetsContext);
    } catch (error) {
      console.error('Warning: could not read existing certificate IDs from the Sheet (skipping collision check):', error.message);
    }
  }

  let id;
  if (args.id) {
    id = args.id.trim().toUpperCase();
    if (existingIds && existingIds.has(id)) {
      console.error(`Certificate ID ${id} already exists in the Sheet. Choose a different ID.`);
      process.exit(1);
    }
  } else {
    const year = yearFromDate(date);
    id = `GEE-${year}-${randomIdSuffix()}`;
    let attempts = 0;
    while (existingIds && existingIds.has(id) && attempts < 5) {
      id = `GEE-${year}-${randomIdSuffix()}`;
      attempts += 1;
    }
  }

  const { outputPath, programName } = await generateCertificate({ id, name, date, issueDate, course, program });
  console.log(`Certificate generated: ${outputPath} (ID: ${id})`);

  const sheetRow = [id, name, programName, date, issueDate, 'active'];

  if (!sheetsContext) {
    console.log('Google Sheets credentials not found in .env.local — add this row manually:');
    console.log(`  ${sheetRow.join(' | ')}`);
    return;
  }

  try {
    await appendSheetRow(sheetsContext, sheetRow);
    console.log('Added the row to the Google Sheet automatically.');
  } catch (error) {
    console.error('Could not add the row to the Google Sheet automatically:', error.message);
    console.log('Add it manually:');
    console.log(`  ${sheetRow.join(' | ')}`);
  }
}

main().catch((error) => {
  console.error('Failed to generate certificate:', error);
  process.exit(1);
});
