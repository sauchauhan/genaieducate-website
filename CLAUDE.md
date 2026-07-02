# GenAIEducate Website — Project Brief for Claude Code

## What this is
The official website for **GenAIEducate**, a sole proprietorship training firm founded by Saurav Chauhan. The firm provides AI engineering education through structured programs, corporate training, and workshops. The website is the firm's public face and primary lead generation tool.

## Tech stack
- **Framework:** Next.js 16 (App Router, no TypeScript)
- **Styling:** Tailwind CSS v3 (NOT v4 — v4 has a Windows-specific lightningcss binary bug)
- **Hosting:** Vercel (free tier, auto-deploys from GitHub on push to main)
- **Domain:** genaieducate.com (DNS via GoDaddy, A record pointing to Vercel)
- **Repo:** github.com/sauchauhan/genaieducate-website

## Brand system
- **Colors:** Cream `#FFF8F0`, Forest Green `#1E5C4A`, Rust/Terracotta `#C94F1E`, Dark `#2A2A2A`, Light Gray `#F5F5F5`
- **Fonts:** Georgia/Lora for headings (font-heading), Calibri/DM Sans for body (font-body), Consolas for code/accents/numbers
- **Logo:** Shield with teal/dark blue geometric cube design, gold border accents, circuit board background elements. Tagline: "Institute for Generative AI"

---

## Design direction: SHARP, not soft

The site must read as a **technical training firm**, not a weekend tutoring page or a blog post. Same brand colors, but used with maximum contrast and precision.

### CRITICAL: Why the current site looks like a blog (fix all of these)
1. **Zero visual density** — entire page is text flowing downward with no visual containers. Fix: use cards, grids, badges, icons.
2. **No section contrast** — page is one continuous cream surface. Fix: alternate backgrounds between white, dark green, light gray, white, dark green.
3. **No social proof** — no numbers, ratings, testimonials, or external validation anywhere. Fix: add Track Record section.
4. **Single-product framing** — reads like "one course I teach." Fix: display 3 services as distinct product cards.
5. **No icons or visual anchors** — 100% typography. Fix: use Unicode symbols (◆, →, ✓, ●) or simple SVG icons as visual markers.
6. **Navigation too thin** — 3 small anchor links on a cream bar. Fix: dark green nav bar with logo, links, and a CTA button.
7. **No visual landing pad after animation** — visitor lands on plain text. Fix: full-width dark section with bold declaration.
8. **Text paragraphs instead of structured layouts** — differentiators and curriculum are just flowing text. Fix: cards, grids, timeline structures.

### Key design rules
1. **Base background:** White (`#FFFFFF`) as primary. Light gray (`#F5F5F5`) for alternating sections. Cream (`#FFF8F0`) only for very subtle accent areas. Never cream everywhere.
2. **Navigation bar:** Dark forest green (`#1E5C4A`) background with white/cream text. Include a terracotta CTA button ("Start a Conversation"). This is non-negotiable.
3. **Border radius:** 2px for buttons and pills. 4px max for cards. Never 8px+ rounded corners.
4. **Borders:** Solid 1px borders with real color, not faint rgba. Cards should have visible definition.
5. **Card shadows:** Subtle `shadow-sm` or `shadow` for service cards and testimonial cards. Not flat, not heavy.
6. **Primary CTA button:** Rust/terracotta (`#C94F1E`) background with cream text.
7. **Secondary CTA button:** Forest green solid border (1.5px), no fill, forest green text.
8. **Typography:** Bold, deliberate weight contrast. Headings hit hard. Use monospace (`Consolas`, `font-mono`) for numbers, stats, labels, and technical accents.
9. **Section dividers:** Each section should have distinct background color. No need for border lines when sections alternate properly.
10. **Section padding:** Generous vertical padding (80-100px on desktop, 48-64px on mobile). Each section must feel like a distinct "room", not text continuation.
11. **Visual markers:** Use Unicode symbols (◆, →, ✓, ●, |) or simple SVG as visual anchors next to text. Break up text-only sections.
12. **Left border accents on cards:** Service cards should have a 3-4px left border in terracotta or forest green for visual punch.
13. **Overall feel:** Consulting firm meets engineering school. Think McKinsey report meets GitHub documentation. NOT Udemy, NOT Coursera, NOT a blog.

### Tone of voice
- Professional but not corporate-stiff. Written by an engineer, not a marketer.
- Specific and concrete, never vague or fluffy.
- No em dashes (AI writing giveaway), use commas, colons, or pipes instead.
- No exclamation marks in body copy.
- No "unlock", "empower", "leverage", "seamless", "cutting-edge", "world-class".
- Always "we" and "our" when referring to GenAIEducate. Never "I" or "my".
- "Our programs" not "my classes". "Our team" not "me".

