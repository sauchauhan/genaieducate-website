# Certificate Template System

Parameterised certificate generator for GenAIEducate courses.
The brand (logo, colors, institute name, circuit-board corners, gold
frame, seal) is fixed. Only course content and student details change.

## Files

| File | What it is | Edit it? |
|---|---|---|
| `certificate_template.html` | The HTML/CSS layout with `{{placeholders}}` | Rarely (only for design changes) |
| `icons.js` | Predefined SVG icon library | Add new icons as needed |
| `courses.js` | One config object per course | Yes, to add/edit courses |
| `certificate.js` | Fills the template, exports `renderCertificateHTML()` | No |
| `Genai_educate_OfficialLogo.png` (in `/public`) | Institute logo | No |

## The three layers

**Brand (fixed, in `certificate.js` BRAND + the template):**
logo, institute name, seal text, colors, corners, borders.

**Course (set once per course, in `courses.js`):**
program name, certificate type, 4 highlight cards, skill tags,
footer text (hours), authority title (signed by title only, no
personal name, since certificates are shared publicly).

**Student (per certificate, passed at render time):**
student name, certificate ID, issued date, completed date, QR code,
verify URL.

## How to render one certificate

```js
const { renderCertificateHTML } = require('./certificate');
const { COURSES } = require('./courses');

const html = renderCertificateHTML(COURSES.appliedGenAI, {
  studentName: 'AISHA KHAN',
  certificateId: 'GEE-2026-0042',
  issuedOn: 'July 18, 2026',
  completedOn: 'June 29, 2026',
  verifyUrl: 'https://genaieducate.com/verify/GEE-2026-0042',
  qrCode: '<img src="data:image/png;base64,...">',  // your QR generator output
});

// Then feed html to your existing Puppeteer flow:
// await page.setContent(html, { waitUntil: 'networkidle0' });
// await page.pdf({ path: 'cert.pdf', width: '1400px', height: '990px', printBackground: true });
```

## How to add a new course

Open `courses.js`, copy a block, change these fields:

```js
myNewCourse: {
  programName: 'Your Program Name',
  certificateType: 'Professional Certificate',
  footerText: '30+ Hours of Instructor-Led Training',
  authorityTitle: 'Lead Instructor',
  highlights: [                 // exactly 4
    { icon: 'checkShield', text: 'First Highlight<br>Second Line' },
    { icon: 'robot',       text: '...' },
    { icon: 'bug',         text: '...' },
    { icon: 'gauge',       text: '...' },
  ],
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],  // any number, they wrap
},
```

Pick the 4 `icon` names from the list below. Nothing else changes:
the logo, colors, corners, and seal stay identical automatically.

## Available icons (for highlight cards)

Pick any 4 per course by name:

**AI / ML:** `brain`, `database`, `network`, `cloud`, `robot`, `chip`
**Engineering / dev:** `code`, `terminal`, `api`, `container`, `server`
**QA / testing / quality:** `checkShield`, `bug`, `clipboard`, `target`, `gauge`, `magnifier`
**General professional:** `award`, `book`, `rocket`, `chart`, `gear`, `layers`

To add a new icon, add an entry to `icons.js` following the same
pattern (white stroke, 20x20 viewBox).

## Integration notes for the pipeline

1. **QR code:** `renderCertificateHTML` expects `student.qrCode` to be a
   ready `<img>` or `<svg>` string. Generate it with your existing QR
   library (pointing at the verify URL) and pass it in. If omitted, the
   QR frame renders empty.

2. **Verify URL display:** The short text under the QR is derived
   automatically from `verifyUrl` (protocol stripped). Override with
   `verifyUrlShort` if you want something specific.

3. **Logo path:** `BRAND.logoSrc` is loaded from
   `/public/Genai_educate_OfficialLogo.png` and embedded as a base64
   data URI, so it always resolves regardless of the render engine's
   working directory.

4. **Fonts:** The template loads Cormorant Garamond, Playfair Display,
   and Inter from Google Fonts. Ensure the render environment has
   network access, OR self-host the fonts and update the `@import` in
   `certificate_template.html`. Without the fonts, headings fall back
   to a default serif.

5. **Page size:** Render at 1400x990 (the body dimensions). For print
   quality, use `deviceScaleFactor: 2` (Playwright) or the equivalent
   Puppeteer scale, then export PDF at the base dimensions.

6. **Batch generation:** Loop over student rows (e.g. from Google
   Sheets), call `renderCertificateHTML` per student with the same
   course config, and produce one PDF each. Certificate IDs follow the
   existing `GEE-YYYY-XXXX` format.
```
