/*
 * Deterministic renderer: workflow JSON output -> SQL seed for final-assessment questions.
 * Usage: node _render_final_assessments.cjs <workflow-output.json> <out.sql>
 * Reads the validated question banks and emits LessonStepId-joined INSERTs,
 * matching the pattern in seed_quiz_questions_comprehensive.sql.
 * Throws on any malformed question so problems surface instead of producing bad SQL.
 */
const fs = require('fs');

const LINK = {
  'UT-L1': { m: 12, s: 2 },
  'MT-L1': { m: 12, s: 2 },
  'PT-L1': { m: 12, s: 2 },
  'RT-L1': { m: 14, s: 2 },
  'VT-L1': { m: 6, s: 3 },
  'ET-L1': { m: 9, s: 2 },
};

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) { console.error('usage: node _render_final_assessments.cjs <in.json> <out.sql>'); process.exit(1); }

const raw = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const methods = raw.result?.methods || raw.methods || raw.result?.result?.methods;
if (!Array.isArray(methods)) { console.error('Could not find methods[] in input JSON'); process.exit(1); }

const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";

let sql = `-- ============================================================
-- SNS NDT — Final Assessment question banks (Level I, all 6 methods)
-- AUTO-GENERATED. Run AFTER all e-learning + module1 seeds.
-- Links 40 questions to each method's FINAL ASSESSMENT quiz step via LessonStepId.
-- ============================================================
`;

let total = 0;
const summary = [];
const missing = [];
for (const code of Object.keys(LINK)) {
  const rec = methods.find((x) => x && x.code === code);
  if (!rec) { missing.push(code); continue; }
  const link = LINK[code];
  const qs = rec.questions || [];
  if (qs.length !== 40) throw new Error(`${code}: expected 40 questions, got ${qs.length}`);
  const method = rec.method || code.split('-')[0];

  qs.forEach((it, i) => {
    if (!Array.isArray(it.options) || it.options.length !== 4) throw new Error(`${code} q${i + 1}: options must have 4 entries`);
    if (!Number.isInteger(it.correctAnswer) || it.correctAnswer < 0 || it.correctAnswer > 3) throw new Error(`${code} q${i + 1}: correctAnswer out of range`);
    if (!['easy', 'medium', 'hard'].includes(it.difficulty)) throw new Error(`${code} q${i + 1}: bad difficulty ${it.difficulty}`);
    if (!it.question || !it.explanation) throw new Error(`${code} q${i + 1}: missing question/explanation`);
  });

  const rows = qs.map((it) => {
    const opts = q(JSON.stringify(it.options));
    return `  (${q(it.question)},\n   ${opts}, ${it.correctAnswer},\n   ${q(it.explanation)}, ${q(it.category || 'general')}, ${q(it.difficulty)})`;
  }).join(',\n');

  const stepLookup = `SELECT ls.id FROM "LessonSteps" ls JOIN "Modules" m ON ls."ModuleId" = m.id JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id WHERE lp.code = '${code}' AND m."orderIndex" = ${link.m} AND ls."orderIndex" = ${link.s} AND ls.kind = 'quiz'`;
  sql += `\n-- ============================================\n-- ${code} FINAL ASSESSMENT (module ${link.m}, step ${link.s}) — 40 questions\n-- ============================================\n`;
  sql += `-- Idempotent: clear any previously-seeded questions for this final-assessment step first.\n`;
  sql += `DELETE FROM "QuizQuestions" WHERE "LessonStepId" IN (${stepLookup});\n`;
  sql += `INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)\n`;
  sql += `SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, '${method}', 'Level I', q.difficulty\n`;
  sql += `FROM "LessonSteps" ls JOIN "Modules" m ON ls."ModuleId" = m.id JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id\n`;
  sql += `CROSS JOIN (VALUES\n${rows}\n) AS q(question, options, "correctAnswer", explanation, category, difficulty)\n`;
  sql += `WHERE lp.code = '${code}' AND m."orderIndex" = ${link.m} AND ls."orderIndex" = ${link.s} AND ls.kind = 'quiz'\n`;
  sql += `ON CONFLICT DO NOTHING;\n`;

  total += qs.length;
  summary.push(`${code}: ${qs.length}`);
}

sql += `\n-- Verify: SELECT lp.code, COUNT(qq.id) FROM "QuizQuestions" qq\n--   JOIN "LessonSteps" ls ON qq."LessonStepId"=ls.id JOIN "Modules" m ON ls."ModuleId"=m.id\n--   JOIN "LearningPaths" lp ON m."LearningPathId"=lp.id\n--   WHERE m."isFinalAssessment" GROUP BY lp.code;\n`;

fs.writeFileSync(outPath, sql, 'utf8');
console.log('Wrote ' + outPath);
console.log('Total questions: ' + total + '  (' + summary.join(', ') + ')');
if (missing.length) console.log('WARNING: no bank yet for: ' + missing.join(', '));
