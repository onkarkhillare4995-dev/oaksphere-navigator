#!/usr/bin/env node
// Manual job import — runs locally or in CI.
// Usage:
//   node scripts/import-jobs.mjs
//   npm run import-jobs
// Optional env: IMPORT_URL (defaults to your published site), JOBS_IMPORT_SECRET
const url = process.env.IMPORT_URL || "https://oaksphere.in/api/public/import-jobs";
const secret = process.env.JOBS_IMPORT_SECRET || "";

const res = await fetch(url, {
  method: "POST",
  headers: secret ? { "x-import-secret": secret } : {},
});
const text = await res.text();
console.log(`HTTP ${res.status}`);
console.log(text);
process.exit(res.ok ? 0 : 1);
