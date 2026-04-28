-- ============================================
-- SNS NDT E-Learning: Module seeds for all Level I methods
-- Run this in Supabase SQL Editor AFTER create_elearning_tables.sql
-- ============================================
-- Adds:
--   1. Full 12-module skeleton for MT-L1, PT-L1, RT-L1, VT-L1, ET-L1
--   2. Module 1 (Introduction) lesson steps for ALL 6 Level I methods
--      so every path has a real entry point users can learn from.
-- Idempotent: safe to re-run.
-- ============================================

-- ============================================
-- MT-L1 Modules (12)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar Magnetic Particle Testing', 'Prinsip MT, kapan dipakai, dan kelebihannya untuk material ferromagnetik.', 28, FALSE, NULL),
  (2,  'Fisika Magnetic Flux Leakage', 'Bagaimana medan magnet bocor pada cacat permukaan dan near-surface.', 50, FALSE, NULL),
  (3,  'Magnetisasi — Yoke, Prod, Coil', 'Teknik magnetisasi: longitudinal, circular, dan multi-directional.', 56, FALSE, NULL),
  (4,  'Particle & Carrier — Wet vs Dry', 'Pemilihan partikel basah/kering, fluorescent vs visible, dan carrier fluid.', 48, FALSE, NULL),
  (5,  'Surface Preparation & Lighting', 'Persiapan permukaan, kontaminasi, intensitas cahaya UV-A.', 42, FALSE, NULL),
  (6,  'Indikasi: Real vs False', 'Membedakan indikasi cacat asli, magnetic writing, dan surface non-relevant.', 60, FALSE, NULL),
  (7,  'Demagnetisasi', 'Kapan & bagaimana demag dilakukan dengan AC decay atau reverse DC.', 40, FALSE, NULL),
  (8,  'Procedures & Code Compliance', 'ASME V Article 7, ASTM E709, ISO 9934.', 54, FALSE, NULL),
  (9,  'Field Testing Workshop', 'Latihan langsung pada weld dan casting sample.', 70, FALSE, NULL),
  (10, 'Reporting & Documentation', 'NCR, photographic evidence, dan format laporan.', 36, FALSE, NULL),
  (11, 'Recap & Practice Exercises', 'Latihan soal dan review komprehensif.', 50, FALSE, NULL),
  (12, 'Final Assessment — MT Level I', '40 soal · 90 menit · minimal 75% untuk lulus.', 90, TRUE, 75)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'MT-L1'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- ============================================
-- PT-L1 Modules (12)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar Liquid Penetrant Testing', 'Prinsip PT, kapan dipakai, dan keunggulan untuk surface flaw rendering.', 26, FALSE, NULL),
  (2,  'Capillary Action Physics', 'Tegangan permukaan, viskositas, dan kemampuan penetran masuk celah halus.', 48, FALSE, NULL),
  (3,  'Penetrant Types', 'Visible vs fluorescent · solvent removable / water washable / post-emulsifiable.', 50, FALSE, NULL),
  (4,  'Dwell Time & Temperature Effects', 'Mengapa 5–10 menit standar dwell, dan dampak suhu terhadap efektivitas.', 38, FALSE, NULL),
  (5,  'Excess Removal — Critical Step', 'Teknik wipe, water wash, emulsifier — error paling umum di Level I.', 44, FALSE, NULL),
  (6,  'Developer — Form Indication', 'Dry, wet non-aqueous, water-based — dan perannya merender indikasi.', 42, FALSE, NULL),
  (7,  'Inspection & Light Standards', 'Cahaya 1000 lux untuk visible, UV-A 1000 µW/cm² untuk fluorescent.', 36, FALSE, NULL),
  (8,  'Indikasi Interpretation', 'Linear vs round, true vs false, dan threshold acceptance.', 48, FALSE, NULL),
  (9,  'Procedures & Code Compliance', 'ASME V Article 6, ASTM E165, ISO 3452.', 50, FALSE, NULL),
  (10, 'Field Practice Workshop', 'Latihan pada weld, casting, dan forging samples.', 60, FALSE, NULL),
  (11, 'Recap & Practice Exercises', 'Review komprehensif dan latihan soal bergaya ASNT.', 44, FALSE, NULL),
  (12, 'Final Assessment — PT Level I', '40 soal · 90 menit · minimal 75% untuk lulus.', 90, TRUE, 75)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'PT-L1'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- ============================================
