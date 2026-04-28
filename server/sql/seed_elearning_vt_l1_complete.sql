-- ============================================
-- SNS NDT E-Learning: VT Level I — Comprehensive Content
-- Run AFTER create_elearning_tables.sql + seed_elearning_module1_all_methods.sql
-- Reference: ASNT CP-105, ASME V Article 9, AWS D1.1, ISO 17637
-- ============================================

-- MODULE 2 — Direct & Remote Visual
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Direct visual — kondisi & geometry',
   '{"slides":[{"heading":"Aturan dasar","body":"Mata berada ≤600 mm (24 inch) dari permukaan. Sudut pandang ≥30°. Aturan ini per ASME V Article 9."},{"heading":"Lighting","body":"Min 1000 lux. Verify dengan lux meter setiap shift."},{"heading":"Eye exam annual","body":"Inspector wajib eye exam per tahun: near vision Jaeger 2 atau Snellen 20/40 dengan/tanpa kacamata. Color perception cek juga."}]}',
   360, NULL),
  (2, 'reading', 'Remote visual — borescope & camera',
   '{"slides":[{"heading":"Borescope rigid","body":"Tube rigid dengan optik di dalam. Kombinasi lens & prism untuk angle view. Cocok untuk lubang lurus tube."},{"heading":"Fiberscope","body":"Fiber optik flexible. Bisa masuk lubang berkelok. Resolusi lebih rendah dari rigid."},{"heading":"Video borescope","body":"Camera CCD/CMOS di tip, video output digital. Modern, dengan recording capability. Standard untuk turbine inspection."},{"heading":"Pan-tilt camera","body":"Untuk pressure vessel internal, tank floor — robotic crawler dengan camera."}]}',
   460, NULL),
  (3, 'animated', 'Remote inspection demo — boiler tube',
   '{"sceneCaption":"Demo penggunaan video borescope untuk inspeksi internal boiler tube — navigation, focus, image capture, defect identification.","slides":[]}',
   600, 'vt-remote-borescope'),
  (4, 'reading', 'Magnification & optical aids',
   '{"slides":[{"heading":"Magnifier","body":"3-10× untuk inspeksi crack halus. Digital magnification dengan camera modern."},{"heading":"Mirror","body":"Plain mirror atau dental mirror untuk akses sudut belakang. Pakai dengan light source langsung."},{"heading":"Pit gauge","body":"Mengukur depth pitting korosi. Ada digital dan analog dial."},{"heading":"Welding gauge","body":"Bridge cam gauge, fillet gauge — measure weld profile."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Direct & Remote',
   '{"description":"6 soal tentang direct vs remote, equipment, optical aids.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'VT-L1' AND m."orderIndex" = 2
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 3 — Lighting & Optical Aids
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Lighting standar',
   '{"slides":[{"heading":"Minimum","body":"1000 lux pada permukaan inspeksi. Per ASME V dan AWS D1.1."},{"heading":"Optimal","body":"3000-5000 lux untuk crack halus. Pakai high-CRI LED untuk warna akurat."},{"heading":"Glare","body":"Cahaya pantul terlalu kuat → silau, mata cepat lelah. Adjust angle atau pakai diffuse light."}]}',
   360, NULL),
  (2, 'reading', 'Verifikasi cahaya',
   '{"slides":[{"heading":"Lux meter","body":"Kalibrasi tahunan. Verify cahaya tepat di permukaan, bukan general ambient."},{"heading":"Kalibrasi visual","body":"Standard test card dengan teks ukuran berbeda. Inspector harus bisa baca smallest text untuk pass."},{"heading":"Color rendering index (CRI)","body":"Min 80 untuk inspeksi umum. CRI 90+ untuk identifikasi warna critical."}]}',
   320, NULL),
  (3, 'reading', 'Surface preparation untuk VT',
   '{"slides":[{"heading":"Bersihkan","body":"Hilangkan dirt, oil, scale, paint kecuali kalau acceptance memang allow paint."},{"heading":"Dry","body":"Air pada permukaan bisa hide retak. Kering sempurna sebelum inspeksi."},{"heading":"Mark area","body":"Pen marker untuk reference line, dimensi, defect location. Permanent atau temporary."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Lighting',
   '{"description":"5 soal tentang lighting, verification, surface prep.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'VT-L1' AND m."orderIndex" = 3
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 4 — Weld Profile & Acceptance
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Weld geometry — fillet, groove, partial penetration',
   '{"slides":[{"heading":"Fillet weld","body":"Weld antara dua surface tegak lurus. Diukur dengan leg length atau throat thickness."},{"heading":"Groove weld (full penetration)","body":"Joint dengan groove preparation, weld penuh tembus. Inspeksi di kedua sisi (face & root)."},{"heading":"Partial penetration","body":"Tidak sampai tembus. Ada unfused portion at root. Acceptance per design."}]}',
   400, NULL),
  (2, 'reading', 'Cacat permukaan las umum',
   '{"slides":[{"heading":"Undercut","body":"Groove di base metal di sebelah weld toe. Reduce cross-section, jadi stress concentration."},{"heading":"Overlap","body":"Weld metal overflow ke base metal tanpa fusion. Crevice yang bisa retain corrosive."},{"heading":"Excessive reinforcement","body":"Cap weld terlalu tinggi → fatigue concern."},{"heading":"Crater crack","body":"Crack di end of weld pass, sering star shape."},{"heading":"Pit/blowhole","body":"Round depression di permukaan weld."}]}',
   460, NULL),
  (3, 'reading', 'AWS D1.1 acceptance criteria',
   '{"slides":[{"heading":"Statically loaded","body":"Undercut: max 1 mm depth untuk thickness >25 mm. Crack: REJECT semua."},{"heading":"Cyclically loaded","body":"Lebih ketat. Undercut: max 0.25 mm. Profile: smooth transition required."},{"heading":"Convexity","body":"Fillet weld convexity tidak boleh melebihi rumus per AWS. Excess = stress raiser."}]}',
   400, NULL),
  (4, 'animated', 'Weld inspection walkthrough',
   '{"sceneCaption":"Demo inspeksi visual lengkap weld butt joint, dari pre-weld → root → cap → final. Identifikasi & ukur defect.","slides":[]}',
   600, 'vt-weld-inspection'),
  (5, 'quiz', 'Mini-quiz — Weld profile',
   '{"description":"7 soal tentang geometry, defect umum, acceptance.","questionCount":7,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'VT-L1' AND m."orderIndex" = 4
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 5 — Documentation & Reporting
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'VT report essentials',
   '{"slides":[{"heading":"Header","body":"Project, weld ID, drawing, procedure, date, inspector cert."},{"heading":"Equipment & verification","body":"Lighting verified (lux reading), gauge ID & calibration, optical aids used."},{"heading":"Findings","body":"Defect type, location (datum reference), dimensions, accept/reject per code."},{"heading":"Sign-off","body":"Inspector + level, supervisor, date."}]}',
   400, NULL),
  (2, 'reading', 'Photo documentation',
   '{"slides":[{"heading":"Reference markers","body":"Setiap photo include ruler/scale, weld ID label, datum line."},{"heading":"Multiple angles","body":"Overall photo + close-up dengan magnification untuk detail. Min 2-3 photo per defect."},{"heading":"File naming","body":"Project_Weld_DefectLocation_Date_Inspector. Konsisten untuk archive."}]}',
   320, NULL),
  (3, 'reading', 'Sketch standard',
   '{"slides":[{"heading":"Cross-section view","body":"Gambar weld dengan defect location marked. Datum line dari start point."},{"heading":"Top view","body":"Layout weld dengan defect spots. Cocok untuk multiple defects."},{"heading":"Symbols","body":"AWS A2.4 untuk weld symbols. Konsisten dengan industry standard."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Documentation',
   '{"description":"5 soal tentang report, photo, sketch standards.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'VT-L1' AND m."orderIndex" = 5
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 6 — Final
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Pre-final review',
   '{"slides":[{"heading":"Konsep kunci","body":"600 mm distance / 30° angle / 1000 lux / annual eye exam."},{"heading":"Equipment","body":"Borescope, magnifier, gauge, mirror — kapan masing-masing dipakai."},{"heading":"Defect","body":"Undercut, overlap, crater crack, excessive reinforcement, porosity."},{"heading":"Code","body":"ASME V Article 9, AWS D1.1, ISO 17637."}]}',
   400, NULL),
  (2, 'reading', 'Aturan main final',
   '{"slides":[{"heading":"Format","body":"40 soal · 90 menit · ≥75% lulus."},{"heading":"Distribusi","body":"Lighting/equipment 30%, weld geometry 25%, defect identification 25%, documentation/code 20%."},{"heading":"Konsekuensi","body":"Lulus → sertifikat SNS-VT-L1 otomatis. VT sertifikat sering jadi prerequisite untuk welding inspector (CWI)."}]}',
   320, NULL),
  (3, 'quiz', 'FINAL ASSESSMENT — VT Level I',
   '{"description":"Ujian sertifikasi VT Level I — 40 soal.","questionCount":40,"passingScore":75,"isFinal":true}',
   5400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'VT-L1' AND m."orderIndex" = 6
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

SELECT m."orderIndex", m.title, COUNT(ls.id) AS steps, SUM(ls."durationSeconds")/60 AS minutes
FROM "LearningPaths" lp JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.code = 'VT-L1'
GROUP BY m."orderIndex", m.title ORDER BY m."orderIndex";
