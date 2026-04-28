-- ============================================
-- SNS NDT E-Learning: UT Level I — Comprehensive Content
-- Run this in Supabase SQL Editor AFTER:
--   1. create_elearning_tables.sql
--   2. seed_elearning_module1_all_methods.sql
-- ============================================
-- Adds lesson_steps for ALL 12 UT-L1 modules following ASNT CP-105
-- topical outline. Module 1 (intro) and Module 3 (couplant/calibration)
-- already seeded earlier — those are skipped via ON CONFLICT.
-- ============================================
-- Reference: ASNT Standard Topical Outlines (ANSI/ASNT CP-105),
-- SNT-TC-1A 2020, ISO 9712:2021, ASME V Article 4 (UT).
-- ============================================

-- ============================================
-- MODULE 2 — Fisika Ultrasound (wave, frequency, velocity)
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Sifat dasar gelombang ultrasonik',
   '{"slides":[{"heading":"Apa itu gelombang ultrasonik","body":"Gelombang ultrasonik adalah getaran mekanik dengan frekuensi di atas batas pendengaran manusia (>20 kHz). Dalam UT industri, frekuensi 0.5–25 MHz adalah rentang umum."},{"heading":"Karakteristik utama","body":"Frekuensi (f), panjang gelombang (λ), kecepatan (c), dan amplitudo. Hubungan dasar: c = f × λ. Memahami ini fondasi semua teknik UT."},{"heading":"Mengapa frekuensi penting","body":"Frekuensi tinggi → panjang gelombang pendek → resolusi tinggi tapi penetrasi rendah. Frekuensi rendah → penetrasi dalam tapi resolusi turun. Pemilihan tergantung material dan ukuran cacat target."}]}',
   400, NULL),
  (2, 'reading', 'Tipe gelombang — Longitudinal, Shear, Surface, Lamb',
   '{"slides":[{"heading":"Longitudinal (compressional)","body":"Partikel material bergetar searah dengan arah propagasi. Wave ini bisa merambat di solid, liquid, dan gas. Dipakai untuk inspeksi straight-beam pada plat dan forging."},{"heading":"Shear (transverse)","body":"Partikel bergetar tegak lurus arah propagasi. Hanya bisa merambat di solid karena butuh modulus geser. Dipakai untuk angle-beam inspection pada las."},{"heading":"Surface (Rayleigh) waves","body":"Merambat hanya di permukaan, kedalaman penetrasi sekitar satu panjang gelombang. Dipakai untuk inspeksi cacat permukaan halus."},{"heading":"Lamb waves","body":"Mode kompleks pada material tipis (plat, foil) yang merambat sepanjang material. Dipakai pada inspeksi composite dan thin-wall tubing."}]}',
   500, NULL),
  (3, 'animated', 'Visualisasi propagasi gelombang',
   '{"sceneCaption":"Saksikan bagaimana gelombang longitudinal dan shear merambat di material — perhatikan arah getaran partikel relatif terhadap arah propagasi.","slides":[]}',
   480, 'ut-wave-types'),
  (4, 'reading', 'Kecepatan suara di material',
   '{"slides":[{"heading":"Velocity adalah konstanta material","body":"Setiap material punya kecepatan suara karakteristik. Kecepatan tergantung modulus elastisitas, densitas, dan tipe gelombang."},{"heading":"Nilai-nilai kunci yang harus dihafalkan","body":"Steel: longitudinal 5900 m/s, shear 3230 m/s. Aluminum: longitudinal 6320 m/s. Water: 1480 m/s. Air: 340 m/s. Acrylic: 2730 m/s. Hafalkan untuk Level I exam."},{"heading":"Mengapa penting","body":"Kalibrasi UT bergantung pada velocity yang tepat. Salah set velocity → semua reading thickness dan jarak salah."}]}',
   400, NULL),
  (5, 'reading', 'Atenuasi & scattering',
   '{"slides":[{"heading":"Atenuasi","body":"Energi suara berkurang seiring jarak akibat absorbsi, scattering, dan beam spread. Atenuasi tinggi pada material grain kasar (cast iron, austenitic stainless steel)."},{"heading":"Scattering","body":"Saat gelombang bertemu grain boundary atau heterogeneity, sebagian energi tersebar ke berbagai arah. Ini menciptakan ''noise'' pada A-scan."},{"heading":"Implikasi praktis","body":"Material dengan atenuasi tinggi butuh frekuensi lebih rendah dan gain lebih tinggi. Audit kalibrasi wajib dilakukan untuk setiap perubahan material."}]}',
   400, NULL),
  (6, 'quiz', 'Mini-quiz — Fisika Ultrasound',
   '{"description":"8 soal komprehensif tentang frekuensi, kecepatan, tipe gelombang, dan atenuasi.","questionCount":8,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 2
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 4 — Transduser & Beam Behaviour
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Anatomi transduser piezoelektrik',
   '{"slides":[{"heading":"Komponen utama","body":"Crystal piezoelektrik (PZT, lithium niobate, atau composite) — backing material untuk damping — wear plate sebagai pelindung — housing dan kabel coax."},{"heading":"Efek piezoelektrik","body":"Tegangan listrik dikenakan ke crystal → crystal bergetar mekanis → menghasilkan gelombang ultrasonik. Sebaliknya, getaran mekanis dari echo → tegangan listrik untuk display."},{"heading":"Tipe probe","body":"Single element (transmitter-receiver), dual element (TR), angle beam, immersion, normal beam. Setiap tipe punya aplikasi spesifik."}]}',
   420, NULL),
  (2, 'reading', 'Beam profile — Near field & Far field',
   '{"slides":[{"heading":"Near field (Fresnel zone)","body":"Region dekat probe di mana intensitas beam berfluktuasi karena interferensi. Sizing flaw di zona ini tidak akurat."},{"heading":"Far field (Fraunhofer zone)","body":"Setelah near field, beam melebar (divergence). Intensitas turun mengikuti hukum kuadrat terbalik. Sizing flaw lebih akurat di sini."},{"heading":"Rumus near field","body":"N = D² / 4λ, dengan D = diameter probe, λ = panjang gelombang. Hafalkan."}]}',
   460, NULL),
  (3, 'animated', 'Beam pattern visualization',
   '{"sceneCaption":"Lihat bagaimana beam menyebar dari probe — near field yang fluktuatif, transition zone, dan far field yang divergen. Pemahaman geometri beam kritis untuk interpretasi UT.","slides":[]}',
   500, 'ut-beam-pattern'),
  (4, 'reading', 'Angle beam & Snell''s Law',
   '{"slides":[{"heading":"Mengapa angle beam","body":"Inspeksi las membutuhkan beam masuk pada sudut tertentu (45°, 60°, 70°) untuk menjangkau area weld dan mendeteksi cacat planar yang tidak paralel ke permukaan."},{"heading":"Snell''s Law","body":"sin θ₁ / c₁ = sin θ₂ / c₂. Saat gelombang masuk dari wedge plastik (lambat) ke baja (cepat), beam berbelok menjauhi normal — itu yang menciptakan refraksi sudut."},{"heading":"Critical angles","body":"First critical angle (~27.5° steel-acrylic): hanya shear wave masuk. Second critical angle (~57°): shear wave juga refraksi 90° — surface wave terbentuk."}]}',
   500, NULL),
  (5, 'quiz', 'Mini-quiz — Transduser & Beam',
   '{"description":"6 soal tentang anatomi probe, beam profile, near/far field, dan Snell''s Law.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 4
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 5 — Defect Types & Echo Interpretation
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Cacat las umum',
   '{"slides":[{"heading":"Lack of fusion (LOF)","body":"Las tidak menyatu sempurna ke base metal. Cacat planar yang sering paralel ke groove face — sangat berbahaya karena mengurangi ketahanan beban. Echo: amplitudo tinggi, sinyal tajam."},{"heading":"Lack of penetration (LOP)","body":"Root weld tidak terisi sempurna. Echo dari area root, biasanya jelas dengan angle beam dari second leg."},{"heading":"Slag inclusion","body":"Material non-metallik terjebak di las. Echo: amplitudo bervariasi, bentuk menyebar, sering multiple."},{"heading":"Porosity","body":"Gas terperangkap membentuk void. Echo: multiple sinyal kecil, scattered."},{"heading":"Cracks","body":"Diskontinuitas linear paling kritis. Echo: amplitudo tinggi, signature spesifik per orientasi."}]}',
   600, NULL),
  (2, 'reading', 'Cacat material (non-las)',
   '{"slides":[{"heading":"Lamination","body":"Cacat planar paralel permukaan pada plat rolled. Ditemukan dengan straight beam, mudah dilihat sebagai loss of back-wall echo."},{"heading":"Inclusion","body":"Foreign material di dalam casting/forging. Bentuk dan amplitudo bervariasi."},{"heading":"Porosity","body":"Void dari proses casting. Echo: scattered, multiple."},{"heading":"Hot tear / cold shut","body":"Cacat solidifikasi pada casting — shape sering irregular."}]}',
   500, NULL),
  (3, 'animated', 'A-scan signature interpretation',
   '{"sceneCaption":"Pelajari bagaimana setiap tipe cacat menghasilkan signature A-scan yang berbeda — flat reflector, point reflector, multiple scattered, dan loss of back-wall.","slides":[]}',
   720, 'ut-defect-signatures'),
  (4, 'reading', 'A-scan, B-scan, C-scan',
   '{"slides":[{"heading":"A-scan","body":"Display amplitudo vs time-of-flight. Display fundamental UT — semua interpretasi dimulai dari A-scan."},{"heading":"B-scan","body":"Cross-section view — sumbu horizontal = posisi probe, vertikal = depth. Bagus untuk visualisasi profile cacat."},{"heading":"C-scan","body":"Top-down view — area scan dengan amplitudo dipresentasikan sebagai warna. Dipakai pada immersion dan automated UT."}]}',
   480, NULL),
  (5, 'reading', 'False indication & artifact',
   '{"slides":[{"heading":"Mode-converted echo","body":"Pada angle beam, bagian energi bisa convert dari shear ke longitudinal — menghasilkan echo palsu. Operator Level I harus bisa membedakan."},{"heading":"Geometric reflectors","body":"Echo dari geometri material (corner, weld cap, root drop) bukan cacat. Membutuhkan pemahaman geometri spesimen."},{"heading":"Couplant pooling, surface oxide","body":"Couplant tergenang atau scaling permukaan bisa menciptakan multiple reflection palsu."}]}',
   500, NULL),
  (6, 'quiz', 'Mini-quiz — Defect interpretation',
   '{"description":"10 soal — identifikasi cacat dari A-scan signature, classify defect type, dan distinguish false indications.","questionCount":10,"passingScore":75}',
   900, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 5
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 6 — Procedures & Code Compliance
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Mengapa procedure penting',
   '{"slides":[{"heading":"Konsistensi","body":"Procedure memastikan inspeksi yang sama dilakukan dengan cara yang sama oleh inspector berbeda — fondasi quality assurance."},{"heading":"Compliance","body":"Code seperti ASME, AWS, API mensyaratkan written procedure yang sudah di-qualify oleh Level III."},{"heading":"Audit trail","body":"Setiap inspeksi harus traceable — procedure number, equipment serial, calibration block, operator certification."}]}',
   360, NULL),
  (2, 'reading', 'Code utama untuk UT',
   '{"slides":[{"heading":"ASME Section V Article 4","body":"Code utama untuk UT pada pressure equipment. Mengatur kalibrasi, scanning sensitivity, evaluation criteria."},{"heading":"AWS D1.1","body":"Welding code untuk struktur baja. Memiliki acceptance criteria spesifik untuk UT pada las struktur."},{"heading":"ISO 17640","body":"International standard untuk manual UT pada welded joints."},{"heading":"API 510, 570, 653","body":"In-service inspection codes untuk pressure vessel, piping, dan storage tank."}]}',
   480, NULL),
  (3, 'reading', 'Bagian penting dari written procedure',
   '{"slides":[{"heading":"Scope","body":"Material, tipe weld, ketebalan range, exclusion area."},{"heading":"Equipment","body":"Flaw detector model, probe spec, kabel, calibration block."},{"heading":"Calibration","body":"Reference reflector, DAC/TCG construction, scanning sensitivity."},{"heading":"Scanning technique","body":"Skip pattern, beam path coverage, scan speed."},{"heading":"Acceptance criteria","body":"Per applicable code — sering dirujuk ke section spesifik."}]}',
   480, NULL),
  (4, 'quiz', 'Mini-quiz — Procedures & Codes',
   '{"description":"6 soal tentang ASME V, AWS D1.1, dan struktur written procedure.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 6
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 7 — Reporting & Documentation
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Bagian standar UT report',
   '{"slides":[{"heading":"Header","body":"Tanggal, lokasi, project, weld ID, drawing reference, procedure number."},{"heading":"Equipment & calibration","body":"Flaw detector model + serial, probe + serial, frekuensi, sudut, calibration block, calibration date."},{"heading":"Scanning details","body":"Surface condition, couplant, scanning sensitivity, gain, technique."},{"heading":"Findings","body":"Indication location (depth, length, surface distance), amplitudo (% FSH), classification, evaluation."},{"heading":"Sign-off","body":"Inspector name + level, supervisor sign-off, date."}]}',
   480, NULL),
  (2, 'reading', 'NCR (Non-Conformance Report)',
   '{"slides":[{"heading":"Kapan NCR diterbitkan","body":"Saat indikasi melebihi acceptance criteria. Harus segera di-flag dan didokumentasikan formal."},{"heading":"Konten NCR","body":"Deskripsi cacat, lokasi exact, severity, recommendation (repair, reject, engineering review)."},{"heading":"Tindak lanjut","body":"Repair → re-inspection (re-shoot dengan UT lagi). Ditandatangani Level II atau III."}]}',
   400, NULL),
  (3, 'reading', 'Photographic & sketch evidence',
   '{"slides":[{"heading":"Sketch standar","body":"Gambar weld cross-section dengan lokasi indikasi marked. Sumbu referensi: weld start point, datum line."},{"heading":"Photo dengan reference","body":"Mistar atau ruler di frame, label weld ID terlihat, skala jelas."},{"heading":"Digital archive","body":"File naming convention: ProjectID_WeldID_Date_Inspector. Backup minimal 5 tahun."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Reporting',
   '{"description":"4 soal tentang isi UT report, NCR, dan documentation standards.","questionCount":4,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 7
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 8 — Safety & Standards
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'ASNT SNT-TC-1A — Recommended Practice',
   '{"slides":[{"heading":"Apa itu SNT-TC-1A","body":"Recommended practice ASNT untuk kualifikasi dan sertifikasi NDT personnel. Bukan standar wajib, tapi diadopsi luas oleh employer."},{"heading":"Tiga Level","body":"Level I: melakukan setup, scanning, recording. Level II: kalibrasi, evaluasi, sign-off. Level III: prosedur, training, qualification."},{"heading":"Persyaratan training & experience","body":"Level I UT: 40 jam training + 210 jam experience. Hafalkan untuk exam."}]}',
   500, NULL),
  (2, 'reading', 'Standar internasional lainnya',
   '{"slides":[{"heading":"ISO 9712:2021","body":"International standard untuk kualifikasi NDT — sertifikasi 5 tahun, harus re-cert."},{"heading":"NAS 410 / EN 4179","body":"Aerospace NDT standard. Lebih ketat, dengan annual eye exam dan industrial sector requirement."},{"heading":"ANSI/ASNT CP-189","body":"Standard yang lebih ketat dari SNT-TC-1A — wajib di banyak nuclear/military project."}]}',
   400, NULL),
  (3, 'reading', 'Keselamatan kerja UT',
   '{"slides":[{"heading":"Ergonomics","body":"Posisi statis lama → musculoskeletal injury. Rotasi tugas, stretching, ergo-friendly handle penting."},{"heading":"Couplant safety","body":"Beberapa couplant berbasis glycerin/oli — kontak kulit lama bisa iritasi. Gunakan glove jika perlu."},{"heading":"Confined space","body":"Inspeksi pressure vessel internal sering confined space — butuh permit, ventilation check, watcher di luar."},{"heading":"Working at height","body":"Inspeksi struktur tinggi (offshore, scaffolding) — fall protection harness wajib."}]}',
   460, NULL),
  (4, 'quiz', 'Mini-quiz — Safety & Standards',
   '{"description":"6 soal — SNT-TC-1A levels, training/experience hours, dan safety basics.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 8
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 9 — Hands-on Calibration Workshop
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Persiapan kalibrasi',
   '{"slides":[{"heading":"Pre-flight check","body":"Battery cek, instrument warm-up 5 menit, screen brightness, pulser settings default."},{"heading":"Pilih probe yang benar","body":"Sesuai material, ketebalan, tipe weld. Frekuensi tinggi untuk thin material, rendah untuk thick."},{"heading":"Couplant + temperature","body":"Couplant sesuai spec procedure. Temperature spesimen tercatat — affects velocity."}]}',
   300, NULL),
  (2, 'animated', 'Step-by-step kalibrasi straight beam',
   '{"sceneCaption":"Dari zero set, range calibration pakai V1 block, sampai DAC construction — ikuti setiap langkah dengan probe normal beam pada IIW V1.","slides":[]}',
   900, 'ut-calibration-workshop'),
  (3, 'animated', 'Angle beam calibration (BIP, exit point, DAC)',
   '{"sceneCaption":"Tentukan beam index point pada quadrant 100mm V1 block, verifikasi exit angle, dan bangun DAC dari side-drilled holes.","slides":[]}',
   1080, 'ut-angle-calibration'),
  (4, 'reading', 'Verifikasi kalibrasi mid-shift',
   '{"slides":[{"heading":"Mengapa wajib","body":"Kalibrasi bisa drift karena temperature, battery, atau bumping. ASME V mensyaratkan re-verify setiap 4 jam atau jika ada perubahan."},{"heading":"Checklist quick re-cal","body":"Echo amplitude pada reference reflector tetap dalam ±2 dB. Range tidak bergeser >2%."},{"heading":"Action saat fail","body":"Re-calibrate full procedure. Re-inspect semua weld sejak last good calibration."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Calibration practice',
   '{"description":"8 soal — sequencing kalibrasi, troubleshooting, dan verifikasi mid-shift.","questionCount":8,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 9
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 10 — Weld Inspection Case Studies
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Case study 1 — Pipeline girth weld dengan lack of fusion',
   '{"slides":[{"heading":"Setting","body":"Onshore pipeline 24-inch carbon steel, schedule 60. Single-V groove, GTAW root + SMAW fill/cap. Ditemukan reject indikasi pada 4 dari 50 weld."},{"heading":"Inspection","body":"45° angle beam, 2.25 MHz, scan dari kedua sisi. DAC dari ø3 mm SDH @ 25/50/75 mm depth."},{"heading":"Findings","body":"Indikasi linear amplitudo 110% DAC, length 35 mm, depth 12 mm — paralel ke groove face. Klasifikasi: lack of fusion. Reject per AWS D1.1."},{"heading":"Lesson","body":"LOF sering muncul di sidewall karena travel speed terlalu cepat. Repair: gouge + re-weld + re-shoot UT."}]}',
   500, NULL),
  (2, 'reading', 'Case study 2 — Pressure vessel longitudinal weld dengan slag chain',
   '{"slides":[{"heading":"Setting","body":"V vessel 20 mm thick, A516-70 carbon steel, longitudinal weld. Ditemukan multiple indikasi di mid-thickness."},{"heading":"Inspection","body":"60° angle beam, 4 MHz, scan kedua sisi. Pattern: 5 indikasi terdistribusi, amplitudo 60–80% DAC, length variabel."},{"heading":"Findings","body":"Slag inclusion chain — typical pada SMAW saat stop-restart tidak proper. Total length 45 mm dalam 200 mm — exceed AWS D1.1 acceptance."},{"heading":"Lesson","body":"Pattern ''multiple medium amplitude in cluster'' = signature slag. Differentiate dari porosity (smaller multiple) dan crack (single high-amp linear)."}]}',
   500, NULL),
  (3, 'reading', 'Case study 3 — Storage tank shell dengan crack',
   '{"slides":[{"heading":"Setting","body":"Storage tank floor-to-shell weld setelah 15 tahun service. In-service inspection per API 653."},{"heading":"Inspection","body":"45° angle beam ID side, 2.25 MHz. Indikasi tinggi amplitudo, sangat sharp signal."},{"heading":"Findings","body":"Linear indikasi amplitudo 200% DAC (saturated), length 80 mm. Konfirmasi dengan PT — visible crack. Klasifikasi: stress corrosion crack."},{"heading":"Lesson","body":"Crack signature: amplitudo sangat tinggi, sharp peak, linear extent. Always confirm dengan secondary method jika critical."}]}',
   500, NULL),
  (4, 'animated', 'Walkthrough — Reading complex A-scan',
   '{"sceneCaption":"Latihan interpretasi 5 A-scan signature dengan situasi real. Identifikasi cacat, klasifikasi, dan tentukan reject/accept per AWS.","slides":[]}',
   720, 'ut-ascan-interpretation'),
  (5, 'quiz', 'Mini-quiz — Case study analysis',
   '{"description":"6 soal — interpretasi case study, classify defect, dan apply acceptance criteria.","questionCount":6,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 10
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 11 — Recap & Practice Exercises
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Comprehensive review',
   '{"slides":[{"heading":"Konsep kunci yang harus di-master","body":"c = f×λ, Snell''s Law, near field formula, velocity baja/aluminum/water, DAC construction, beam profile, defect types."},{"heading":"Exam tips","body":"Banyak soal kalkulasi sederhana — hafalkan velocity konstan dan rumus dasar. Soal interpretasi A-scan biasanya signature pattern."},{"heading":"Common mistakes","body":"Lupa unit conversion (ms vs μs), salah substitute velocity, swap incident vs refracted angle."}]}',
   480, NULL),
  (2, 'quiz', 'Practice exam — 20 soal mixed topics',
   '{"description":"Latihan komprehensif menggabungkan semua topik UT-L1 — physics, equipment, calibration, defect, code.","questionCount":20,"passingScore":75}',
   1800, NULL),
  (3, 'reading', 'Strategi exam day',
   '{"slides":[{"heading":"Sebelum exam","body":"Tidur cukup, sarapan ringan, bawa kalkulator scientific yang familiar. Cek tools yang allowed per ASNT."},{"heading":"Time management","body":"40 soal · 90 menit = ~2 menit per soal. Skip soal sulit dulu, kembali setelah selesai easy ones."},{"heading":"Saat ragu","body":"Eliminate jawaban yang jelas salah. Hindari overthink — jawaban paling natural biasanya benar."}]}',
   400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 11
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- MODULE 12 — Final Assessment
-- ============================================
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Aturan main final assessment',
   '{"slides":[{"heading":"Format","body":"40 soal multiple-choice · 90 menit · minimal 75% untuk lulus. Kalkulator scientific allowed, no notes."},{"heading":"Konten","body":"Semua topik dari Module 1–10. Distribusi: physics 30%, equipment 25%, defect 25%, code/safety 20%."},{"heading":"Konsekuensi","body":"Lulus → sertifikat SNS-UT-L1 otomatis terbit dengan QR verifikasi. Gagal → bisa retake setelah 7 hari (max 3x dalam 6 bulan)."}]}',
   300, NULL),
  (2, 'quiz', 'FINAL ASSESSMENT — UT Level I',
   '{"description":"Ujian sertifikasi UT Level I — 40 soal komprehensif. Lulus: ≥75%.","questionCount":40,"passingScore":75,"isFinal":true}',
   5400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 12
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ============================================
-- Final verification
-- ============================================
SELECT
  m."orderIndex" AS module_no,
  m.title,
  COUNT(ls.id) AS step_count,
  SUM(ls."durationSeconds") / 60 AS total_minutes
FROM "LearningPaths" lp
JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.code = 'UT-L1'
GROUP BY m."orderIndex", m.title
ORDER BY m."orderIndex";