---

## Target audience

**Primary:** Software professionals (3-10 years experience) who feel the AI knowledge gap in interviews and at work. They are image-conscious, evaluate training providers critically, and will not engage with anything that looks like a cheap course or a personal blog.

**Secondary:** Corporate L&D heads and engineering managers looking for team training solutions. They need to see "this is a firm that serves companies" not "this is one person teaching on weekends."

---

## Instructor track record data (use across homepage, about page, etc.)

### Career totals (headline stats, use for the primary "Professionals trained" figure)
- **15+ years** in software and AI industry experience
- **3+ years** specifically training/teaching (see edtech platform breakdown below)
- **200+ professionals trained**, a broader career total across corporate training and platform engagements. This is NOT the same number as the 115+ below, which is a specific, documented subset (one edtech platform engagement). Use 200+ for headline stats; use 115+ only when presenting that engagement's specific breakdown (56 sessions / 112 hours / 115+).

### From 3+ years at a leading edtech platform (Oct 2023 - Feb 2026)
- **Overall mentoring rating:** 4.85 / 5 (consistent across 3 years)
- **Total engagement count:** 56 sessions
- **Total engagement hours:** 112 hours delivered
- **Total learners impacted:** 115+ working professionals
- **Average sessions per month:** 2
- **Subjects taught (all rated 4.5-4.9/5):**
  - SQL: 4.8, 4.9
  - Introduction to Generative AI: 4.9
  - Machine Learning 1: 4.7
  - Machine Learning 2: 4.9, 4.9
  - Unsupervised Learning: 4.7, 4.9
  - Predictive Modeling: 4.8, 4.9
  - Inferential Statistics: 4.9, 4.9
  - Python for Data Science: 4.7, 4.8
  - Time Series Forecasting: 4.9
- **Key takeaway:** Consistently rated 4.5+ across 14+ different subjects over 3 years. This proves teaching quality is not subject-dependent.

### From current GenAI program (June 2026 batch, 11 respondents)
- **100%** said the program "opened their eyes" or "completely transformed" their understanding of AI
- **100%** said the cost is "a bargain for the things I am learning"
- **100%** said the program is "way ahead" compared to free YouTube tutorials or other AI content
- **100%** said they would recommend the program (mix of "already have" and "yes, I would")
- **73%** (8 of 11) said they are "very confident" it will help in interviews/career
- **27%** (3 of 11) said "hopeful but too early to say" (honest, expected response for early weeks)
- **0%** negative responses on any question

### Selected student quotes (use verbatim, do NOT fix grammar — imperfect English proves authenticity)

**Quote 1 (best, shows the exact problem we solve):**
"I was following lot of contents and stuck what is best or what is not so important. The way this class structured is what really guiding me to right path."

**Quote 2 (signals corporate relevance):**
"It's little different from the online tutorials because it takes real time corporate scenarios in classroom."

**Quote 3 (hands-on emphasis):**
"The hands on approach to the concepts is the thing I like the most in this course."

**Quote 4 (structured learning):**
"A very structured program with quality of material and curriculum. Covering from step a to z."

**Quote 5 (fundamentals depth):**
"As someone very keen to learning AI stuffs, I feel this sessions so far is filling lot of fundamentals I missed to learn."

**Quote 6 (real-world examples):**
"The sessions are very well explained, and the concepts are easy to understand. I especially appreciate the real production examples shared, as they make it much easier to relate the topics to practical scenarios."

**Quote 7 (effort and dedication):**
"Its very effective to understand the way we think of what AI is. Definitely its not easy thing so need dedication and attention to this subject. The trainer is putting lots of efforts."

### How to use this data on the homepage

**Stats row (4 numbers, prominent):**

| 4.85 / 5 | 200+ | 3+ years | 100% |
|-----------|------|----------|------|
| Avg. instructor rating across 14+ subjects | Professionals trained | Consistent teaching track record | "Would recommend" from current cohort |

**Below the stats, add 2-3 of these proof points as small text badges or a single line:**
- "100% rated the cost as a bargain"
- "100% said way ahead of free online content"
- "Rated 4.5+ across 14 different subjects"

**Then show 2 student quotes** (Quote 1 and Quote 2 are strongest for the homepage)

**One-line context below quotes:**
"Previously: 3+ years as Data Science instructor at a leading edtech platform, delivering live programs to working professionals across SQL, Python, Machine Learning, Statistics, and Generative AI."

---

