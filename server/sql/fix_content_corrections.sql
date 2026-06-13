-- ============================================================
-- SNS NDT — Content Corrections (apply MANUALLY in Supabase SQL Editor)
-- ============================================================
-- The seed files use ON CONFLICT DO NOTHING, so simply re-running the
-- *_complete.sql seeds will NOT overwrite rows that already exist.
-- This file UPDATEs the already-seeded rows to the corrected content.
--
-- It mirrors the fixes already applied to:
--   - server/sql/seed_quiz_questions_comprehensive.sql  (RT unsharpness quiz)
--   - server/sql/seed_elearning_rt_l1_complete.sql       (already correct in seed)
--   - server/sql/seed_elearning_et_l1_complete.sql       (ET skin-depth)
--   - server/sql/seed_knowledge_base_articles.sql        (ET skin-depth article)
--
-- All statements are idempotent: REPLACE() is a no-op once the old text is gone,
-- and the RT UPDATE just re-sets the same corrected values.
-- Safe to run multiple times. Run on a database that has ALREADY been seeded.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1) RT geometric-unsharpness quiz (RT-L1, Module 9, final quiz of that module)
--    Old (WRONG, inverted): Ug = (F x t) / (D - t)
--    New (correct, matches lesson + RadiographyLab simulator): Ug = (F x OFD) / SOD
-- ------------------------------------------------------------
UPDATE "QuizQuestions"
SET options = '["Ug = (F × OFD) / SOD", "Ug = SOD / F", "Ug = F + OFD", "Ug = SOD × OFD"]'::jsonb,
    "correctAnswer" = 0,
    explanation = 'Ug = (F × OFD) / SOD. F = focal spot size, OFD = object-to-film distance, SOD = source-to-object distance. Perbesar SOD & perkecil OFD untuk menurunkan Ug.'
WHERE question = 'Geometric unsharpness Ug dihitung dengan rumus:';

-- ------------------------------------------------------------
-- 2) ET skin-depth in the lesson step "Skin depth & frequency" (ET-L1)
--    Wrong constant 50 -> correct 21 for f[kHz], sigma[%IACS], mu_r.
--    Al(100kHz,40%IACS): 0.8mm -> 0.33mm ; Steel(100kHz,10%IACS,mu_r=100): 0.16mm -> 0.07mm
-- ------------------------------------------------------------
UPDATE "LessonSteps"
SET "contentJson" = REPLACE(REPLACE(REPLACE(
        "contentJson"::text,
        'δ ≈ 50 / √(f × σ × μᵣ) mm',          'δ ≈ 21 / √(f × σ × μᵣ) mm'),
        'δ ≈ 50/√(100×40×1) ≈ 0.8 mm',        'δ ≈ 21/√(100×40×1) ≈ 0.33 mm'),
        'δ ≈ 50/√(100×10×100) ≈ 0.16 mm',     'δ ≈ 21/√(100×10×100) ≈ 0.07 mm')::jsonb
WHERE title = 'Skin depth & frequency'
  AND "contentJson"::text LIKE '%50 / √(f × σ × μᵣ)%';

-- ET recap step "Comprehensive review" (only the ET one carries the skin-depth formula)
UPDATE "LessonSteps"
SET "contentJson" = REPLACE("contentJson"::text,
        'skin depth δ = 50/√(fσμᵣ)', 'skin depth δ = 21/√(fσμᵣ)')::jsonb
WHERE title = 'Comprehensive review'
  AND "contentJson"::text LIKE '%skin depth δ = 50/√(fσμᵣ)%';

-- ------------------------------------------------------------
-- 3) ET skin-depth in the Knowledge Base article (Articles.content)
--    Same constant fix + recomputed table values.
-- ------------------------------------------------------------
UPDATE "Articles"
SET content = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        content,
        'δ = 50 / √(f × σ × μᵣ)  [mm]',        'δ = 21 / √(f × σ × μᵣ)  [mm]'),
        '- 100 kHz: δ ≈ 0.8 mm',               '- 100 kHz: δ ≈ 0.33 mm'),
        '- 1 MHz: δ ≈ 0.25 mm',                '- 1 MHz: δ ≈ 0.10 mm'),
        '- 10 kHz: δ ≈ 2.5 mm',                '- 10 kHz: δ ≈ 1.0 mm'),
        '- 100 kHz: δ ≈ 0.16 mm (very shallow!)', '- 100 kHz: δ ≈ 0.07 mm (very shallow!)'),
        '- 1 kHz: δ ≈ 1.6 mm',                 '- 1 kHz: δ ≈ 0.66 mm')
WHERE content LIKE '%δ = 50 / √(f × σ × μᵣ)%';

COMMIT;

-- ------------------------------------------------------------
-- Verification (optional — run after COMMIT):
--   SELECT question, options, "correctAnswer" FROM "QuizQuestions"
--     WHERE question = 'Geometric unsharpness Ug dihitung dengan rumus:';
--   SELECT title, "contentJson" FROM "LessonSteps" WHERE title = 'Skin depth & frequency';
--   SELECT title FROM "Articles" WHERE content LIKE '%δ = 21 / √(f × σ × μᵣ)%';
-- ------------------------------------------------------------
