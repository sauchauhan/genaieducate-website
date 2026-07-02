// Local certificate PDF generator for GenAIEducate.
// Usage:
//   node scripts/generate-certificate.js --id GEE-2026-0001 --name "Rahul Sharma" --date "June 2026" --program "Applied GenAI Engineering Program"
//
// Add the row to the Google Sheet yourself; this script only produces the PDF.

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

const COLORS = {
  forest: '#1E5C4A',
  rust: '#C94F1E',
  dark: '#2A2A2A',
  cream: '#FFF8F0',
  gold: '#C9A227',
};

const VERIFY_BASE_URL = 'https://genaieducate.com/verify';
const DEFAULT_PROGRAM = 'Applied GenAI Engineering Program';

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

async function generateCertificate({ id, name, date, program }) {
  const outputDir = path.join(__dirname, '..', 'certificates');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, `${id}.pdf`);

  const verifyUrl = `${VERIFY_BASE_URL}?id=${encodeURIComponent(id)}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 300 });
  const qrImage = Buffer.from(qrDataUrl.split(',')[1], 'base64');

  const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
  doc.pipe(fs.createWriteStream(outputPath));

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // Top forest bar with gold accent line
  doc.rect(0, 0, pageWidth, 24).fill(COLORS.forest);
  doc.rect(0, 24, pageWidth, 3).fill(COLORS.gold);

  // Bottom forest bar with gold accent line
  doc.rect(0, pageHeight - 27, pageWidth, 3).fill(COLORS.gold);
  doc.rect(0, pageHeight - 24, pageWidth, 24).fill(COLORS.forest);

  // Rust side accent stripes
  doc.rect(0, 27, 10, pageHeight - 54).fill(COLORS.rust);
  doc.rect(pageWidth - 10, 27, 10, pageHeight - 54).fill(COLORS.rust);

  // Heading: GenAI (forest) + Educate (rust)
  const headingY = 70;
  doc.font('Helvetica-Bold').fontSize(36).fillColor(COLORS.forest);
  const genaiWidth = doc.widthOfString('GenAI');
  doc.font('Helvetica-Bold').fontSize(36).fillColor(COLORS.rust);
  const educateWidth = doc.widthOfString('Educate');
  const totalWidth = genaiWidth + educateWidth;
  const startX = (pageWidth - totalWidth) / 2;

  doc.fillColor(COLORS.forest).text('GenAI', startX, headingY, { continued: false, lineBreak: false });
  doc.fillColor(COLORS.rust).text('Educate', startX + genaiWidth, headingY, { continued: false, lineBreak: false });

  doc.font('Helvetica').fontSize(11).fillColor(COLORS.dark)
    .text('INSTITUTE FOR GENERATIVE AI', 0, headingY + 44, { align: 'center', characterSpacing: 2 });

  // Certificate of completion label
  doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.dark)
    .text('CERTIFICATE OF COMPLETION', 0, headingY + 78, { align: 'center', characterSpacing: 4 });

  // Divider line
  const dividerY = headingY + 108;
  const dividerWidth = 120;
  doc.moveTo((pageWidth - dividerWidth) / 2, dividerY)
    .lineTo((pageWidth + dividerWidth) / 2, dividerY)
    .lineWidth(1.5)
    .strokeColor(COLORS.gold)
    .stroke();

  // Student name (hero element)
  doc.font('Times-Bold').fontSize(40).fillColor(COLORS.dark)
    .text(name, 0, dividerY + 28, { align: 'center' });

  // "has successfully completed the"
  doc.font('Helvetica').fontSize(13).fillColor(COLORS.dark)
    .text('has successfully completed the', 0, dividerY + 82, { align: 'center' });

  // Program name
  doc.font('Helvetica-Bold').fontSize(20).fillColor(COLORS.forest)
    .text(program, 0, dividerY + 104, { align: 'center' });

  // Completion date
  doc.font('Helvetica').fontSize(12).fillColor(COLORS.dark)
    .text(`Completed: ${date}`, 0, dividerY + 138, { align: 'center' });

  // Bottom row: signature (left) + QR code (right)
  const bottomRowY = pageHeight - 130;

  const sigX = 90;
  doc.moveTo(sigX, bottomRowY + 40)
    .lineTo(sigX + 200, bottomRowY + 40)
    .lineWidth(1)
    .strokeColor(COLORS.dark)
    .stroke();
  doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.dark)
    .text('Saurav Chauhan, Founder', sigX, bottomRowY + 46, { width: 200, align: 'center' });
  doc.font('Helvetica').fontSize(10).fillColor(COLORS.dark)
    .text('GenAIEducate', sigX, bottomRowY + 60, { width: 200, align: 'center' });

  // Certificate ID, monospace, bottom center
  doc.font('Courier').fontSize(11).fillColor(COLORS.dark)
    .text(id, 0, bottomRowY + 95, { align: 'center' });

  // QR code, bottom right
  const qrSize = 80;
  const qrX = pageWidth - 90 - qrSize;
  doc.image(qrImage, qrX, bottomRowY, { width: qrSize, height: qrSize });
  doc.font('Helvetica').fontSize(8).fillColor(COLORS.dark)
    .text('Scan to verify', qrX, bottomRowY + qrSize + 4, { width: qrSize, align: 'center' });

  doc.end();

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
