// Server-side reader for the generated brief archive.
//
// briefs-data/YYYY-MM-DD.json is committed to the repo and IS the archive.
// These helpers are used by the Next.js server components under
// app/this-week-in-ai to render the latest brief, dated permalinks, and the
// index. They read the filesystem at build time (static generation), so no
// database or runtime fetch is involved.

import fs from 'fs';
import path from 'path';

const BRIEFS_DIR = path.join(process.cwd(), 'briefs-data');

// Matches a dated brief file: 2026-07-12.json
const BRIEF_FILE_RE = /^(\d{4}-\d{2}-\d{2})\.json$/;

function readBriefFile(fileName) {
  const fullPath = path.join(BRIEFS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(raw);
  // Trust the filename for the slug; the `date` field inside is informational.
  const match = fileName.match(BRIEF_FILE_RE);
  return { ...data, date: (match && match[1]) || data.date };
}

// All briefs, newest first. Returns [] if the directory is empty or missing.
export function getAllBriefs() {
  if (!fs.existsSync(BRIEFS_DIR)) return [];
  return fs
    .readdirSync(BRIEFS_DIR)
    .filter((f) => BRIEF_FILE_RE.test(f))
    .sort()
    .reverse()
    .map(readBriefFile);
}

export function getLatestBrief() {
  const all = getAllBriefs();
  return all.length ? all[0] : null;
}

export function getBriefByDate(date) {
  if (!BRIEF_FILE_RE.test(`${date}.json`)) return null;
  const fullPath = path.join(BRIEFS_DIR, `${date}.json`);
  if (!fs.existsSync(fullPath)) return null;
  return readBriefFile(`${date}.json`);
}

// For generateStaticParams on the [date] route.
export function getBriefDates() {
  return getAllBriefs().map((b) => b.date);
}
