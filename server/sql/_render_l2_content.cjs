/*
 * Render UT-L2 (and other L2) module content from workflow JSON output into SQL.
 * Usage: node _render_l2_content.cjs <workflow-output.json> <out.sql> <PATH_CODE> <METHOD> <LEVEL>
 *   e.g. node _render_l2_content.cjs out.json seed_ut_l2_batch1.sql UT-L2 UT "Level II"
 *
 * Input shape (per module): { moduleOrderIndex, steps:[{orderIndex, kind:'reading'|'quiz',
 *   title, durationSeconds, slides?:[{heading,body}], quizMeta?:{description,questionCount,passingScore}}],
 *   quizQuestions:[{question, options[4], correctAnswer, explanation, category, difficulty}] }
 *
 * Steps use ON CONFLICT ("ModuleId","orderIndex") DO NOTHING (never deletes steps -> never
 * cascades into UserStepProgress). Quiz questions use DELETE+INSERT per quiz step (idempotent;
 * QuizQuestions has no unique constraint and deleting them harms nothing).
 */
const fs = require('fs');
const [, , inPath, outPath, CODE = 'UT-L2', METHOD = 'UT', LEVEL = 'Level II'] = process.argv;
if (!inPath || !outPath) { console.error('usage: node _render_l2_content.cjs <in.json> <out.sql> [CODE METHOD LEVEL]'); process.exit(1); }

const raw = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const modules = raw.result?.modules || raw.modules || raw.result?.result?.modules;
if (!Array.isArray(modules)) { console.error('No modules[] in input'); process.exit(1); }

const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";

function contentJsonFor(step) {
  if (step.kind === 'quiz') {
    const meta = step.quizMeta || {};
    return JSON.stringify({
      description: meta.description || 'Mini-quiz',
      questionCount: meta.questionCount || (undefined),
      passingScore: meta.passingScore || 75,
    });
  }
  return JSON.stringify({ slides: Array.isArray(step.slides) ? step.slides : [] });
}

let sql = `-- ============================================================
-- SNS NDT — ${CODE} content (AUTO-GENERATED from authoring workflow)
-- Run AFTER seed_elearning_level2_all_methods.sql (modules must exist).
-- Steps: ON CONFLICT DO NOTHING (safe, never deletes user progress).
-- Quiz questions: DELETE+INSERT per quiz step (idempotent).
-- ============================================================
`;

let stepCount = 0, qCount = 0;
const summary = [];
for (const mod of modules) {
  const N = mod.moduleOrderIndex;
  const steps = (mod.steps || []).slice().sort((a, b) => a.orderIndex - b.orderIndex);
  if (!steps.length) continue;

  // --- LessonSteps ---
  const stepRows = steps.map((s) => {
    if (!['reading', 'quiz'].includes(s.kind)) throw new Error(`${CODE} M${N} step ${s.orderIndex}: bad kind ${s.kind}`);
    if (s.kind === 'reading' && !(Array.isArray(s.slides) && s.slides.length)) throw new Error(`${CODE} M${N} step ${s.orderIndex}: reading step has no slides`);
    return `  (${s.orderIndex}, ${q(s.kind)}, ${q(s.title)}, ${q(contentJsonFor(s))}, ${s.durationSeconds || 420}, NULL)`;
  }).join(',\n');
  sql += `\n-- ${CODE} Module ${N}${mod.moduleTitle ? ' — ' + mod.moduleTitle : ''} (${steps.length} steps)\n`;
  sql += `INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")\n`;
  sql += `SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"\n`;
  sql += `FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id\n`;
  sql += `CROSS JOIN (VALUES\n${stepRows}\n) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")\n`;
  sql += `WHERE lp.code = ${q(CODE)} AND m."orderIndex" = ${N}\n`;
  sql += `ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;\n`;
  stepCount += steps.length;

  // --- Quiz questions (linked to the module's quiz step) ---
  const quizStep = steps.find((s) => s.kind === 'quiz');
  const questions = mod.quizQuestions || [];
  if (quizStep && questions.length) {
    questions.forEach((it, i) => {
      if (!Array.isArray(it.options) || it.options.length !== 4) throw new Error(`${CODE} M${N} q${i + 1}: options must be 4`);
      if (!Number.isInteger(it.correctAnswer) || it.correctAnswer < 0 || it.correctAnswer > 3) throw new Error(`${CODE} M${N} q${i + 1}: correctAnswer out of range`);
    });
    const qRows = questions.map((it) =>
      `  (${q(it.question)},\n   ${q(JSON.stringify(it.options))}, ${it.correctAnswer},\n   ${q(it.explanation)}, ${q(it.category || 'general')}, ${q(it.difficulty || 'medium')})`
    ).join(',\n');
    const lookup = `SELECT ls.id FROM "LessonSteps" ls JOIN "Modules" m ON ls."ModuleId" = m.id JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id WHERE lp.code = ${q(CODE)} AND m."orderIndex" = ${N} AND ls."orderIndex" = ${quizStep.orderIndex} AND ls.kind = 'quiz'`;
    sql += `-- ${CODE} Module ${N} mini-quiz (${questions.length} questions, step ${quizStep.orderIndex})\n`;
    sql += `DELETE FROM "QuizQuestions" WHERE "LessonStepId" IN (${lookup});\n`;
    sql += `INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)\n`;
    sql += `SELECT ls.id, qq.question, qq.options::jsonb, qq."correctAnswer", qq.explanation, qq.category, ${q(METHOD)}, ${q(LEVEL)}, qq.difficulty\n`;
    sql += `FROM "LessonSteps" ls JOIN "Modules" m ON ls."ModuleId" = m.id JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id\n`;
    sql += `CROSS JOIN (VALUES\n${qRows}\n) AS qq(question, options, "correctAnswer", explanation, category, difficulty)\n`;
    sql += `WHERE lp.code = ${q(CODE)} AND m."orderIndex" = ${N} AND ls."orderIndex" = ${quizStep.orderIndex} AND ls.kind = 'quiz'\n`;
    sql += `ON CONFLICT DO NOTHING;\n`;
    qCount += questions.length;
  }
  summary.push(`M${N}:${steps.length}st/${questions.length}q`);
}

fs.writeFileSync(outPath, sql, 'utf8');
console.log(`Wrote ${outPath}`);
console.log(`Modules: ${modules.length} | steps: ${stepCount} | questions: ${qCount}`);
console.log(summary.join('  '));
