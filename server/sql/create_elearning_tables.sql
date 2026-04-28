-- ============================================
-- SNS NDT E-Learning: Learning Paths System
-- Run this in Supabase SQL Editor
-- ============================================
-- Schema for the structured learning experience:
--   LearningPaths > Modules > LessonSteps
-- Plus user-side tables:
--   UserEnrollments, UserStepProgress, UserModuleProgress, Certificates
-- Compatible with existing QuizQuestions (extended with LessonStepId).
-- ============================================

-- 1. LearningPaths (e.g., UT-L1, UT-L2, MT-L1, ..., ET-L3)
CREATE TABLE IF NOT EXISTS "LearningPaths" (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,           -- e.g., "UT-L1", "MT-L2"
    method VARCHAR(10) NOT NULL,                -- UT, MT, PT, RT, VT, ET
    level VARCHAR(20) NOT NULL,                 -- "Level I", "Level II", "Level III"
    title VARCHAR(255) NOT NULL,
    description TEXT,
    "totalModules" INTEGER NOT NULL DEFAULT 0,
    "estHours" INTEGER NOT NULL DEFAULT 0,
    "prerequisitePathId" INTEGER REFERENCES "LearningPaths"(id) ON DELETE SET NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT TRUE,
    "instructorId" INTEGER REFERENCES "Users"(id) ON DELETE SET NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Modules (a path contains 1..N modules)
CREATE TABLE IF NOT EXISTS "Modules" (
    id SERIAL PRIMARY KEY,
    "LearningPathId" INTEGER NOT NULL REFERENCES "LearningPaths"(id) ON DELETE CASCADE,
    "orderIndex" INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    "estMinutes" INTEGER NOT NULL DEFAULT 30,
    "isFinalAssessment" BOOLEAN NOT NULL DEFAULT FALSE,
    "passingScore" INTEGER,                     -- only used when isFinalAssessment=true
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE ("LearningPathId", "orderIndex")
);

-- 3. LessonSteps — atomic units inside a module
DO $$ BEGIN
  CREATE TYPE lesson_step_kind AS ENUM ('animated', 'reading', 'quiz');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "LessonSteps" (
    id SERIAL PRIMARY KEY,
    "ModuleId" INTEGER NOT NULL REFERENCES "Modules"(id) ON DELETE CASCADE,
    "orderIndex" INTEGER NOT NULL,
    kind lesson_step_kind NOT NULL DEFAULT 'reading',
    title VARCHAR(255) NOT NULL,
    "contentJson" JSONB NOT NULL DEFAULT '{}',  -- slides, blocks, etc.
    "durationSeconds" INTEGER NOT NULL DEFAULT 300,
    "simulationRef" VARCHAR(100),               -- reference to simulation scene name
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE ("ModuleId", "orderIndex")
);

-- 4. Extend QuizQuestions to link to LessonSteps (idempotent)
ALTER TABLE "QuizQuestions"
  ADD COLUMN IF NOT EXISTS "LessonStepId" INTEGER REFERENCES "LessonSteps"(id) ON DELETE SET NULL;

-- 5. UserEnrollments
DO $$ BEGIN
  CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'paused', 'abandoned');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "UserEnrollments" (
    id SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    "LearningPathId" INTEGER NOT NULL REFERENCES "LearningPaths"(id) ON DELETE CASCADE,
    "currentModuleId" INTEGER REFERENCES "Modules"(id) ON DELETE SET NULL,
    "currentStepId" INTEGER REFERENCES "LessonSteps"(id) ON DELETE SET NULL,
    "completionPercent" INTEGER NOT NULL DEFAULT 0,
    status enrollment_status NOT NULL DEFAULT 'active',
    "enrolledAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "completedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE ("UserId", "LearningPathId")
);

-- 6. UserStepProgress
DO $$ BEGIN
  CREATE TYPE step_progress_status AS ENUM ('not_started', 'in_progress', 'done');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "UserStepProgress" (
    id SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    "LessonStepId" INTEGER NOT NULL REFERENCES "LessonSteps"(id) ON DELETE CASCADE,
    status step_progress_status NOT NULL DEFAULT 'not_started',
    "score" FLOAT,                              -- only for quiz steps
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP WITH TIME ZONE,
    "completedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE ("UserId", "LessonStepId")
);

-- 7. UserModuleProgress (denormalized for fast hub queries)
CREATE TABLE IF NOT EXISTS "UserModuleProgress" (
    id SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    "ModuleId" INTEGER NOT NULL REFERENCES "Modules"(id) ON DELETE CASCADE,
    status step_progress_status NOT NULL DEFAULT 'not_started',
    "completionPercent" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP WITH TIME ZONE,
    "completedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE ("UserId", "ModuleId")
);