-- RT-L1 Modules (14)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar Radiographic Testing', 'Prinsip RT, sumber radiasi, dan kapan dipakai untuk inspeksi internal.', 32, FALSE, NULL),
  (2,  'X-ray vs Gamma-ray Sources', 'Perbedaan tabung X-ray, Iridium-192, Cobalt-60, dan kapan pakai mana.', 56, FALSE, NULL),
  (3,  'Radiation Safety Basics', 'ALARA, dose limits, time/distance/shielding — fondasi keselamatan.', 60, FALSE, NULL),
  (4,  'Film & Detector Types', 'Industrial film classes, digital DR, computed CR.', 50, FALSE, NULL),
  (5,  'Image Quality Indicators (IQI)', 'Wire-type vs hole-type IQI dan placement rules per code.', 54, FALSE, NULL),
  (6,  'Geometric Unsharpness', 'Source-film distance, focal spot, dan dampaknya pada resolusi.', 48, FALSE, NULL),
  (7,  'Exposure Calculation', 'Hitung waktu exposure dari kV, mA, distance, dan film type.', 60, FALSE, NULL),
  (8,  'Film Development & Density', 'Proses kimia developer-fixer, optical density 1.8–4.0.', 46, FALSE, NULL),
  (9,  'Defect Interpretation', 'Porosity, slag, lack of fusion, cracks — appearance pada radiograph.', 70, FALSE, NULL),
  (10, 'Procedures & Code Compliance', 'ASME V Article 2, ISO 17636-1, AWS D1.1.', 56, FALSE, NULL),
  (11, 'Field Inspection Practice', 'Latihan setup, exposure, dan interpretasi pada pipeline weld.', 80, FALSE, NULL),
  (12, 'Reporting & Archive', 'Formal RT report, retention, traceability.', 38, FALSE, NULL),
  (13, 'Recap & Practice Exercises', 'Latihan soal dan review komprehensif.', 50, FALSE, NULL),
  (14, 'Final Assessment — RT Level I', '40 soal · 90 menit · minimal 75% untuk lulus.', 90, TRUE, 75)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'RT-L1'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- ============================================
-- VT-L1 Modules (6)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar Visual Testing', 'Mengapa VT adalah metode NDT pertama dan paling fundamental.', 28, FALSE, NULL),
  (2,  'Direct & Remote Visual Inspection', 'Mata telanjang, magnifier, borescope, pan-tilt camera.', 42, FALSE, NULL),
  (3,  'Lighting & Optical Aids', 'Standar 1000 lux minimum, magnifying lens, mirror, dan periscopes.', 36, FALSE, NULL),
  (4,  'Weld Profile & Acceptance', 'AWS D1.1 acceptance criteria untuk reinforcement, undercut, porosity.', 60, FALSE, NULL),
  (5,  'Documentation & Reporting', 'Photographic evidence, sketch, pen-and-paper recording standards.', 36, FALSE, NULL),
  (6,  'Final Assessment — VT Level I', '40 soal · 90 menit · minimal 75% untuk lulus.', 90, TRUE, 75)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'VT-L1'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- ============================================
