-- ============================================
-- SNS NDT E-Learning: Level II — All Methods
-- Run AFTER all Level I seeds
-- ============================================
-- Adds 14 modules for each Level II path (UT/MT/PT/RT/VT/ET-L2)
-- Plus Module 1 lesson steps (intro) for each.
-- Reference: ASNT CP-105 Level II topical outlines.
-- ============================================
-- NOTE: Level II adalah "operate equipment + interpret + sign report"
-- Konten lebih advanced dari Level I — focus prosedur, kalibrasi
-- complex, evaluasi cacat, code interpretation.
-- ============================================

-- ============================================
-- UT-L2 Modules (14)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar UT Level II', 'Tinjauan ulang Level I + scope tambahan Level II.', 32, FALSE, NULL),
  (2,  'Advanced Wave Physics', 'Mode konversi, surface waves, Lamb waves untuk inspeksi composite & thin material.', 64, FALSE, NULL),
  (3,  'Phased Array UT (PAUT) — Introduction', 'Beam steering elektronik, focal law, sectorial scan.', 80, FALSE, NULL),
  (4,  'Time-of-Flight Diffraction (TOFD)', 'Pulse-echo dengan tip diffraction, sizing akurat.', 70, FALSE, NULL),
  (5,  'Complex Defect Analysis', 'Multi-defect characterization, length sizing dengan 6 dB drop.', 75, FALSE, NULL),
  (6,  'Advanced Calibration & TCG', 'Distance amplitude correction, time-corrected gain, ECA.', 70, FALSE, NULL),
  (7,  'Immersion Testing', 'Setup tank, scanner mechanics, automated UT.', 65, FALSE, NULL),
  (8,  'Inspection Procedures Development', 'Menyusun written procedure, range qualification.', 80, FALSE, NULL),
  (9,  'Code Interpretation — ASME, AWS, API', 'Acceptance criteria detail, code change tracking.', 90, FALSE, NULL),
  (10, 'Reporting & Defect Sizing', 'Length sizing, height sizing, fitness-for-service implications.', 60, FALSE, NULL),
  (11, 'Field Inspection Case Studies', 'Kasus kompleks: nozzle, T-joint, clad weld.', 95, FALSE, NULL),
  (12, 'Operator & Apprentice Training', 'Mentor Level I, training documentation.', 50, FALSE, NULL),
  (13, 'Recap & Practice Exam', 'Comprehensive review + 30 soal practice.', 90, FALSE, NULL),
  (14, 'Final Assessment — UT Level II', '60 soal · 120 menit · minimal 80% lulus.', 120, TRUE, 80)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'UT-L2'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- UT-L2 Module 1 lesson steps
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa beda Level II dengan Level I',
   '{"slides":[{"heading":"Authority Level II","body":"Level I: setup, scan, record. Level II: kalibrasi, evaluate, sign report. Level II authorized untuk sign-off final inspection."},{"heading":"Knowledge expansion","body":"Selain Level I content, Level II perlu master code interpretation, procedure development, advanced techniques (PAUT/TOFD), dan sizing methods."},{"heading":"Persyaratan ASNT","body":"Per SNT-TC-1A: Level II UT butuh 40 jam training tambahan + 630 jam pengalaman experience pada method (cumulative dari Level I)."}]}',
   400, NULL),
  (2, 'reading', 'Scope tambahan Level II',
   '{"slides":[{"heading":"Code mastery","body":"ASME V Article 4 detail, ASME VIII Division 1/2, AWS D1.1 acceptance specific, API 510/570/653."},{"heading":"Sizing methods","body":"6 dB drop, 20 dB drop, MaxAmp technique. Length & height sizing untuk fitness-for-service."},{"heading":"Advanced techniques","body":"PAUT introduction, TOFD basics, immersion automated UT."},{"heading":"Procedure development","body":"Menyusun written procedure dari scratch, range qualification, equipment compatibility."}]}',
   500, NULL),
  (3, 'reading', 'Path forward — strategi belajar Level II',
   '{"slides":[{"heading":"Foundation matters","body":"Level II tidak bisa skip Level I. Konsep dasar (frekuensi, kecepatan, beam profile) tetap fondasi."},{"heading":"Code-first approach","body":"Mulai dari code yang akan dipakai. ASME V untuk industri pressure, AWS D1.1 untuk struktur, API 1104 untuk pipeline."},{"heading":"Hands-on essential","body":"PAUT/TOFD butuh praktek real. Manfaatkan simulator dan mock-up sebelum field deployment."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — Pengantar UT-L2',
   '{"description":"Konfirmasi pemahaman scope dan persyaratan Level II.","questionCount":5,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L2' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- UT-L2 Module 3 — PAUT Introduction lesson steps
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu Phased Array UT',
   '{"slides":[{"heading":"Konsep","body":"PAUT pakai array multiple piezo crystal yang di-fire dengan delay timing terkontrol. Hasilnya: beam yang bisa di-steer elektronik tanpa rotate probe fisik."},{"heading":"Beam steering","body":"Adjust delay → adjust beam angle. Tanpa probe rotation, satu probe bisa scan multiple angle (e.g., 40-70°)."},{"heading":"Sectorial scan","body":"Multi-angle dalam satu sweep. Display sebagai \"S-scan\" — dapat lihat cross-section weld dari multiple angle."},{"heading":"Aplikasi","body":"Pipeline weld, vessel weld kompleks geometry, T-joint inspection."}]}',
   500, NULL),
  (2, 'animated', 'PAUT beam steering visualization',
   '{"sceneCaption":"Lihat bagaimana delay timing berbeda antar element menciptakan beam pattern dengan angle yang berbeda. Sectorial scan menampilkan multiple angle sekaligus.","slides":[]}',
   720, 'paut-beam-steering'),
  (3, 'reading', 'Focal Law',
   '{"slides":[{"heading":"Definisi","body":"Focal law adalah set parameter (angle, focal depth, element subset) yang menentukan beam pattern. Setiap angle = focal law berbeda."},{"heading":"Calibration kompleks","body":"PAUT calibration butuh focal law setup pada calibration block dengan multiple SDH. ECA (Encoded angle) memastikan repeatability."},{"heading":"Setup scanner","body":"Encoder mechanic mencatat probe position. Combine dengan focal law untuk produce S-scan akurat."}]}',
   500, NULL),
  (4, 'reading', 'PAUT vs Conventional UT — Trade-off',
   '{"slides":[{"heading":"Keunggulan PAUT","body":"Coverage cepat (multi-angle dalam satu pass), record digital, sizing akurat, bisa rotate beam tanpa rotate probe."},{"heading":"Kelemahan","body":"Equipment mahal (10-20× UT konvensional), training lebih intensif, calibration kompleks."},{"heading":"Pemilihan","body":"PAUT cost-effective saat volume tinggi atau geometry complex. UT konvensional cukup untuk weld sederhana straight."}]}',
   400, NULL),
  (5, 'reading', 'Code & qualification PAUT',
   '{"slides":[{"heading":"ASME V Mandatory Appendix","body":"Article 4 Mandatory Appendix III (untuk PAUT). Procedure development dengan demonstration."},{"heading":"Code Case 2235","body":"ASME Code Case yang authorized PAUT sebagai alternative ke RT untuk certain weld."},{"heading":"Personnel certification","body":"PAUT membutuhkan endorsement spesifik di luar UT-L2. Banyak employer require demonstrate competency on PAUT block."}]}',
   400, NULL),
  (6, 'quiz', 'Mini-quiz — PAUT Introduction',
   '{"description":"Konfirmasi pemahaman PAUT principles, focal law, dan code requirements.","questionCount":7,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L2' AND m."orderIndex" = 3
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MT-L2 Modules (12)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar MT Level II', 'Scope expanded dari Level I.', 30, FALSE, NULL),
  (2,  'Advanced Magnetic Theory', 'Hysteresis, B-H curve, demagnetization theory mendalam.', 60, FALSE, NULL),
  (3,  'Multi-Directional Magnetization', 'Simultaneous & sequential, automated production.', 65, FALSE, NULL),
  (4,  'Field Strength Calculation', 'Hitung amp/turn, prod amperage, coil field strength.', 55, FALSE, NULL),
  (5,  'Specialty Techniques', 'Underwater MT, cryo MT, AC vs DC trade-off.', 50, FALSE, NULL),
  (6,  'Indication Sizing & Evaluation', 'Akurasi length/width measurement, depth estimation.', 55, FALSE, NULL),
  (7,  'Procedure Development', 'Menyusun written procedure complete dengan range.', 75, FALSE, NULL),
  (8,  'Advanced Code Interpretation', 'ASME V Article 7 detail, ASTM E709 mendalam, ISO 9934.', 70, FALSE, NULL),
  (9,  'Quality Control & Audit', 'Daily check, monthly audit, calibration certs.', 50, FALSE, NULL),
  (10, 'Field Inspection Case Studies', 'Real reject scenarios + repair verification.', 75, FALSE, NULL),
  (11, 'Recap & Practice Exam', 'Review + 25 practice questions.', 75, FALSE, NULL),
  (12, 'Final Assessment — MT Level II', '60 soal · 120 menit · minimal 80%.', 120, TRUE, 80)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'MT-L2'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- MT-L2 Module 1 intro
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Scope MT Level II',
   '{"slides":[{"heading":"Authority","body":"Level II: kalibrasi equipment, evaluate indikasi, sign-off report. Level I tidak boleh sign formal report."},{"heading":"Persyaratan","body":"40 jam training tambahan + 630 jam experience kumulatif. Banyak employer juga require pass internal exam."},{"heading":"Konten Level II","body":"Advanced theory (hysteresis), multi-directional, field strength calculation, procedure development, code mastery."}]}',
   400, NULL),
  (2, 'reading', 'Code mastery — perbedaan Level II',
   '{"slides":[{"heading":"ASME V Article 7","body":"Detail acceptance criteria, write-up requirement, demonstration of qualification."},{"heading":"ASTM E709","body":"Standard guide — multiple variations technique. Level II harus tau when pakai apa."},{"heading":"AWS D1.1 Section 6","body":"MT acceptance untuk struktur baja, perbedaan static vs dynamic loading."}]}',
   400, NULL),
  (3, 'reading', 'Common Level II responsibilities',
   '{"slides":[{"heading":"Calibration & QC","body":"Pre-shift lift power test, monthly audit, equipment certification renewal."},{"heading":"Procedure","body":"Develop atau review written procedure. Approve untuk specific application."},{"heading":"Sign-off","body":"Final indication evaluation, accept/reject decision, formal report dengan signature."}]}',
   360, NULL),
  (4, 'quiz', 'Mini-quiz — MT-L2 scope',
   '{"description":"5 soal scope dan persyaratan Level II.","questionCount":5,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L2' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- PT-L2 Modules (12)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar PT Level II', 'Scope expansion dari Level I.', 32, FALSE, NULL),
  (2,  'Advanced Penetrant Chemistry', 'Surfactant, emulsifier composition, sensitivity grading.', 65, FALSE, NULL),
  (3,  'Post-Emulsifiable Systems (Method B/D)', 'Lipophilic vs hydrophilic, time control critical.', 60, FALSE, NULL),
  (4,  'Process Control', 'Bath maintenance, hydrophilic ratio, fluorescent brightness.', 55, FALSE, NULL),
  (5,  'Specialty Applications', 'Aerospace turbine blade, plastic component, high-temp PT.', 50, FALSE, NULL),
  (6,  'Indication Sizing & Evaluation', 'Length, area, classification per code.', 55, FALSE, NULL),
  (7,  'Procedure Development', 'Written procedure dengan demonstration.', 70, FALSE, NULL),
  (8,  'Advanced Code Interpretation', 'ASME V Article 6 detail, ASTM E165 advanced, ISO 3452.', 65, FALSE, NULL),
  (9,  'Quality Control & Audit', 'Daily verification, monthly bath check, SOP audit.', 50, FALSE, NULL),
  (10, 'Field Inspection Case Studies', 'Reject scenarios, repair verification.', 70, FALSE, NULL),
  (11, 'Recap & Practice Exam', 'Review + 25 practice.', 75, FALSE, NULL),
  (12, 'Final Assessment — PT Level II', '60 soal · 120 menit · minimal 80%.', 120, TRUE, 80)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'PT-L2'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- PT-L2 Module 1 intro
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Scope PT Level II',
   '{"slides":[{"heading":"Authority","body":"Level II: calibration, interpretation, sign-off, develop procedure. Level I limited ke setup & scan."},{"heading":"Knowledge expansion","body":"Advanced chemistry, post-emulsifiable mastery, process control, high-temp applications, code mastery."},{"heading":"Persyaratan ASNT","body":"40 jam training + 630 jam experience. Sertifikasi 5 tahun then re-cert."}]}',
   360, NULL),
  (2, 'reading', 'Why Method B (post-emulsifiable) butuh Level II',
   '{"slides":[{"heading":"Time-critical step","body":"Emulsifier dwell time critical — too short = no removal, too long = penetran ke-emulsify dari crack juga."},{"heading":"Sensitivity gain","body":"Method B/D 2-3× sensitivity dari Method A. Tapi process complexity 5× lebih."},{"heading":"Application","body":"Aerospace turbine blade, fastener crack, critical component dimana sensitivity worth complexity."}]}',
   400, NULL),
  (3, 'reading', 'High-temp dan specialty PT',
   '{"slides":[{"heading":"High-temp formulation","body":"Penetran khusus untuk inspection di > 50°C. Aplikasi: weld pre-heat zone, in-service hot equipment."},{"heading":"Underwater PT","body":"Marine inspection — penetran khusus tidak larut air, applied dengan brush."},{"heading":"Plastic & ceramic","body":"Non-conductive material yang tidak bisa MT/ET. PT works tapi compatibility check needed."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — PT-L2 scope',
   '{"description":"5 soal scope Level II.","questionCount":5,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L2' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- RT-L2 Modules (16)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar RT Level II', 'Scope expansion + RSO awareness.', 35, FALSE, NULL),
  (2,  'Digital Radiography (DR)', 'Flat panel detector, real-time imaging.', 80, FALSE, NULL),
  (3,  'Computed Radiography (CR)', 'Imaging plate, scanner, transition workflow.', 60, FALSE, NULL),
  (4,  'Real-time Imaging', 'Online inspection, motion analysis, frame averaging.', 70, FALSE, NULL),
  (5,  'Advanced Exposure Calculation', 'Kerma, dose, multi-source compositing.', 65, FALSE, NULL),
  (6,  'Technique Development', 'Thickness range, source selection, IQI strategy.', 75, FALSE, NULL),
  (7,  'Image Quality Optimization', 'Filter, screen, processing parameters.', 60, FALSE, NULL),
  (8,  'Defect Sizing & Characterization', 'Length, height projection, comparator chart.', 65, FALSE, NULL),
  (9,  'Procedure Development', 'Written procedure dengan demonstration.', 80, FALSE, NULL),
  (10, 'Advanced Code Interpretation', 'ASME V Article 2 mendalam, AWS, API, ISO comparison.', 75, FALSE, NULL),
  (11, 'Field Inspection Case Studies', 'Pipeline panas, pressure vessel critical.', 90, FALSE, NULL),
  (12, 'Quality Control & Audit', 'Daily QC, monthly density check, source decay tracking.', 60, FALSE, NULL),
  (13, 'Reporting & Archive Management', 'Digital archive, retention, audit trail.', 50, FALSE, NULL),
  (14, 'RSO Awareness (non-RSO duties)', 'Co-work dengan RSO, regulatory understanding.', 55, FALSE, NULL),
  (15, 'Recap & Practice Exam', 'Review + 30 practice questions.', 105, FALSE, NULL),
  (16, 'Final Assessment — RT Level II', '60 soal · 120 menit · minimal 80%.', 120, TRUE, 80)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'RT-L2'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- RT-L2 Module 1 intro
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Scope RT Level II',
   '{"slides":[{"heading":"Authority","body":"Level II: technique development, equipment qualification, image interpretation, sign-off. RSO duties terpisah (separate license)."},{"heading":"Knowledge expansion","body":"Digital RT (DR/CR), real-time imaging, advanced exposure calc, code mastery, archive management."},{"heading":"Persyaratan ASNT","body":"40 jam training tambahan + 1260 jam experience kumulatif. RT Level II workhorse di industri pressure equipment."}]}',
   400, NULL),
  (2, 'reading', 'DR/CR transition — modern RT',
   '{"slides":[{"heading":"Industry shift","body":"Film masih dominan tapi transition ke digital cepat. DR (direct) untuk volume tinggi, CR (computed) untuk transition."},{"heading":"Advantages digital","body":"Real-time review, no film processing, archive digital, post-processing enhancement."},{"heading":"Challenges","body":"Equipment cost tinggi (DR ~$50k+), training data interpretation berbeda, dynamic range limitasi."}]}',
   400, NULL),
  (3, 'reading', 'Code understanding crucial',
   '{"slides":[{"heading":"ASME V Article 2 detail","body":"Subsection T-274 untuk source selection, T-276 IQI placement, T-282 image quality."},{"heading":"AWS D1.1 vs ASME","body":"AWS lenient untuk static, strict untuk dynamic loading. ASME consistent acceptance per joint type."},{"heading":"API 1104 specifics","body":"Pipeline-specific. Hole-type IQI typical, acceptance per pipe wall thickness."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — RT-L2 scope',
   '{"description":"5 soal scope Level II.","questionCount":5,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L2' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- VT-L2 Modules (8)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar VT Level II', 'Scope expansion + CWI awareness.', 30, FALSE, NULL),
  (2,  'Advanced Optical Aids', 'Borescope, fiberscope, video borescope detail.', 60, FALSE, NULL),
  (3,  'Weld Profile Gauges', 'Bridge cam, fillet gauge, taper gauge advanced.', 50, FALSE, NULL),
  (4,  'Documentation & Audit Trail', 'Photographic standards, archive, traceability.', 55, FALSE, NULL),
  (5,  'Code Mastery — AWS D1.1', 'Section 6 detail, acceptance per joint type.', 70, FALSE, NULL),
  (6,  'CWI Pathway', 'Hubungan VT cert dengan CWI examination.', 45, FALSE, NULL),
  (7,  'Recap & Practice Exam', 'Review + 25 practice.', 75, FALSE, NULL),
  (8,  'Final Assessment — VT Level II', '50 soal · 100 menit · minimal 80%.', 100, TRUE, 80)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'VT-L2'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- VT-L2 Module 1 intro
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'VT Level II — gateway ke CWI',
   '{"slides":[{"heading":"Authority","body":"Level II: technique development, advanced equipment, sign-off final acceptance, mentor Level I."},{"heading":"VT vs CWI","body":"AWS Certified Welding Inspector (CWI) sering require VT Level II as prerequisite. CWI compensation 30-50% lebih tinggi."},{"heading":"Persyaratan","body":"40 jam training tambahan + 210 jam experience. Less hours dari method lain karena VT inherent simpler equipment."}]}',
   400, NULL),
  (2, 'reading', 'Equipment expansion Level II',
   '{"slides":[{"heading":"Borescope/fiberscope mastery","body":"Navigation di confined space, image capture, defect localization dengan articulation."},{"heading":"Profile gauges","body":"Bridge cam gauge untuk cap profile, fillet gauge untuk leg length, taper gauge untuk thickness change."},{"heading":"Pit depth gauge","body":"Digital atau analog dial untuk korosi pitting depth. Standard untuk in-service inspection."}]}',
   360, NULL),
  (3, 'reading', 'Code mastery untuk CWI prep',
   '{"slides":[{"heading":"AWS D1.1 Section 6","body":"Acceptance criteria per joint type, static vs dynamic, weld profile detailing."},{"heading":"AWS A2.4","body":"Welding symbols mastery — required untuk read drawing dan write report."},{"heading":"AWS A3.0","body":"Welding terminology — vocabulary fluency."}]}',
   360, NULL),
  (4, 'quiz', 'Mini-quiz — VT-L2 scope',
   '{"description":"5 soal scope Level II + CWI pathway.","questionCount":5,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'VT-L2' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- ET-L2 Modules (11)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar ET Level II', 'Scope expansion dari Level I.', 32, FALSE, NULL),
  (2,  'Multi-frequency Techniques', 'Mixing channel, lift-off cancellation, support plate suppression.', 75, FALSE, NULL),
  (3,  'Array Probe Mastery', 'Configuration, calibration, scan strategy.', 70, FALSE, NULL),
  (4,  'Complex Impedance Plane Analysis', 'Phase rotation, signal characterization, defect classification.', 80, FALSE, NULL),
  (5,  'Heat Exchanger Inspection — Advanced', 'RFT, IRIS, MFL — alternative methods.', 65, FALSE, NULL),
  (6,  'Aerospace Applications', 'Fastener hole, skin crack, conductivity sorting.', 65, FALSE, NULL),
  (7,  'Procedure Development', 'Written procedure dengan technique demonstration.', 75, FALSE, NULL),
  (8,  'Advanced Code Interpretation', 'ASME V Article 8 mendalam, ASTM E309/E243/E2884.', 65, FALSE, NULL),
  (9,  'Field Inspection Case Studies', 'Real reject scenarios + repair verification.', 75, FALSE, NULL),
  (10, 'Recap & Practice Exam', 'Review + 25 practice questions.', 75, FALSE, NULL),
  (11, 'Final Assessment — ET Level II', '60 soal · 120 menit · minimal 80%.', 120, TRUE, 80)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'ET-L2'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- ET-L2 Module 1 intro
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'ET Level II — beyond bobbin',
   '{"slides":[{"heading":"Authority","body":"Level II: complex calibration, technique selection, sign-off, procedure development. Level I terbatas pada predefined technique."},{"heading":"Knowledge expansion","body":"Multi-frequency mastery, array probe, complex impedance plane, alternative methods (RFT, IRIS), aerospace applications."},{"heading":"Persyaratan","body":"40 jam training + 630 jam experience. ET Level II banyak dicari di petrokimia, aerospace, dan inspeksi tubing."}]}',
   400, NULL),
  (2, 'reading', 'Multi-frequency = game changer',
   '{"slides":[{"heading":"Single freq limitation","body":"Single frequency tidak bisa cancel lift-off & support plate signal effectively. Defect kecil mudah hilang dalam noise."},{"heading":"Two-frequency mixing","body":"Channel A: defect-sensitive frequency. Channel B: lift-off/support reference. Mix: A-B = clean defect signal."},{"heading":"Three-frequency","body":"Untuk geometry complex (heat exchanger dengan multiple support plates), three-channel mixing standard."}]}',
   400, NULL),
  (3, 'reading', 'Alternative methods — kapan pakai apa',
   '{"slides":[{"heading":"Conventional bobbin ET","body":"Standard untuk corrosion pit, OD/ID wall loss. Limited untuk magnetic material."},{"heading":"RFT (Remote Field)","body":"Untuk ferromagnetic tube. Penetrasi full wall thickness. Slower scan."},{"heading":"IRIS (Internal Rotary Inspection System)","body":"Ultrasonic-based untuk tube. Akurat tapi lambat dan butuh water coupling."},{"heading":"MFL (Magnetic Flux Leakage)","body":"Pipeline inspection in-service. Pig-based, automated."}]}',
   460, NULL),
  (4, 'quiz', 'Mini-quiz — ET-L2 scope',
   '{"description":"5 soal scope dan technique selection Level II.","questionCount":5,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L2' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- Activate Level II paths (set isPublished = true)
UPDATE "LearningPaths" SET "isPublished" = true
WHERE code IN ('UT-L2', 'MT-L2', 'PT-L2', 'RT-L2', 'VT-L2', 'ET-L2');

-- Verification
SELECT
  lp.code,
  lp.level,
  lp."isPublished",
  COUNT(DISTINCT m.id) AS modules,
  COUNT(DISTINCT ls.id) AS steps
FROM "LearningPaths" lp
LEFT JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.level = 'Level II'
GROUP BY lp.code, lp.level, lp."isPublished"
ORDER BY lp.code;