## Homepage content structure (app/page.js)

The homepage tells this story: Problem → Who we are → What we offer → Proof of depth → Evidence it works → Contact

### Section 1: Hero Animation (ALREADY BUILT — DO NOT MODIFY)
- File: `app/components/HeroAnimation.js`
- Two scenes showing AI knowledge gaps (interview + corporate meeting)
- Collapses to thin bar after playing
- DO NOT touch this component unless specifically asked

### Section 2: Problem statement + positioning
- **Background:** Dark forest green (`#1E5C4A`), full-width
- **Layout:** Large white heading (Georgia, bold), cream subtext below
- This is the first text the visitor reads after the animation
- Content: Acknowledge the problem directly. AI is reshaping every engineering role, most professionals are unprepared. Then position GenAIEducate.
- Tone: "We train engineers and teams to build, deploy, and manage AI systems" — NOT "Learn AI from an expert instructor"
- This section must have visual weight. It is a bold declaration, not a blog paragraph.

### Section 3: Services overview
- **Background:** Light gray (`#F5F5F5`)
- **Layout:** 3 cards in a horizontal row on desktop, stacked on mobile
- **Card design:** White background, 1px solid border, 4px border-radius, subtle shadow, 3-4px left border accent in terracotta
- Each card has: monospace number label at top ("01", "02", "03"), bold title, 2-3 lines of description
- Small "Learn more →" at bottom of each card

**Card 1: Corporate AI Training**
- Customized training programs for engineering teams
- Companies adopting AI need structured upskilling, not YouTube tutorials
- "We work with your team's existing stack and build training around your actual use cases"

**Card 2: Applied GenAI Engineering Program**
- The flagship 4-month cohort program
- 16 weekends, 4 deployed projects, interview preparation built in
- Runs in regular cycles. Next cohort starting soon.

**Card 3: AI Workshops**
- Shorter format workshops for non-technical teams
- Product managers, business leaders, decision-makers
- "Understanding AI well enough to make informed decisions, without writing code"

### Section 4: Curriculum spine (for the flagship program)
- **Background:** White (`#FFFFFF`)
- **Layout:** Structured grid or horizontal timeline, NOT a flat table
- Use monospace month numbers ("01", "02", "03", "04") as large visual anchors
- Week ranges as small badges (green background pill with white text "Week 1-4")
- Project names as bold callouts with trophy emoji or marker
- Section heading: "The Applied GenAI Engineering Program" with subtext "16 weekends. 4 deployed projects. Zero to production."

Month breakdown:
| Month | Title | Weeks | Focus | Project |
|-------|-------|-------|-------|---------|
| 01 | Foundations | 1-4 | Python, LLM internals, prompt engineering | Smart CLI Chatbot |
| 02 | LangChain + RAG | 5-9 | Embeddings, vector search, retrieval pipelines | Document Q&A App |
| 03 | Agents + Orchestration | 10-13 | LangGraph, multi-agent systems, MCP | AI Research Agent |
| 04 | Production + Career | 14-16 | FastAPI, Docker, cloud deployment, security | Capstone Deployment |

### Section 5: Track Record (social proof)
- **Background:** Light gray (`#F5F5F5`)
- **Layout:** Three parts stacked
- Section heading: "Built on evidence, not claims"

**Part A: Stats row**
4 stats in a horizontal grid with large monospace numbers:
- 4.85 / 5 → Avg. instructor rating across 14+ subjects
- 200+ → Professionals trained (career total)
- 3+ years → Consistent teaching track record
- 100% → "Would recommend" from current cohort

**Part B: Proof point badges**
- "100% rated the cost as a bargain"
- "100% said way ahead of free online content"
- "Rated 4.5+ across 14 different subjects"

