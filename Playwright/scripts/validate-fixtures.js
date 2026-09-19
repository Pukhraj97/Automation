const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'fixtures', 'releases.json');
const releases = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const requiredChecks = ['ui', 'api', 'data', 'events', 'errorRate'];
const ids = new Set();
const failures = [];

for (const release of releases) {
  if (!release.id || ids.has(release.id)) failures.push(`duplicate or missing id: ${release.id || '<empty>'}`);
  ids.add(release.id);
  if (!['ready', 'attention'].includes(release.status)) failures.push(`${release.id}: unsupported status`);
  for (const check of requiredChecks) {
    if (typeof release.checks?.[check] !== 'number' || release.checks[check] < 0) failures.push(`${release.id}: invalid checks.${check}`);
  }
  if (release.checks?.events > 100) failures.push(`${release.id}: events cannot exceed 100%`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${releases.length} release fixtures and ${releases.length * requiredChecks.length} quality signals.`);
}