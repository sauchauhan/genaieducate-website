// Local certificate PDF generator for GenAIEducate.
// Fills scripts/certificate-template.html with the student's details and
// renders it to PDF using the system's installed Edge/Chrome in headless
// mode (no puppeteer/playwright dependency needed).
//
// Usage:
//   node scripts/generate-certificate.js --id GEE-2026-0001 --name "Rahul Sharma" --date "June 2026" --program "Applied GenAI Engineering Program"
//
// Add the row to the Google Sheet yourself; this script only produces the PDF.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');
const QRCode = require('qrcode');

const VERIFY_BASE_URL = 'https://genaieducate.com/verify';
const DEFAULT_PROGRAM = 'Applied GenAI Engineering Program';
const TEMPLATE_PATH = path.join(__dirname, 'certificate-template.html');
const LOGO_PATH = path.join(__dirname, '..', 'public', 'logo.png');

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

function findBrowser() {
  const found = BROWSER_CANDIDATES.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error(
      'Could not find Edge or Chrome. Install one, or edit BROWSER_CANDIDATES in this script with the correct path.'
    );
  }
  return found;
}

function toDataUri(filePath, mimeType) {
  const buffer = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

function fillTemplate(template, values) {
  return Object.entries(values).reduce(
    (html, [key, value]) => html.split(`{{${key}}}`).join(value),
    template
  );
}

async function generateCertificate({ id, name, date, program }) {
  const outputDir = path.join(__dirname, '..', 'certificates');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, `${id}.pdf`);

  const verifyUrl = `${VERIFY_BASE_URL}?id=${encodeURIComponent(id)}`;
  const qrDataUri = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 300 });
  const logoDataUri = toDataUri(LOGO_PATH, 'image/png');

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const filledHtml = fillTemplate(template, {
    student_name: name,
    program_name: program,
    completion_date: date,
    cert_id: id,
    issue_date: issueDate,
    logo_src: logoDataUri,
    qr_code_src: qrDataUri,
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

  return outputPath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.id || !args.name || !args.date) {
    console.error('Usage: node scripts/generate-certificate.js --id GEE-2026-0001 --name "Rahul Sharma" --date "June 2026" [--program "Applied GenAI Engineering Program"]');
    process.exit(1);
  }

  const options = {
    id: args.id.trim().toUpperCase(),
    name: args.name.trim(),
    date: args.date.trim(),
    program: (args.program || DEFAULT_PROGRAM).trim(),
  };

  const outputPath = await generateCertificate(options);
  console.log(`Certificate generated: ${outputPath}`);
  console.log('Remember to add a matching row to the Google Sheet:');
  console.log(`  ${options.id} | ${options.name} | ${options.program} | ${options.date} | <issue date> | active`);
}

main().catch((error) => {
  console.error('Failed to generate certificate:', error);
  process.exit(1);
});
