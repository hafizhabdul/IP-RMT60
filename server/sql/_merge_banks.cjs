/*
 * Merge workflow output (method banks) into final-assessment-questions/banks.json.
 * Usage: node _merge_banks.cjs <workflow-output.json> <banks.json>
 * Keeps any existing banks (e.g. hand-authored UT) and adds/overwrites with
 * the methods present in the workflow output. Output ordered UT..ET.
 */
const fs = require('fs');
const [, , wfPath, banksPath] = process.argv;
if (!wfPath || !banksPath) { console.error('usage: node _merge_banks.cjs <wf.json> <banks.json>'); process.exit(1); }

const raw = JSON.parse(fs.readFileSync(wfPath, 'utf8'));
const wfMethods = raw.result?.methods || raw.methods || raw.result?.result?.methods || [];
const banks = JSON.parse(fs.readFileSync(banksPath, 'utf8'));

const byCode = {};
for (const m of (banks.methods || [])) if (m && m.code) byCode[m.code] = m;
for (const m of wfMethods) {
  if (m && m.code && Array.isArray(m.questions)) {
    byCode[m.code] = { code: m.code, method: m.method || m.code.split('-')[0], questions: m.questions };
  }
}
const order = ['UT-L1', 'MT-L1', 'PT-L1', 'RT-L1', 'VT-L1', 'ET-L1'];
banks.methods = order.filter((c) => byCode[c]).map((c) => byCode[c]);
fs.writeFileSync(banksPath, JSON.stringify(banks, null, 2), 'utf8');
console.log('Merged: ' + banks.methods.map((m) => m.code + ':' + m.questions.length).join(', '));
