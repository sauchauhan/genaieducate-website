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
- **Colors:** Cream `#FFF8F0`, Forest Green `#1E5C4A`, Rust/Terracotta `#C94F1E`, Dark `#2A2A2A`
- **Fonts:** Georgia/Lora for headings (font-heading), Calibri/DM Sans for body (font-body), Consolas for code
- **Logo:** Shield with teal/dark blue geometric cube design, gold border accents, circuit board background elements. Tagline: "Institute for Generative AI"
- **Tone:** Professional, restrained, credibility-first. NOT a course-mill or bootcamp vibe. Think serious institute, not Udemy clone. Target audience is software professionals and corporate decision-makers who are image-conscious.

## Design philosophy
- Minimalist, editorial feel. No aggressive sales tactics, countdown timers, or neon gradients.
- Lead with the problem (people can't answer AI questions in interviews or make AI decisions at work), then present GenAIEducate as the solution.
- The hero animation (already built in `app/components/HeroAnimation.js`) plays two scenes showing this problem, then collapses into a thin bar.
- Content should feel like it was written by an engineer, not a marketer.
- No em dashes anywhere (AI giveaway) — use commas, colons, or pipes instead.

## Current pages and what they should contain

### 1. Home (app/page.js) — PARTIALLY BUILT
**Animation:** Done. Two scenes (interview + corporate meeting) showing AI knowledge gaps, collapses to thin bar.
**Below the animation, add:**
- Services overview section. GenAIEducate is NOT just a weekend class. Position it as a firm that provides:
  - **Corporate AI Training** — customized programs for companies adopting AI
  - **Applied GenAI Engineering Program** — the flagship 4-month cohort (the one currently shown)
  - **AI Workshops** — shorter workshops for non-technical professionals (product managers, business leaders)
- This services framing matters because corporate clients visiting the site need to see that we serve their needs, not just individual learners.
- Keep the existing curriculum section but frame it as one offering under a broader services umbrella.

### 2. Program page (app/program/page.js) — NOT BUILT YET
- Overview of all programs/offerings GenAIEducate provides
- The Applied GenAI Engineering Program (4-month cohort) should be the featured/detailed one
- Show that cohorts run regularly (every few months)
- Include the 16-week curriculum breakdown (currently on homepage, can be moved or duplicated here with more detail)
- Don't just dump the curriculum — frame it as "this is what you'll be able to do after each month"

### 3. About page (app/about/page.js) — NOT BUILT YET
- Saurav's story: Data Science educator, built the curriculum from scratch, iterated it live with real students
- Prior edtech platform experience
- The philosophy: "teach less, go deeper" — cover fewer topics with more thoroughness
- Demo-first approach: every session opens with a live demo of the finished product
- Emphasize practitioner background, not academic credentials
- Target this at corporate professionals and aspiring AI engineers
- Keep it authentic and human, not a generic founder bio

### 4. Contact page (app/contact/page.js) — NOT BUILT YET
- Simple and clean
- WhatsApp link with pre-filled message: `https://wa.me/919326392963?text=Hi%20Saurav%2C%20I%20just%20visited%20the%20GenAIEducate%20website.%20Could%20you%20tell%20me%20more%20about%20the%20next%20cohort%3F`
- Email: hello@genaieducate.com (not yet configured, will be set up later)
- No forms or funnels — direct contact only

## The Applied GenAI Engineering Program (flagship offering)
- 4 months, every weekend (Sunday 9-11 AM IST)
- 16 sessions, 120-150 minutes each
- Format: 30 min theory + 70 min hands-on coding + 15 min interview Q&A + 10 min close
- 4 portfolio projects (one per month): Smart CLI Chatbot, Document Q&A App, AI Research Agent, Capstone Deployment
- Stack: Python, OpenAI API, LangChain, ChromaDB, LangGraph, MCP, FastAPI, Docker
- Price: ₹9,000 per cohort
- Two batches currently running: March 2026 batch (advanced weeks) and June 2026 batch (started 21 June)
- Target: beginners with basic Python who want to become job-ready AI engineers

## Services GenAIEducate offers (or aspires to offer)
1. **Applied GenAI Engineering Program** — the cohort-based training (running now)
2. **Corporate AI Training** — customized for companies (aspiration, building toward this)
3. **AI Workshops for Non-Technical Teams** — shorter format for product managers, business leaders (aspiration)
4. **AI Implementation Consulting** — helping mid-market Indian companies adopt AI (long-term goal)

## Important rules for code changes
- Always use Tailwind CSS v3 classes, not inline styles
- Keep the existing Tailwind config and custom color/font definitions
- Mobile-responsive: the site must work well on phones (many visitors will come from LinkedIn/WhatsApp links on mobile)
- No unnecessary dependencies — keep the project lean
- Test locally with `npm run dev` before pushing
- Push to GitHub triggers auto-deploy on Vercel

## Navigation
The nav bar currently has: Program, Instructor, Contact (as anchor links on the homepage).
When we add proper pages, update to: Home, Program, About, Contact (as actual page links).

## Things NOT to do
- Don't add a pricing section to the public website yet
- Don't mention the free batch for disadvantaged students (that's a separate initiative, never used as marketing)
- Don't use stock photos or AI-generated images
- Don't add animations beyond the hero animation without discussing first
- Don't install new npm packages without confirming the need
