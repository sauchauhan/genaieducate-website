// ============================================================
// certificate.js
// Fills certificate_template.html with course + student data.
//
// USAGE (in your Puppeteer pipeline):
//   const { renderCertificateHTML } = require('./certificate');
//   const { COURSES } = require('./courses');
//   const html = renderCertificateHTML(COURSES.appliedGenAI, {
//     studentName: 'Aisha Khan',
//     certificateId: 'GEE-2026-0001',
//     issuedOn: 'July 18, 2026',
//     completedOn: 'June 29, 2026',
//     verifyUrl: 'https://genaieducate.com/verify/GEE-2026-0001',
//     qrCode: '<img src="data:image/png;base64,...">' // your generated QR
//   });
//   // then: page.setContent(html) -> page.pdf(...)
// ============================================================

const fs = require('fs');
const path = require('path');
const { ICONS } = require('./icons');

// Logo lives in /public (shared with the Next.js site). Embed it as a base64
// data URI so it resolves regardless of the render engine's working directory.
const LOGO_PATH = path.join(__dirname, '..', '..', 'public', 'Genai_educate_OfficialLogo.png');

function loadLogoDataUri() {
  try {
    const buffer = fs.readFileSync(LOGO_PATH);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.error(`Warning: could not read logo at ${LOGO_PATH}, certificate will render without it.`);
    return '';
  }
}

// ---- BRAND CONSTANTS (shared across all courses, never change per course) ----
const BRAND = {
  instituteName: 'GenAIEducate',
  logoSrc: loadLogoDataUri(),
  sealText: 'GE',
};

// ---- Build the 4 highlight card HTML blocks from a course's highlights array ----
function buildHighlightCards(highlights) {
  // highlights: array of exactly 4 objects { icon: 'iconName', text: 'Line one<br>Line two' }
  return highlights.map(function (h) {
    const iconSvg = ICONS[h.icon];
    if (!iconSvg) {
      throw new Error('Unknown icon name: "' + h.icon + '". Check icons.js for valid names.');
    }
    return (
      '<div class="highlight-card">' +
        '<div class="hl-icon">' + iconSvg + '</div>' +
        '<div class="hl-text">' + h.text + '</div>' +
      '</div>'
    );
  }).join('\n');
}

// ---- Build the skill tag HTML blocks from a course's skills array ----
function buildSkillTags(skills) {
  return skills.map(function (s) {
    return '<div class="skill-tag">' + s + '</div>';
  }).join('\n');
}

// ---- Shorten a verify URL for display under the QR (strips protocol) ----
function shortenUrl(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

// ---- Main render function ----
function renderCertificateHTML(course, student) {
  const templatePath = path.join(__dirname, 'certificate_template.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  // QR: student.qrCode should be an <img> or <svg> string produced by your
  // existing QR generator. If not provided, leave a blank frame.
  const qrCode = student.qrCode || '';

  // verifyUrlShort: prefer explicit, else derive from full verifyUrl
  const verifyUrlShort = student.verifyUrlShort ||
    (student.verifyUrl ? shortenUrl(student.verifyUrl) : 'genaieducate.com/verify');

  const replacements = {
    // Brand (fixed)
    logoSrc: BRAND.logoSrc,
    instituteName: BRAND.instituteName,
    sealText: BRAND.sealText,

    // Course-level (set once per course)
    programName: course.programName,
    certificateType: course.certificateType,
    highlightCards: buildHighlightCards(course.highlights),
    skillTags: buildSkillTags(course.skills),
    footerText: course.footerText,
    authorityTitle: course.authorityTitle,

    // Student-level (per certificate)
    studentName: student.studentName,
    certificateId: student.certificateId,
    issuedOn: student.issuedOn,
    completedOn: student.completedOn,
    qrCode: qrCode,
    verifyUrlShort: verifyUrlShort,
  };

  // Replace every {{key}} occurrence
  Object.keys(replacements).forEach(function (key) {
    const pattern = new RegExp('{{' + key + '}}', 'g');
    html = html.replace(pattern, replacements[key]);
  });

  return html;
}

module.exports = { renderCertificateHTML, BRAND };