**Part C: Student quotes (2 quotes, card layout)**
Cards with large quotation mark ("), quote text, "— Program participant" below.

Quote 1: "I was following lot of contents and stuck what is best or what is not so important. The way this class structured is what really guiding me to right path."

Quote 2: "It's little different from the online tutorials because it takes real time corporate scenarios in classroom."

Do NOT fix the grammar in these quotes. The imperfect English proves they are real.

**Part D: Context line**
Small text: "Previously: 3+ years as Data Science instructor at a leading edtech platform, delivering live programs to working professionals across SQL, Python, Machine Learning, Statistics, and Generative AI."

### Section 6: Why GenAIEducate (differentiators)
- **Background:** White (`#FFFFFF`)
- **Layout:** 3-4 items as horizontal cards with visual markers, NOT a paragraph of text

Points:
1. **Practitioner-built curriculum** — not theory from textbooks. Every session built from real engineering practice.
2. **Tested live, rebuilt where it failed** — iterated across multiple cohorts. What didn't land got rewritten.
3. **Projects you deploy, not notebooks you run** — every project gets a live URL. Every project is interview-defensible.
4. **Interview preparation built in** — every session ends with interview Q&A. Not a separate module, part of the fabric.

### Section 7: Contact
- **Background:** Dark forest green (`#1E5C4A`)
- **Heading:** "Start a conversation" (white, Georgia)
- **Subtext:** "Whether you're exploring for yourself or evaluating for your team, we're happy to talk." (cream)
- **Buttons:** WhatsApp (terracotta, primary) and Email (white outline, secondary)
- WhatsApp link: `https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%20just%20visited%20the%20GenAIEducate%20website.%20Could%20you%20tell%20me%20more%20about%20the%20next%20cohort%3F`
- Email: `mailto:hello@genaieducate.com`

### Section 8: Footer
- **Background:** Dark (`#2A2A2A`) or very dark forest green
- Clean single row: GenAIEducate logo/text on left, "Institute for Generative AI" tagline, copyright
- Add "Verify a Certificate →" link pointing to /verify
- Keep minimal. No social media icons yet.

---

## Other pages (NOT BUILT YET, build later)

### Program page (app/program/page.js)
- Detailed view of all offerings
- Full curriculum breakdown for the flagship cohort
- "Apply for next cohort" or "Talk to us" CTA

### About page (app/about/page.js)
- Saurav's background as a practitioner and educator
- The philosophy: teach less, go deeper
- Demo-first teaching approach
- Full track record data from the "Instructor track record data" section above
- Subjects taught with ratings, total hours, total learners
- Target this at corporate audience, not personal blog

### Contact page (app/contact/page.js)
- WhatsApp + Email
- No forms, no funnels
- Clean, simple, direct

---

## Certificate System (BUILD THIS)

### Overview
A two-part system:
1. **Public verification page** at `genaieducate.com/verify` — anyone can enter a certificate ID and see the student's details
2. **Certificate PDF generator script** — run locally by Saurav when issuing certificates to students

### Data storage: Google Sheets
- A private Google Sheet acts as the certificate database
- Columns: `certificate_id`, `student_name`, `program_name`, `completion_date`, `issue_date`, `status`
- Status values: `active` or `revoked`
- Example row: `GEE-2026-0001`, `Rahul Sharma`, `Applied GenAI Engineering Program`, `June 2026`, `July 2026`, `active`
- New certificates are added manually by Saurav (just adding a row to the sheet)

### Certificate ID format
`GEE-YYYY-XXXX` where:
- `GEE` = GenAI Educate
- `YYYY` = year of completion
- `XXXX` = 4-digit sequential number (0001, 0002, etc.)
- Example: `GEE-2026-0001`

### Part 1: Public verification page (app/verify/page.js)

**URL:** genaieducate.com/verify

**Design:** Follow the same sharp design system as the rest of the site. White background, dark green nav, consistent typography. This page should feel like a serious institutional verification tool, not an afterthought.

**Layout:**
- Page heading: "Certificate Verification"
- Subtext: "Enter a GenAIEducate certificate ID to verify its authenticity."
- Input field: clean, full-width on mobile, centered on desktop, placeholder "e.g. GEE-2026-0001"
- Verify button: terracotta background, cream text
- Result area below the button showing one of three states:

**State 1: Valid certificate (green accent card)**
```
✓ Certificate Verified
Name: Rahul Sharma
Program: Applied GenAI Engineering Program
Completed: June 2026
Issued: July 2026
Certificate ID: GEE-2026-0001
Issued by: GenAIEducate — Institute for Generative AI
```

**State 2: Invalid / not found (red accent card)**
```
✗ Certificate Not Found
No certificate matching this ID exists in our records.
If you believe this is an error, contact hello@genaieducate.com
```

**State 3: Revoked (orange accent card)**
```
⚠ Certificate Revoked
This certificate has been revoked and is no longer valid.
Contact hello@genaieducate.com for more information.
```

**UX rules:**
- Input should auto-uppercase as user types (so GEE-2026-0001 and gee-2026-0001 both work)
- Trim whitespace from input before querying
- Show a loading spinner while the API call is in progress
- Clear the result if the user starts typing a new ID
- The verify page should pre-fill the ID if it's passed as a URL parameter: `/verify?id=GEE-2026-0001`

### Part 2: API route (app/api/verify-certificate/route.js)

This is a Next.js API route that:
1. Receives a POST request with `{ certificateId: "GEE-2026-0001" }`
2. Calls the Google Sheets API server-side to look up the ID
3. Returns the certificate data or a not-found response

**Response format (valid):**
```json
{
  "status": "valid",
  "data": {
    "certificateId": "GEE-2026-0001",
    "studentName": "Rahul Sharma",
    "programName": "Applied GenAI Engineering Program",
    "completionDate": "June 2026",
    "issueDate": "July 2026"
  }
}
```

**Response format (not found):**
```json
{ "status": "not_found" }
```

**Response format (revoked):**
```json
{ "status": "revoked" }
```

**Error handling:**
- If Google Sheets API fails, return `{ "status": "error" }` and show a friendly message on the frontend
- Never expose raw error messages to the public page
- Add rate limiting: maximum 10 requests per minute per IP to prevent scraping

### Part 3: Environment variables

Add to `.env.local` for development and to Vercel's Environment Variables for production:

```
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
```

**Package needed:** `googleapis` (npm install googleapis)

### Part 4: Certificate PDF generator (scripts/generate-certificate.js)

A script Saurav runs locally on his laptop to generate a certificate PDF for a student.

**Usage:**
```
node scripts/generate-certificate.js --id GEE-2026-0001 --name "Rahul Sharma" --date "June 2026"
```

**Certificate PDF design (A4 landscape):**
- Forest green top and bottom bars with gold accent lines (matches signboard design)
- Rust side accent stripes
- Large "GenAIEducate" heading (GenAI in forest green, Educate in rust)
- "Institute for Generative AI" tagline
- "CERTIFICATE OF COMPLETION" in spaced uppercase
- Student name in large Georgia font (the hero element of the certificate)
- "has successfully completed the" in regular weight
- Program name: "Applied GenAI Engineering Program" in forest green bold
- Completion date
- Certificate ID in monospace at the bottom
- QR code linking to: `https://genaieducate.com/verify?id=GEE-2026-0001` (pre-fills the ID)
- Signature line with "Saurav Chauhan, Founder — GenAIEducate" below it
- Use `pdfkit` for PDF generation and `qrcode` npm package for QR codes (no external API calls)

### Part 5: Setup instructions

Create a `SETUP_CERTIFICATES.md` file with step-by-step instructions for Saurav to:
1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create a Service Account and download the JSON key
4. Share the Google Sheet with the service account email
5. Add the environment variables locally and on Vercel

### Summary of files to create/modify:
- `app/verify/page.js` — public verification page
- `app/api/verify-certificate/route.js` — API route (server-side only)
- `scripts/generate-certificate.js` — local certificate PDF generator
- `SETUP_CERTIFICATES.md` — step-by-step Google Sheets API setup
- `.env.local.example` — template showing required environment variables (never commit actual values)
- Footer in `app/page.js` — add "Verify a Certificate →" link pointing to /verify

### Important rules for this feature:
- NEVER expose Google Sheets credentials in client-side code. All API calls go through the Next.js API route (server-side only).
- The QR code must use the `qrcode` npm package locally, never an external QR API.
- Credentials must never be committed to GitHub. Add to .gitignore if not already there.

---

## Important rules for code changes
- Always use Tailwind CSS v3 classes, not inline styles
- Mobile-responsive: must work well on phones (many visitors from LinkedIn/WhatsApp links on mobile)
- No unnecessary dependencies, keep the project lean
- Test locally with `npm run dev` before pushing
- Push to GitHub triggers auto-deploy on Vercel
- Do not modify `app/components/HeroAnimation.js` unless specifically asked
- Do not install new npm packages without confirming

## Things NOT to do
- Don't add pricing to the public website
- Don't mention the free batch for disadvantaged students (separate initiative, never used for marketing)
- Don't use stock photos or AI-generated images
- Don't add animations beyond the hero animation without asking
- Don't use "I" or "my" when referring to GenAIEducate, always "we" and "our"
- Don't make it sound like a solo tutor's page
- Don't polish the grammar in student quotes (imperfect English proves authenticity)
- Don't add countdown timers, urgency banners, or aggressive sales tactics
- Don't add university affiliations or partnerships that don't exist
- Don't use carousel/slider components for testimonials (professionals see through those)
- Don't name the previous edtech platform (Great Learning) explicitly, just say "a leading edtech platform"

## WhatsApp number
The correct WhatsApp number is 919326392693.
This is the ONLY correct number. Do not change it, do not "fix" it, do not swap any digits.
WhatsApp link must always be: `https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%20just%20visited%20the%20GenAIEducate%20website.%20Could%20you%20tell%20me%20more%20about%20the%20next%20cohort%3F`
