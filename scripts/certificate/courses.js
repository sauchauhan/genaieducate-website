// ============================================================
// courses.js
// Course-level configuration. One object per course.
//
// Everything here is set ONCE per course and reused for every
// student in that course. Student-specific fields (name, ID,
// dates, QR) are passed separately at render time.
//
// TO ADD A NEW COURSE:
//   1. Copy one of the blocks below.
//   2. Change programName, certificateType, highlights, skills,
//      footerText, authorityTitle.
//   3. Pick 4 icons by name from icons.js for the highlights.
//   4. That is it. The brand (logo, colors, institute name,
//      corners, seal) stays the same automatically.
// ============================================================

const COURSES = {

  // ---- Course 1: Applied GenAI Engineering Program ----
  appliedGenAI: {
    programName: 'Applied GenAI Engineering Program',
    certificateType: 'Professional Certificate',
    footerText: '32+ Hours of Instructor-Led Training',

    // Signed by title only, no personal name (certificates are shared publicly)
    authorityTitle: 'Program Director',

    // Exactly 4 highlight cards. icon = name from icons.js
    highlights: [
      { icon: 'brain',    text: 'LLMs, Prompt Engineering<br>& LangChain' },
      { icon: 'database', text: 'RAG Pipelines &<br>Vector Databases' },
      { icon: 'network',  text: 'AI Agents, LangGraph<br>& MCP' },
      { icon: 'cloud',    text: 'FastAPI, Docker &<br>Cloud Deployment' },
    ],

    // Skill tags (any number, they wrap automatically)
    skills: [
      'Python', 'OpenAI APIs', 'LangChain', 'RAG',
      'LangGraph', 'MCP', 'FastAPI', 'Docker', 'AI Engineering',
    ],
  },

  // ---- Course 2: AI QA Automation (partner's course) EXAMPLE ----
  // This is a sample to show the pattern. Adjust to the real course.
  aiQA: {
    programName: 'AI-Powered QA Automation Program',
    certificateType: 'Professional Certificate',
    footerText: '30+ Hours of Instructor-Led Training',

    // Signed by title only, no personal name (certificates are shared publicly)
    authorityTitle: 'Lead QA Instructor',

    highlights: [
      { icon: 'checkShield', text: 'Test Strategy &<br>Quality Fundamentals' },
      { icon: 'robot',       text: 'AI-Assisted Test<br>Generation' },
      { icon: 'bug',         text: 'Automated Defect<br>Detection' },
      { icon: 'gauge',       text: 'CI/CD &<br>Test Reporting' },
    ],

    skills: [
      'Python', 'Selenium', 'Playwright', 'PyTest',
      'AI Test Gen', 'CI/CD', 'API Testing', 'Test Automation',
    ],
  },

};

module.exports = { COURSES };