-- 8. Certificates
CREATE TABLE IF NOT EXISTS "Certificates" (
    id SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    "LearningPathId" INTEGER NOT NULL REFERENCES "LearningPaths"(id) ON DELETE CASCADE,
    "serialNumber" VARCHAR(50) NOT NULL UNIQUE, -- e.g., SNS-UT-L1-00147
    "score" FLOAT NOT NULL,
    "issuedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "pdfUrl" VARCHAR(500),
    "qrToken" VARCHAR(100) NOT NULL UNIQUE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE ("UserId", "LearningPathId")
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_modules_path ON "Modules"("LearningPathId", "orderIndex");
CREATE INDEX IF NOT EXISTS idx_lessonsteps_module ON "LessonSteps"("ModuleId", "orderIndex");
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON "UserEnrollments"("UserId");
CREATE INDEX IF NOT EXISTS idx_enrollments_path ON "UserEnrollments"("LearningPathId");
CREATE INDEX IF NOT EXISTS idx_stepprogress_user ON "UserStepProgress"("UserId");
CREATE INDEX IF NOT EXISTS idx_stepprogress_step ON "UserStepProgress"("LessonStepId");
CREATE INDEX IF NOT EXISTS idx_moduleprogress_user ON "UserModuleProgress"("UserId");
CREATE INDEX IF NOT EXISTS idx_moduleprogress_module ON "UserModuleProgress"("ModuleId");
CREATE INDEX IF NOT EXISTS idx_certificates_user ON "Certificates"("UserId");
CREATE INDEX IF NOT EXISTS idx_quizq_lessonstep ON "QuizQuestions"("LessonStepId");

-- ============================================
-- SEED: 18 Learning Paths (6 methods × 3 levels)
-- ============================================
INSERT INTO "LearningPaths" (code, method, level, title, description, "totalModules", "estHours", "orderIndex", "isPublished") VALUES
  ('UT-L1', 'UT', 'Level I', 'Ultrasonic Testing — Level I', 'Pulse-echo, karakterisasi cacat, volumetric. Metode inspeksi paling serbaguna untuk Level I.', 12, 14, 10, TRUE),
  ('UT-L2', 'UT', 'Level II', 'Ultrasonic Testing — Level II', 'Advanced UT, beam steering, complex defect analysis.', 14, 22, 11, FALSE),
  ('UT-L3', 'UT', 'Level III', 'Ultrasonic Testing — Level III', 'Procedure development, code interpretation, training oversight.', 16, 30, 12, FALSE),
  ('MT-L1', 'MT', 'Level I', 'Magnetic Particle — Level I', 'Inspeksi material feromagnetik melalui magnetic flux leakage — wet & dry techniques.', 10, 10, 20, TRUE),
  ('MT-L2', 'MT', 'Level II', 'Magnetic Particle — Level II', 'Demagnetization, multidirectional, advanced field strength.', 12, 16, 21, FALSE),
  ('MT-L3', 'MT', 'Level III', 'Magnetic Particle — Level III', 'Procedure writing, ASME V Article 7, audit readiness.', 14, 24, 22, FALSE),
  ('PT-L1', 'PT', 'Level I', 'Liquid Penetrant — Level I', 'Capillary action, developer physics, fluorescent vs visible dye.', 8, 8, 30, TRUE),
  ('PT-L2', 'PT', 'Level II', 'Liquid Penetrant — Level II', 'Process control, post-emulsifiable systems, advanced techniques.', 10, 14, 31, FALSE),
  ('PT-L3', 'PT', 'Level III', 'Liquid Penetrant — Level III', 'Procedure development & code compliance.', 12, 22, 32, FALSE),
  ('RT-L1', 'RT', 'Level I', 'Radiographic Testing — Level I', 'X-ray dan gamma-ray imaging, IQI, film density — inspeksi internal volumetrik.', 14, 16, 40, TRUE),
  ('RT-L2', 'RT', 'Level II', 'Radiographic Testing — Level II', 'Digital RT, real-time imaging, technique development.', 16, 24, 41, FALSE),
  ('RT-L3', 'RT', 'Level III', 'Radiographic Testing — Level III', 'Code interpretation, RSO duties, film review oversight.', 18, 32, 42, FALSE),
  ('VT-L1', 'VT', 'Level I', 'Visual Testing — Level I', 'Direct dan remote visual inspection, lighting, optical aids, AWS D1.1.', 6, 6, 50, TRUE),
  ('VT-L2', 'VT', 'Level II', 'Visual Testing — Level II', 'Borescope, weld profile gauges, advanced documentation.', 8, 12, 51, FALSE),
  ('VT-L3', 'VT', 'Level III', 'Visual Testing — Level III', 'Procedure writing, audit, training oversight.', 10, 18, 52, FALSE),
  ('ET-L1', 'ET', 'Level I', 'Eddy Current — Level I', 'Induksi elektromagnetik untuk material konduktif. Memerlukan MT-L1 sebagai prerequisite.', 9, 9, 60, TRUE),
  ('ET-L2', 'ET', 'Level II', 'Eddy Current — Level II', 'Multi-frequency, array probes, complex impedance plane.', 11, 16, 61, FALSE),
  ('ET-L3', 'ET', 'Level III', 'Eddy Current — Level III', 'Procedure development, code compliance, advanced applications.', 13, 22, 62, FALSE)
ON CONFLICT (code) DO NOTHING;

-- Set ET prerequisites (after rows exist)
UPDATE "LearningPaths" SET "prerequisitePathId" = (SELECT id FROM "LearningPaths" WHERE code = 'MT-L1')
WHERE code IN ('ET-L1');

-- ============================================
-- SEED: UT-L1 Modules (12 modules)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar Non-Destructive Testing', 'Definisi NDT, metode utama, dan aplikasi industri.', 32, FALSE, NULL),
  (2,  'Fisika Ultrasound — Wave, Frequency, Velocity', 'Sifat dasar gelombang ultrasonik dalam material.', 58, FALSE, NULL),
  (3,  'Couplant & Kalibrasi', 'Acoustic impedance, Z-matching, DAC curve, calibration blocks.', 64, FALSE, NULL),
  (4,  'Transduser & Beam Behaviour', 'Tipe probe, near field, beam divergence, focusing.', 54, FALSE, NULL),
  (5,  'Defect Types & Echo Interpretation', 'Cacat las, lamination, porosity. Membaca A-scan.', 72, FALSE, NULL),
  (6,  'Procedures & Code Compliance', 'ASME V, AWS D1.1, ISO 17640. Procedure writing.', 58, FALSE, NULL),
  (7,  'Reporting & Documentation', 'NCR, inspection report, photographic evidence.', 42, FALSE, NULL),
  (8,  'Safety & Standards', 'Keselamatan kerja, ASNT SNT-TC-1A, kepatuhan code.', 38, FALSE, NULL),
  (9,  'Hands-on Calibration Workshop', 'Latihan praktik kalibrasi UT pada blok IIW V1.', 60, FALSE, NULL),
  (10, 'Weld Inspection Case Studies', 'Studi kasus inspeksi las pipeline dan struktur.', 70, FALSE, NULL),
  (11, 'Recap & Review Exercises', 'Latihan soal, mock-up assessment, review teori.', 50, FALSE, NULL),
  (12, 'Final Assessment — UT Level I', '40 soal · 90 menit · minimal 75% untuk lulus.', 90, TRUE, 75)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'UT-L1'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- ============================================
-- SEED: UT-L1 Module 3 lesson steps (the pilot module shown in mockups)
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'animated', 'Why couplant matters — acoustic coupling basics',
   '{"sceneCaption":"Watch how an air gap reflects ~99.9% of ultrasonic energy back before it ever reaches the test piece.","slides":[]}',
   500, 'ut-couplant-intro'),
  (2, 'reading', 'Acoustic impedance & Z-matching',
   '{"slides":[{"heading":"Introduction","body":"In this step you''ll learn how the property called acoustic impedance decides whether ultrasonic energy makes it across the probe-to-specimen interface — or gets reflected at the surface."},{"heading":"Definition","body":"Acoustic impedance Z = ρ × c, where ρ is density (kg/m³) and c is longitudinal velocity (m/s). Unit: Rayl."},{"heading":"Energy transfer","body":"When a wave meets a boundary between two materials with very different Z values, most of its energy reflects back. Air vs steel = ~99.9% reflection."},{"heading":"Couplant choice","body":"Glycerin gel is the most common; cellulose paste is used for vertical surfaces; water for immersion; specialty couplants for >100°C."},{"heading":"Reminder","body":"The DAC curve you build in Step 3.3 is only valid if the same couplant is used during both calibration and inspection."}]}',
   400, NULL),
  (3, 'animated', 'DAC curve construction walkthrough',
   '{"sceneCaption":"Build a Distance-Amplitude Correction curve from three SDH reflectors at 12, 25, and 50 mm.","slides":[]}',
   720, 'ut-dac-curve'),
  (4, 'reading', 'Block types — IIW V1, V2, step wedge',
   '{"slides":[{"heading":"IIW V1 block","body":"The most common reference block. Used for angle-beam calibration and beam-index point verification."},{"heading":"IIW V2 block","body":"Smaller version for field calibration when V1 is impractical to carry."},{"heading":"Step wedge","body":"Series of steps for thickness calibration on straight-beam transducers."}]}',
   550, NULL),
  (5, 'quiz', 'Mini-quiz — 8 questions on couplant & calibration',
   '{"description":"Check your understanding of Module 3 before unlocking Module 4.","questionCount":8,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 3
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- Verify
SELECT
  (SELECT COUNT(*) FROM "LearningPaths") AS paths,
  (SELECT COUNT(*) FROM "Modules") AS modules,
  (SELECT COUNT(*) FROM "LessonSteps") AS steps;
