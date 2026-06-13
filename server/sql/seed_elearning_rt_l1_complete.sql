-- ============================================
-- SNS NDT E-Learning: RT Level I — Comprehensive Content
-- Run AFTER create_elearning_tables.sql + seed_elearning_module1_all_methods.sql
-- Reference: ASNT CP-105, ASME V Article 2, ISO 17636-1, AWS D1.1
-- ============================================

-- MODULE 2 — X-ray vs Gamma-ray Sources
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'X-ray tube — bagaimana radiasi dihasilkan',
   '{"slides":[{"heading":"Cara kerja","body":"Filamen panas memancarkan elektron → dipercepat oleh tegangan tinggi (kV) → tabrakan dengan target tungsten → menghasilkan X-ray (Bremsstrahlung + characteristic radiation)."},{"heading":"Kontrol parameter","body":"kV mengontrol energi (penetrasi). mA mengontrol intensitas (jumlah radiasi). Time menentukan total exposure."},{"heading":"Range industri","body":"100-450 kV untuk inspeksi industri umum. >1 MeV untuk steel sangat tebal (linear accelerator)."}]}',
   460, NULL),
  (2, 'reading', 'Gamma sources — Iridium-192 & Cobalt-60',
   '{"slides":[{"heading":"Iridium-192","body":"Energy ~380 keV, half-life 74 hari. Compact, portable, paling umum untuk pipeline & vessel. Source decay → harus replace setiap ~3 bulan."},{"heading":"Cobalt-60","body":"Energy ~1.25 MeV (rata-rata), half-life 5.27 tahun. Menembus baja sangat tebal. Lebih hazardous."},{"heading":"Selenium-75","body":"Energy ~270 keV, half-life 120 hari. Lebih baru, kontras lebih baik dari Ir-192 untuk thin steel."}]}',
   460, NULL),
  (3, 'reading', 'Pemilihan source — material thickness',
   '{"slides":[{"heading":"Steel thickness guide","body":"≤25 mm: X-ray 200 kV atau Se-75. 25-50 mm: X-ray 300 kV atau Ir-192. >50 mm: Co-60 atau X-ray >450 kV."},{"heading":"Trade-off","body":"Higher energy → lebih penetrate tapi kontras turun. Match energy ke thickness untuk optimal kualitas image."}]}',
   360, NULL),
  (4, 'animated', 'Source comparison — X-ray vs Gamma',
   '{"sceneCaption":"Visualisasi spectrum X-ray (continuous + characteristic peaks) vs Gamma (discrete energy lines). Implications untuk kontras dan penetrasi.","slides":[]}',
   480, 'rt-source-comparison'),
  (5, 'quiz', 'Mini-quiz — Sources',
   '{"description":"6 soal tentang X-ray vs gamma, source selection, energy levels.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 2
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 3 — Radiation Safety
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'ALARA principle',
   '{"slides":[{"heading":"As Low As Reasonably Achievable","body":"Filosofi: kurangi exposure ke level paling rendah yang praktis. Bukan angka mutlak — tapi optimasi."},{"heading":"Tiga pilar","body":"Time (kurangi durasi exposure), Distance (jauhkan dari source), Shielding (lapisan attenuating)."},{"heading":"Inverse square law","body":"Dose rate ∝ 1/r². Jarak 2× → dose 1/4. Jarak adalah perlindungan paling powerful."}]}',
   400, NULL),
  (2, 'reading', 'Dose limits',
   '{"slides":[{"heading":"Occupational worker","body":"Annual whole body: 50 mSv (5 rem). Lifetime cumulative: age × 10 mSv."},{"heading":"Public","body":"Annual: 1 mSv (0.1 rem). Sangat ketat untuk radiasi yang bocor ke publik."},{"heading":"Pregnant","body":"Declared pregnant worker: 0.5 mSv per month, 5 mSv total kehamilan."}]}',
   360, NULL),
  (3, 'reading', 'Dosimetry & monitoring',
   '{"slides":[{"heading":"TLD/OSL badge","body":"Dosimeter pasif, dipakai sepanjang shift. Dibaca bulanan, hasilnya tercatat di personal dose record."},{"heading":"Pocket dosimeter / EPD","body":"Direct reading, real-time. Wajib untuk operator RT — alert kalau dose rate tinggi."},{"heading":"Survey meter","body":"Geiger counter atau ion chamber untuk survey area. Dipakai sebelum approach source untuk verify ''cold''."}]}',
   400, NULL),
  (4, 'reading', 'Source security & emergency',
   '{"slides":[{"heading":"Storage","body":"Source storage di shielded container, locked, dengan radiation symbol. Inventory check setiap shift."},{"heading":"Source stuck","body":"Crank/cable jam — source tidak masuk kembali. EMERGENCY. Evakuasi area, isolate, panggil RSO."},{"heading":"Lost source","body":"Immediate report. Search dengan survey meter. Konsekuensi serius (legal, jiwa)."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Radiation safety',
   '{"description":"8 soal tentang ALARA, dose limits, dosimetry, emergency.","questionCount":8,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 3
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 4 — Film & Detector
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Industrial film classes',
   '{"slides":[{"heading":"Class T1 — Ultra-fine grain","body":"Kontras tertinggi, butuh exposure lama. Aerospace, nuclear."},{"heading":"Class T2 — Fine grain","body":"Industri umum. Kompromi antara kualitas & speed."},{"heading":"Class T3 — Medium","body":"Faster exposure, kontras lebih rendah. Field inspection."},{"heading":"Class T4 — Coarse","body":"Fastest, kontras paling rendah. Untuk situasi exposure terbatas."}]}',
   400, NULL),
  (2, 'reading', 'Digital RT — DR & CR',
   '{"slides":[{"heading":"DR (Direct Radiography)","body":"Detector flat panel langsung output digital image. Real-time, tidak perlu film processing."},{"heading":"CR (Computed Radiography)","body":"Imaging plate (phosphor) di-scan setelah exposure. Reusable. Transition technology dari film ke DR."},{"heading":"Trade-off","body":"DR fastest tapi paling mahal. Film paling murah tapi paling lambat. CR di tengah."}]}',
   400, NULL),
  (3, 'reading', 'Screens — intensifying',
   '{"slides":[{"heading":"Lead screens","body":"Pre-screen + back-screen lead foil di sisi film. Mengurangi scattered radiation, menambah image sharpness."},{"heading":"Fluorescent/salt screens","body":"Mengubah X-ray jadi cahaya, mempercepat exposure (10-100×). Tapi resolusi turun."},{"heading":"Selection","body":"Lead screen umum untuk industri. Fluorescent untuk produksi serial cepat."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Film & Detector',
   '{"description":"5 soal tentang film classes, DR/CR, screens.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 4
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 5 — IQI
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu IQI',
   '{"slides":[{"heading":"Tujuan","body":"Image Quality Indicator = device kalibrasi yang ditempatkan dalam radiograph untuk verify kualitas image. Wire visibility = sensitivity check."},{"heading":"Standar","body":"ASME V Article 2: T-272 untuk wire-type, T-276 untuk hole-type."},{"heading":"Acceptance","body":"Wire/hole minimum yang harus terlihat di radiograph ditentukan code per material thickness."}]}',
   360, NULL),
  (2, 'reading', 'Wire-type IQI (ASTM)',
   '{"slides":[{"heading":"Set wire diameter","body":"Multiple wires berdiameter berbeda di-hold dalam plastic envelope. Wire halus harus terlihat = good sensitivity."},{"heading":"Penempatan","body":"Source-side IQI standar. Film-side jika source-side tidak praktis (with marker ''F'')."},{"heading":"Sensitivity calculation","body":"Diameter wire terkecil yang terlihat / thickness × 100 = % sensitivity. Target 2T/T = 2%."}]}',
   400, NULL),
  (3, 'reading', 'Hole-type IQI (ASME)',
   '{"slides":[{"heading":"Plate dengan holes","body":"Plate metal dengan beberapa holes berdiameter berbeda. Hole 2T/T harus terlihat. ''2T'' = hole diameter 2× plate thickness."},{"heading":"Designation","body":"IQI thickness = 2% of part thickness. Hole 2T/T setara 4% sensitivity."},{"heading":"Per material","body":"IQI material harus sama atau radiographically similar ke part inspected."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — IQI',
   '{"description":"6 soal tentang wire-type, hole-type, sensitivity.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 5
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 6 — Geometric Unsharpness
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Penyebab unsharpness',
   '{"slides":[{"heading":"Geometric (Ug)","body":"Source size > 0 menyebabkan penumbra di edge defect. Lebih besar source, lebih unsharp."},{"heading":"Movement","body":"Source bergerak selama exposure → blur. Stabilkan dengan tripod/clamp."},{"heading":"Inherent (Uh)","body":"Film grain & screen response. Limit fundamental dari media."}]}',
   360, NULL),
  (2, 'reading', 'Rumus geometric unsharpness',
   '{"slides":[{"heading":"Ug = F × OFD / SOD","body":"F = focal spot size (ukuran sumber), SOD = source-to-object distance (sumber ke objek), OFD = object-to-film distance (objek ke film). Hafalkan. Contoh: F=3 mm, OFD=20 mm, SOD=500 mm → Ug = (3 × 20) / 500 = 0.12 mm."},{"heading":"Limit per code","body":"ASME V: Ug ≤ 0.020 inch (0.5 mm) untuk thickness ≤2 inch. Ug ≤ 0.030 inch untuk thickness ≤3 inch."},{"heading":"Mengurangi Ug","body":"Perbesar SOD, perkecil OFD (objek serapat mungkin ke film), atau pakai source kecil. Source size umumnya fixed per equipment."}]}',
   460, NULL),
  (3, 'animated', 'Geometric unsharpness visualization',
   '{"sceneCaption":"Lihat bagaimana focal spot size dan distance mempengaruhi penumbra di edge defect. Demo geometris jelas.","slides":[]}',
   480, 'rt-geometric-unsharpness'),
  (4, 'quiz', 'Mini-quiz — Unsharpness',
   '{"description":"5 soal tentang Ug calculation dan code limits.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 6
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 7 — Exposure Calculation
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Exposure chart',
   '{"slides":[{"heading":"Apa itu","body":"Chart yang menentukan exposure time untuk kombinasi material thickness, kV/source, distance, film type, density target."},{"heading":"Cara baca","body":"Find your thickness on x-axis → cross to material curve → read mAs (milliamp-seconds) on y-axis."},{"heading":"Adjustment","body":"Untuk distance berbeda, adjust dengan inverse square. Untuk film berbeda, adjust dengan film speed factor."}]}',
   400, NULL),
  (2, 'reading', 'Half-value layer (HVL)',
   '{"slides":[{"heading":"Definisi","body":"Tebal material yang mengurangi intensitas radiasi jadi 50%. Specific per material dan energy."},{"heading":"Steel HVL","body":"At 200 kV: ~16 mm steel. At 400 kV: ~25 mm. At Ir-192: ~13 mm. At Co-60: ~22 mm."},{"heading":"Aplikasi","body":"Hitung shielding dan transmission ratio. Berguna untuk safety calculation."}]}',
   360, NULL),
  (3, 'reading', 'Density target',
   '{"slides":[{"heading":"Optical density","body":"Log10(I0/I) — log dari ratio cahaya tanpa film vs dengan film. Higher density = darker film."},{"heading":"Target range","body":"Per ASME V: 1.8-4.0 untuk X-ray, 2.0-4.0 untuk gamma. Outside range → re-shoot."},{"heading":"Pengukuran","body":"Densitometer pada area weld vs base metal. Catat di report."}]}',
   400, NULL),
  (4, 'animated', 'Exposure calculation walkthrough',
   '{"sceneCaption":"Tutorial step-by-step exposure calculation untuk weld pipa carbon steel 12 mm dengan Ir-192. Termasuk distance correction dan density verification.","slides":[]}',
   600, 'rt-exposure-calc'),
  (5, 'quiz', 'Mini-quiz — Exposure',
   '{"description":"7 soal kalkulasi exposure, HVL, density.","questionCount":7,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 7
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 8 — Film Development & Density
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Proses kimia film',
   '{"slides":[{"heading":"Step 1 — Developer","body":"5 menit @ 20°C. Mengubah silver halide tereksposur → metallic silver (gambar visible)."},{"heading":"Step 2 — Stop bath","body":"30 detik. Menghentikan reaksi developer. Acidic."},{"heading":"Step 3 — Fixer","body":"5 menit. Larutkan silver halide tidak tereksposur. Stabilkan image."},{"heading":"Step 4 — Wash","body":"15-30 menit running water. Hilangkan fixer residue."},{"heading":"Step 5 — Dry","body":"Drying cabinet 30-60 menit. Film harus benar kering sebelum review."}]}',
   460, NULL),
  (2, 'reading', 'Quality control proses',
   '{"slides":[{"heading":"Temperature control","body":"Developer ±0.5°C dari spec. Drift → density shift. Pakai thermostat & monitoring."},{"heading":"Replenishment","body":"Setelah develop banyak film, chemicals lemah. Replenish per liter processed."},{"heading":"Step wedge daily","body":"Setiap pagi proses step wedge standard, baca density, plot di chart. Identifikasi drift."}]}',
   400, NULL),
  (3, 'reading', 'Density measurement',
   '{"slides":[{"heading":"Densitometer","body":"Light box + sensor. Kalibrasi dengan step wedge sebelum reading."},{"heading":"Reading points","body":"Weld area (multiple points), heat-affected zone, base metal. Catat semua di report."},{"heading":"Density gradient","body":"Density tidak boleh varies >0.4 dari weld ke base metal. Higher = uneven exposure or geometry issue."}]}',
   360, NULL),
  (4, 'quiz', 'Mini-quiz — Development',
   '{"description":"6 soal tentang chemical process, QC, density.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 8
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 9 — Defect Interpretation
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Cacat las pada radiograph',
   '{"slides":[{"heading":"Porosity","body":"Round, dark, scattered (cluster) atau single. Sharp edge. Easy to identify."},{"heading":"Slag","body":"Irregular, dark, often elongated. Located within weld."},{"heading":"Lack of penetration","body":"Linear dark di centerline (root). Sharp edges, often sangat dark karena void besar."},{"heading":"Lack of fusion","body":"Linear dark di sidewall. Subtle — operator harus aware location typical."},{"heading":"Crack","body":"Linear dark, very sharp, often branched. Most critical."}]}',
   500, NULL),
  (2, 'reading', 'Cacat material',
   '{"slides":[{"heading":"Porosity casting","body":"Multiple round dark spots scattered di body casting."},{"heading":"Inclusion","body":"Foreign material — bisa darker (low density) atau lighter (high density) dari base metal."},{"heading":"Crack hot tear","body":"Linear, branched, often near corner casting."},{"heading":"Lamination plate","body":"Sulit terlihat dari ortho view — only edge view memperlihatkan."}]}',
   400, NULL),
  (3, 'reading', 'Image artifacts vs real defects',
   '{"slides":[{"heading":"Film artifacts","body":"Crimp marks, fingerprints, water spots, pressure marks. Pattern tidak natural — straight lines, repeated."},{"heading":"Surface features","body":"Weld toe ripples, grinding marks. Compare dengan visual inspection."},{"heading":"Geometric features","body":"Edge of plate, drilled hole, weld backing — predictable shapes."},{"heading":"Verification","body":"Re-shoot from different angle. Real defect tetap terlihat, artifact bisa hilang."}]}',
   400, NULL),
  (4, 'animated', 'Reading radiograph training',
   '{"sceneCaption":"Walkthrough 5 radiograph dengan multiple defects. Identify, classify, accept/reject per ASME V.","slides":[]}',
   720, 'rt-radiograph-reading'),
  (5, 'quiz', 'Mini-quiz — Defect interpretation',
   '{"description":"10 soal interpretasi radiograph.","questionCount":10,"passingScore":75}',
   900, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 9
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 10 — Procedures & Code
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Code utama untuk RT',
   '{"slides":[{"heading":"ASME V Article 2","body":"RT untuk pressure equipment. Detailed parameter & acceptance."},{"heading":"ISO 17636-1","body":"International standard untuk RT pada welded joints."},{"heading":"AWS D1.1","body":"Welding code dengan acceptance criteria untuk struktur baja."},{"heading":"API 1104","body":"Pipeline welding code — RT acceptance."}]}',
   400, NULL),
  (2, 'reading', 'Acceptance criteria — basic',
   '{"slides":[{"heading":"Per ASME VIII","body":"Crack: REJECT. Lack of fusion: REJECT. Slag/porosity: tergantung size & frequency per thickness."},{"heading":"Per AWS D1.1","body":"Statically loaded: lebih lenient. Cyclically loaded: lebih ketat (fatigue concern)."},{"heading":"Repair process","body":"Reject → mark area → grind/gouge → re-weld → re-shoot RT."}]}',
   400, NULL),
  (3, 'quiz', 'Mini-quiz — Code',
   '{"description":"5 soal tentang ASME, AWS, API, acceptance.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 10
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 11 — Field Practice
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Setup field RT',
   '{"slides":[{"heading":"Pre-job survey","body":"Cek area: people present, distance to walls, shielding required, controlled vs restricted area markings."},{"heading":"Equipment check","body":"Source kondisi (decay), survey meter calibrated, dosimeter pakai, IQI ready."},{"heading":"Setup","body":"Position source-to-film distance, install IQI, mark identifier (project, weld, date), ready exposure."}]}',
   400, NULL),
  (2, 'animated', 'Pipeline weld RT field demo',
   '{"sceneCaption":"Demo lengkap RT weld pipeline 12'' dengan Ir-192. Setup, exposure, processing, interpretation.","slides":[]}',
   900, 'rt-pipeline-demo'),
  (3, 'reading', 'Post-job',
   '{"slides":[{"heading":"Source secure","body":"Crank back source ke shielded position. Survey meter verify ''cold''. Lock storage."},{"heading":"Film process","body":"Develop di darkroom atau portable processor. Verify density before leaving site."},{"heading":"Documentation","body":"Field report: date, location, weld ID, parameters, density, IQI sensitivity, defects found."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Field practice',
   '{"description":"5 soal tentang setup, exposure, post-job.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 11
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 12 — Reporting
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'RT report essentials',
   '{"slides":[{"heading":"Header","body":"Project, weld ID, drawing, procedure, date."},{"heading":"Equipment","body":"Source type & activity, film type, kV/mA/time, distance, screens."},{"heading":"IQI & quality","body":"IQI type, wire/hole visibility, sensitivity %, density readings."},{"heading":"Findings","body":"Defects identified per length, classification, accept/reject per code reference."},{"heading":"Sign-off","body":"Inspector + level cert, RSO endorsement (untuk gamma), date."}]}',
   480, NULL),
  (2, 'reading', 'Film archive & traceability',
   '{"slides":[{"heading":"Lead identifier","body":"Setiap film harus marked dengan lead lettering: project, weld ID, date, side. Permanent record."},{"heading":"Storage condition","body":"Cool, dry, archival sleeves. Retention 5 tahun atau per code/contract."},{"heading":"Digital backup","body":"Scan ke high-res digital file untuk modern record. Keep original film."}]}',
   320, NULL),
  (3, 'quiz', 'Mini-quiz — Reporting',
   '{"description":"4 soal tentang RT report dan archive.","questionCount":4,"passingScore":75}',
   400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 12
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 13 — Recap
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Comprehensive review',
   '{"slides":[{"heading":"Sources & energy","body":"X-ray vs gamma, kV vs MeV, half-life Ir-192/Co-60."},{"heading":"Safety","body":"ALARA: time/distance/shielding. Inverse square law. Dose limits."},{"heading":"Image quality","body":"IQI sensitivity, geometric unsharpness Ug = F×OFD/SOD, density 1.8-4.0."},{"heading":"Defect interpretation","body":"Porosity round, slag elongated, LOP/LOF linear, crack sharp branched."}]}',
   500, NULL),
  (2, 'quiz', 'Practice exam — 25 soal mixed',
   '{"description":"Latihan komprehensif RT-L1.","questionCount":25,"passingScore":75}',
   2100, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 13
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 14 — Final
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Aturan main',
   '{"slides":[{"heading":"Format","body":"40 soal · 90 menit · ≥75% lulus."},{"heading":"Distribusi","body":"Sources/safety 30%, equipment/IQI 25%, exposure/density 20%, interpretation/code 25%."},{"heading":"Konsekuensi","body":"Lulus → sertifikat SNS-RT-L1. Catatan: untuk kerja real RT field butuh juga lisensi RSO terpisah."}]}',
   320, NULL),
  (2, 'quiz', 'FINAL ASSESSMENT — RT Level I',
   '{"description":"Ujian sertifikasi RT Level I — 40 soal.","questionCount":40,"passingScore":75,"isFinal":true}',
   5400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 14
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

SELECT m."orderIndex", m.title, COUNT(ls.id) AS steps, SUM(ls."durationSeconds")/60 AS minutes
FROM "LearningPaths" lp JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.code = 'RT-L1'
GROUP BY m."orderIndex", m.title ORDER BY m."orderIndex";
