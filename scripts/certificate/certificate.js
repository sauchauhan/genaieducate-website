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

// Logos live in /public (shared with the Next.js site). Embed them as base64
// data URIs so they resolve regardless of the render engine's working directory.
const LOGO_PATH = path.join(__dirname, '..', '..', 'public', 'Genai_educate_OfficialLogo.png');
// Icon-only crop of the same logo (no wordmark) for the small signature seal,
// where the full lockup is too small to read.
const SEAL_LOGO_PATH = path.join(__dirname, '..', '..', 'public', 'genai-icon-mark.png');

function loadImageDataUri(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.error(`Warning: could not read image at ${filePath}, certificate will render without it.`);
    return '';
  }
}

// ---- BRAND CONSTANTS (shared across all courses, never change per course) ----
const BRAND = {
  instituteName: 'GenAIEducate',
  logoSrc: loadImageDataUri(LOGO_PATH),
  sealLogoSrc: loadImageDataUri(SEAL_LOGO_PATH),
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
    sealLogoSrc: BRAND.sealLogoSrc,
    instituteName: BRAND.instituteName,

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