-- ET-L1 Modules (9)
-- ============================================
INSERT INTO "Modules" ("LearningPathId", "orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
SELECT lp.id, m."orderIndex", m.title, m.description, m."estMinutes", m."isFinalAssessment", m."passingScore"
FROM "LearningPaths" lp
CROSS JOIN (VALUES
  (1,  'Pengantar Eddy Current Testing', 'Prinsip induksi elektromagnetik untuk material konduktif.', 30, FALSE, NULL),
  (2,  'Electromagnetic Induction Fundamentals', 'Faraday law, skin depth, frekuensi vs penetrasi.', 50, FALSE, NULL),
  (3,  'Probe Types & Configuration', 'Surface, encircling, bobbin, array probes.', 48, FALSE, NULL),
  (4,  'Impedance Plane Reading', 'Lift-off, conductivity, dan crack response pada impedance plane.', 56, FALSE, NULL),
  (5,  'Calibration & Reference Standards', 'EDM notch, drilled holes, dan calibration standards.', 44, FALSE, NULL),
  (6,  'Heat Exchanger Tube Inspection', 'Aplikasi terbesar ET — inspeksi tubing dengan bobbin probe.', 52, FALSE, NULL),
  (7,  'Procedures & Code Compliance', 'ASME V Article 8, ASTM E309, E243.', 46, FALSE, NULL),
  (8,  'Recap & Practice Exercises', 'Review komprehensif dan latihan soal.', 44, FALSE, NULL),
  (9,  'Final Assessment — ET Level I', '40 soal · 90 menit · minimal 75% untuk lulus.', 90, TRUE, 75)
) AS m("orderIndex", title, description, "estMinutes", "isFinalAssessment", "passingScore")
WHERE lp.code = 'ET-L1'
ON CONFLICT ("LearningPathId", "orderIndex") DO NOTHING;

-- ============================================
-- LESSON STEPS — Module 1 (Introduction) for ALL 6 Level I methods
-- ============================================

-- Helper pattern: each Module 1 has 4 steps (intro reading + animated + reading + mini-quiz)

-- UT-L1 Module 1
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu Non-Destructive Testing?',
   '{"slides":[{"heading":"NDT — definisi","body":"Non-Destructive Testing adalah serangkaian metode inspeksi yang dapat mendeteksi cacat material tanpa merusak komponen yang diuji. Dipakai untuk memastikan integritas struktural dalam industri minyak-gas, pembangkit listrik, manufaktur pesawat, dan konstruksi."},{"heading":"Mengapa penting?","body":"Inspeksi NDT memungkinkan komponen tetap dipakai setelah diperiksa. Ini menghemat biaya, mencegah kegagalan katastropik, dan memenuhi regulasi keselamatan industri."},{"heading":"Enam metode utama","body":"UT (Ultrasonic), MT (Magnetic Particle), PT (Liquid Penetrant), RT (Radiographic), VT (Visual), ET (Eddy Current). Setiap metode punya physics unik dan aplikasi terbaik."}]}',
   320, NULL),
  (2, 'animated', 'Bagaimana Ultrasonic Testing bekerja',
   '{"sceneCaption":"Probe UT mengirim gelombang suara ke material. Cacat dalam material memantulkan gelombang kembali dan dapat dideteksi sebagai echo pada layar.","slides":[]}',
   400, 'ut-couplant-intro'),
  (3, 'reading', 'Aplikasi UT di industri',
   '{"slides":[{"heading":"Inspeksi las","body":"Aplikasi UT terbesar adalah memeriksa kualitas las pada pipeline, pressure vessel, dan struktur baja. Cacat seperti lack of fusion, slag, dan crack dapat dideteksi."},{"heading":"Pengukuran ketebalan","body":"UT juga dipakai untuk mengukur penipisan dinding pipa akibat korosi atau erosi — sangat kritis pada industri petrokimia."},{"heading":"Komposit & PAUT","body":"Material modern seperti komposit dan inspeksi PAUT (Phased Array UT) membutuhkan keahlian Level II dan III, tapi fondasinya tetap di Level I."}]}',
   300, NULL),
  (4, 'quiz', 'Mini-quiz — Pengantar UT',
   '{"description":"Konfirmasi pemahaman dasar sebelum lanjut ke fisika ultrasound.","questionCount":4,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MT-L1 Module 1
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu Magnetic Particle Testing?',
   '{"slides":[{"heading":"Prinsip MT","body":"Magnetic Particle Testing mendeteksi cacat permukaan dan near-surface pada material ferromagnetik dengan memanfaatkan kebocoran medan magnet. Saat material dimagnetisasi, cacat membuat medan keluar dari permukaan dan menarik partikel besi yang ditaburkan."},{"heading":"Material yang cocok","body":"Hanya material ferromagnetik: baja karbon, baja paduan rendah, besi cor. Stainless steel austenitic dan aluminum tidak bisa diinspeksi dengan MT."},{"heading":"Sensitivitas","body":"MT sangat sensitif terhadap retak halus permukaan yang sulit dilihat secara visual — mampu mendeteksi crack lebar 1 mikron."}]}',
   300, NULL),
  (2, 'animated', 'Visualisasi Magnetic Flux Leakage',
   '{"sceneCaption":"Saat material ferromagnetik dimagnetisasi dan ada cacat permukaan, garis medan magnet bocor keluar permukaan. Partikel besi tertarik ke titik bocor itu, membentuk indikasi yang mudah terlihat.","slides":[]}',
   360, 'mt-flux-leakage'),
  (3, 'reading', 'Wet vs Dry technique',
   '{"slides":[{"heading":"Dry technique","body":"Partikel kering ditaburkan ke permukaan. Cocok untuk inspeksi lapangan, permukaan kasar, dan suhu tinggi (sampai 315°C dengan partikel khusus)."},{"heading":"Wet technique","body":"Partikel disuspensikan dalam carrier (oli atau air). Lebih sensitif untuk crack halus dan permukaan halus. Bisa fluorescent untuk inspeksi UV-A."},{"heading":"Pemilihan","body":"Wet fluorescent paling sensitif tapi butuh booth gelap. Dry visible cocok untuk lapangan terbuka."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Pengantar MT',
   '{"description":"Konfirmasi pemahaman dasar prinsip Magnetic Particle.","questionCount":4,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- PT-L1 Module 1
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu Liquid Penetrant Testing?',
   '{"slides":[{"heading":"Prinsip PT","body":"Liquid Penetrant Testing memanfaatkan capillary action — cairan dengan viskositas rendah meresap ke dalam celah retak permukaan. Setelah excess dihapus, developer menarik penetran keluar dan membuat indikasi yang kontras."},{"heading":"Aplikasi","body":"Cocok untuk semua material non-porous: logam, keramik, plastik. Tidak terbatas pada material ferromagnetik seperti MT."},{"heading":"Keunggulan","body":"Murah, cepat, dan portable. Cocok untuk inspeksi lapangan dan pre-weld inspection."}]}',
   280, NULL),
  (2, 'animated', 'Capillary action — bagaimana penetran bekerja',
   '{"sceneCaption":"Penetran cair masuk ke retak melalui aksi kapiler. Setelah dwell time cukup, excess dihapus, dan developer menarik penetran keluar — membentuk indikasi yang jauh lebih lebar dari retak aslinya.","slides":[]}',
   400, 'pt-capillary'),
  (3, 'reading', 'Visible vs Fluorescent',
   '{"slides":[{"heading":"Visible (Type II)","body":"Penetran berwarna merah cerah, dilihat di cahaya putih biasa. Sederhana, cepat, cocok untuk lapangan."},{"heading":"Fluorescent (Type I)","body":"Penetran berfluoresensi di bawah UV-A. Sensitivitas jauh lebih tinggi, mampu mendeteksi retak yang lebih halus. Butuh booth gelap dan UV lamp."},{"heading":"Pemilihan","body":"Visible untuk inspeksi cepat lapangan; fluorescent untuk komponen kritis seperti pesawat dan turbin."}]}',
   280, NULL),
  (4, 'quiz', 'Mini-quiz — Pengantar PT',
   '{"description":"Konfirmasi pemahaman dasar prinsip Liquid Penetrant.","questionCount":4,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- RT-L1 Module 1
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu Radiographic Testing?',
   '{"slides":[{"heading":"Prinsip RT","body":"Radiographic Testing memakai radiasi pengion — X-ray atau gamma-ray — untuk membuat citra dari struktur internal material. Cacat di dalam terlihat sebagai variasi kepadatan pada film atau detektor digital."},{"heading":"Volumetric inspection","body":"Berbeda dengan PT/MT yang hanya mendeteksi surface flaw, RT bisa melihat cacat dalam material — porosity, slag, lack of penetration di tengah weld."},{"heading":"Risiko & regulasi","body":"Karena memakai radiasi pengion, RT tunduk pada peraturan keselamatan ketat (ALARA, dose limits). Operator butuh sertifikasi RSO terpisah."}]}',
   340, NULL),
  (2, 'animated', 'X-ray menembus material',
   '{"sceneCaption":"Sumber radiasi mengirim foton energi tinggi melewati material. Bagian dengan kepadatan lebih rendah (cacat, void) membiarkan lebih banyak foton lewat, menghasilkan area lebih gelap pada film. Cacat solid menyerap lebih banyak — area lebih terang.","slides":[]}',
   420, 'rt-xray-imaging'),
  (3, 'reading', 'X-ray vs Gamma-ray',
   '{"slides":[{"heading":"X-ray (tabung)","body":"Listrik dihidup-matikan; bisa diatur kV/mA. Cocok untuk fasilitas tetap dan pekerjaan harian. Energi 100-450 kV."},{"heading":"Gamma-ray (isotop)","body":"Iridium-192 (E ≈ 380 keV, half-life 74 hari) atau Cobalt-60 (E ≈ 1.25 MeV, half-life 5.27 tahun). Tidak butuh listrik, portable, cocok lapangan."},{"heading":"Pemilihan","body":"X-ray = kontrol energi, kualitas citra superior. Gamma = portable, akses sempit. Trade-off antara kualitas dan logistik."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Pengantar RT',
   '{"description":"Konfirmasi pemahaman dasar prinsip Radiographic Testing.","questionCount":4,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- VT-L1 Module 1
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu Visual Testing?',
   '{"slides":[{"heading":"Metode NDT pertama","body":"Visual Testing adalah metode NDT paling fundamental dan paling lama dipakai. Sebelum metode lain dipakai, VT selalu dilakukan terlebih dahulu untuk mendeteksi cacat permukaan yang jelas terlihat."},{"heading":"Tidak hanya \"melihat\"","body":"VT yang benar adalah inspeksi sistematis dengan kriteria penerimaan jelas, dokumentasi, dan tools (kaca pembesar, mistar, gauge). Bukan sekadar melihat sekilas."},{"heading":"Aplikasi","body":"Pre-weld inspection, post-weld inspection, in-service inspection, fitness-for-service evaluation."}]}',
   240, NULL),
  (2, 'reading', 'Direct vs Remote Visual',
   '{"slides":[{"heading":"Direct Visual","body":"Mata telanjang langsung memandang permukaan, jarak ≤ 600 mm dengan sudut ≥ 30°. Standar paling sering dipakai di lapangan."},{"heading":"Remote Visual","body":"Borescope, fiberscope, atau pan-tilt camera untuk akses area sempit (boiler tube interior, pressure vessel internal)."},{"heading":"Optical aids","body":"Magnifying lens, mirror, dye chalk untuk meningkatkan kontras retak halus."}]}',
   260, NULL),
  (3, 'reading', 'Standar pencahayaan',
   '{"slides":[{"heading":"1000 lux minimum","body":"AWS D1.1 dan ASME V Article 9 mensyaratkan minimum 1000 lux di permukaan inspeksi. Lux meter wajib digunakan untuk verifikasi."},{"heading":"Kontras","body":"Latar belakang kontras (kertas putih di belakang weld) membantu mendeteksi retak halus."},{"heading":"UV-A untuk fluorescent VT","body":"Saat VT digabung dengan fluorescent dye, lampu UV-A 1000 µW/cm² minimum dengan booth gelap."}]}',
   280, NULL),
  (4, 'quiz', 'Mini-quiz — Pengantar VT',
   '{"description":"Konfirmasi pemahaman dasar prinsip Visual Testing.","questionCount":4,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'VT-L1' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- ET-L1 Module 1
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu Eddy Current Testing?',
   '{"slides":[{"heading":"Prinsip ET","body":"Eddy Current Testing memanfaatkan induksi elektromagnetik. Coil yang dialiri arus AC menciptakan medan magnet bergetar. Saat coil dekat material konduktif, eddy current terinduksi di material — dan cacat mengganggu pola eddy current itu, terdeteksi sebagai perubahan impedansi coil."},{"heading":"Material yang cocok","body":"Hanya material konduktif: baja, aluminum, copper, brass, titanium. Tidak bisa untuk plastik atau keramik."},{"heading":"Aplikasi terbesar","body":"Inspeksi tubing heat exchanger, coating thickness, conductivity sorting, surface crack detection di aluminum aerospace."}]}',
   320, NULL),
  (2, 'reading', 'Skin depth & frekuensi',
   '{"slides":[{"heading":"Skin effect","body":"Eddy current terkonsentrasi dekat permukaan. Kedalaman penetrasi disebut skin depth, dan dipengaruhi frekuensi, konduktivitas, dan permeabilitas."},{"heading":"Trade-off frekuensi","body":"Frekuensi tinggi = sensitivitas tinggi tapi penetrasi rendah (cocok cacat surface). Frekuensi rendah = penetrasi dalam tapi sensitivitas turun."},{"heading":"Rumus standar","body":"δ ≈ 50 / √(f × σ × μ_r) mm. Hafalkan untuk Level I."}]}',
   340, NULL),
  (3, 'reading', 'Probe types',
   '{"slides":[{"heading":"Surface probe","body":"Coil kecil untuk inspeksi titik per titik pada permukaan datar atau lengkung."},{"heading":"Encircling / bobbin","body":"Encircling untuk bar/rod (tube luar), bobbin untuk tube interior. Dipakai pada inspeksi heat exchanger."},{"heading":"Array probe","body":"Multiple coil disusun, scan cepat dengan resolusi tinggi. Standar industri modern."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Pengantar ET',
   '{"description":"Konfirmasi pemahaman dasar prinsip Eddy Current.","questionCount":4,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 1
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- Verify
SELECT
  lp.code,
  COUNT(DISTINCT m.id) AS modules,
  COUNT(DISTINCT ls.id) AS steps
FROM "LearningPaths" lp
LEFT JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.code IN ('UT-L1','MT-L1','PT-L1','RT-L1','VT-L1','ET-L1')
GROUP BY lp.code
ORDER BY lp.code;
