-- ============================================
-- SNS NDT E-Learning: MT Level I — Comprehensive Content
-- Run AFTER create_elearning_tables.sql + seed_elearning_module1_all_methods.sql
-- Reference: ASNT CP-105, SNT-TC-1A, ASTM E709, ASME V Article 7, ISO 9934
-- ============================================

-- MODULE 2 — Fisika Magnetic Flux Leakage
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Konsep medan magnet & flux',
   '{"slides":[{"heading":"Medan magnet (B)","body":"Diukur dalam Gauss (G) atau Tesla (T). 1 T = 10000 G. Material ferromagnetik mengkonsentrasikan flux line saat dimagnetisasi."},{"heading":"Magnetic flux density","body":"Flux per unit area. Material dengan permeabilitas tinggi (steel) mengonsentrasikan flux. Aluminum/copper tidak."},{"heading":"Permeabilitas relatif","body":"μᵣ steel: 100-5000. μᵣ aluminum: ~1. Itulah kenapa MT hanya untuk material ferromagnetik."}]}',
   400, NULL),
  (2, 'reading', 'Bagaimana flux leakage terjadi',
   '{"slides":[{"heading":"Mekanisme dasar","body":"Saat material ferromagnetik dimagnetisasi dan terdapat diskontinuitas tegak lurus terhadap flux line, flux ''keluar'' dari permukaan di lokasi cacat — disebut flux leakage."},{"heading":"Orientasi cacat","body":"Cacat paralel ke flux tidak terdeteksi. Cacat tegak lurus paling kuat terdeteksi. Sudut 45° masih cukup terlihat."},{"heading":"Kedalaman penetrasi","body":"MT efektif untuk cacat permukaan dan near-surface (sampai ~6 mm). Lebih dalam membutuhkan metode lain (UT, RT)."}]}',
   460, NULL),
  (3, 'animated', 'Visualisasi flux leakage pada cacat',
   '{"sceneCaption":"Lihat bagaimana garis medan magnet mengalir di material ferromagnetik. Saat ada cacat permukaan tegak lurus, flux bocor keluar dan menarik partikel besi yang ditaburkan.","slides":[]}',
   480, 'mt-flux-leakage-detail'),
  (4, 'reading', 'Hysteresis & residual magnetism',
   '{"slides":[{"heading":"Curve hysteresis","body":"Plot B vs H — saat H dihilangkan, B tidak kembali nol. Sisa magnetisasi disebut residual magnetism (Br)."},{"heading":"Coercive force","body":"H yang dibutuhkan untuk mengurangi B kembali ke nol — kunci untuk demagnetisasi."},{"heading":"Implikasi MT","body":"Material dengan high retentivity bisa pakai residual technique. Low retentivity butuh continuous technique (current ON saat inspeksi)."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Fisika MT',
   '{"description":"6 soal tentang medan magnet, flux leakage, hysteresis, dan permeabilitas.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 2
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 3 — Magnetisasi (Yoke, Prod, Coil)
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Yoke — magnetisasi longitudinal portable',
   '{"slides":[{"heading":"Cara kerja","body":"Yoke berbentuk U dengan dua kaki ditempelkan ke permukaan. AC atau DC mengalir membentuk longitudinal field di antara kaki."},{"heading":"Ketentuan lifting power","body":"AC yoke: minimum 4.5 kg (10 lb) lift. DC yoke: minimum 18 kg (40 lb) lift. Verify before each shift."},{"heading":"Aplikasi","body":"Inspeksi spot pada las dan komponen kecil-medium. Paling populer untuk lapangan karena portable."}]}',
   400, NULL),
  (2, 'reading', 'Prod — magnetisasi circular kontak',
   '{"slides":[{"heading":"Cara kerja","body":"Dua prod elektroda menempel ke permukaan, arus tinggi (4-5 A/mm spacing) mengalir, menciptakan circular field di sekitar prod."},{"heading":"Risiko","body":"Arc strike — bekas terbakar di material dari electrical arc. Gunakan tip yang bersih, arus tidak terlalu tinggi, tekanan kontak baik."},{"heading":"Aplikasi","body":"Inspeksi area besar yang tidak bisa dijangkau yoke. Tidak boleh untuk material aerospace karena risiko arc strike."}]}',
   420, NULL),
  (3, 'reading', 'Coil — magnetisasi longitudinal volumetric',
   '{"slides":[{"heading":"Cara kerja","body":"Komponen dimasukkan ke dalam coil yang dialiri arus. Field longitudinal sepanjang sumbu komponen."},{"heading":"5-step rule","body":"Komponen efektif diinspeksi sampai jarak 5× radius coil dari pusat. Beyond itu field terlalu lemah."},{"heading":"Aplikasi","body":"Bench inspection untuk part shaft, bolt, casting. Cocok untuk shop NDT yang stationary."}]}',
   400, NULL),
  (4, 'reading', 'Magnetic field direction — circular vs longitudinal',
   '{"slides":[{"heading":"Aturan dasar","body":"Cacat hanya terdeteksi jika tegak lurus terhadap flux. Maka inspeksi harus dilakukan dalam DUA arah magnetisasi yang saling tegak lurus."},{"heading":"Circular field","body":"Mendeteksi cacat longitudinal (sepanjang sumbu komponen). Dihasilkan oleh head shot atau prod."},{"heading":"Longitudinal field","body":"Mendeteksi cacat transversal (melingkar). Dihasilkan oleh yoke atau coil."},{"heading":"Multi-directional","body":"Equipment modern bisa ganti cepat antara dua arah, atau bahkan simultan untuk efisiensi."}]}',
   480, NULL),
  (5, 'animated', 'Field direction visualization',
   '{"sceneCaption":"Demo bagaimana arah field circular vs longitudinal mendeteksi cacat dengan orientasi berbeda. Mengapa dua arah selalu wajib.","slides":[]}',
   480, 'mt-field-direction'),
  (6, 'quiz', 'Mini-quiz — Magnetisasi techniques',
   '{"description":"7 soal — yoke vs prod vs coil, lifting power, dan field direction.","questionCount":7,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 3
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 4 — Particle & Carrier
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Dry powder vs Wet suspension',
   '{"slides":[{"heading":"Dry technique","body":"Partikel ferromagnetik dalam bentuk powder, ditaburkan menggunakan bulb atau shaker. Cocok lapangan, suhu tinggi (sampai 315°C), permukaan kasar."},{"heading":"Wet technique","body":"Partikel disuspensikan dalam carrier (oil-based atau water-based). Lebih sensitif untuk crack halus, permukaan halus."},{"heading":"Pemilihan","body":"Wet fluorescent paling sensitif. Dry visible paling praktis lapangan. Pilihan tergantung procedure dan code."}]}',
   400, NULL),
  (2, 'reading', 'Visible vs Fluorescent particles',
   '{"slides":[{"heading":"Visible particles","body":"Warna kontras tinggi terhadap permukaan: red, black, gray. Inspeksi di cahaya putih ≥1000 lux."},{"heading":"Fluorescent particles","body":"Berfluoresensi di bawah UV-A. Sensitivitas jauh lebih tinggi — mendeteksi crack <1 mikron lebar."},{"heading":"Kebutuhan UV","body":"UV-A ≥ 1000 µW/cm² pada permukaan inspeksi. Booth gelap (≤20 lux ambient white light)."}]}',
   420, NULL),
  (3, 'reading', 'Carrier fluid — water vs oil',
   '{"slides":[{"heading":"Oil carrier","body":"Petroleum distillate dengan flash point >93°C. Tidak korosif, lebih sensitif, tapi lebih mahal dan flammable risk."},{"heading":"Water carrier","body":"Tambahan wetting agent + corrosion inhibitor + anti-foam. Murah, tidak flammable, tapi perlu post-clean untuk hindari korosi."},{"heading":"Concentration","body":"Wet bath: 1.2-2.4 mL/100 mL untuk visible, 0.1-0.4 mL/100 mL untuk fluorescent. Cek dengan settling test."}]}',
   400, NULL),
  (4, 'reading', 'Settling test & bath maintenance',
   '{"slides":[{"heading":"Mengapa settling test","body":"Memverifikasi konsentrasi partikel dalam carrier sesuai spec. Kalau terlalu encer, sensitivitas turun. Terlalu pekat, false indication."},{"heading":"Cara kerja","body":"100 mL bath dimasukkan centrifuge tube, didiamkan 30 menit. Volume sediment harus 1.2-2.4 mL untuk visible, 0.1-0.4 mL untuk fluorescent."},{"heading":"Frekuensi","body":"Awal shift, atau setiap 8 jam. Catat di logbook."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Particles & Carrier',
   '{"description":"6 soal tentang dry/wet, visible/fluorescent, dan bath concentration.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 4
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 5 — Surface Preparation & Lighting
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Persiapan permukaan',
   '{"slides":[{"heading":"Apa yang harus dihilangkan","body":"Oil, grease, paint thick (>50 µm), rust, scale, dirt. Semua ini menutupi atau menahan partikel sehingga indikasi tidak terbentuk dengan baik."},{"heading":"Metode pembersihan","body":"Solvent wipe, vapor degrease, alkaline cleaner, atau wire brush. Pilih sesuai kondisi material dan kontaminan."},{"heading":"Roughness limit","body":"Per ASTM E709, surface roughness ≤ 6.3 µm Ra umumnya OK. Lebih kasar → switch ke dry technique."}]}',
   400, NULL),
  (2, 'reading', 'Coating allowed?',
   '{"slides":[{"heading":"Aturan thickness","body":"Per ASME V Article 7, coating ≤ 50 µm (2 mil) generally allowed jika sudah didemonstrasikan tidak menutupi indikasi."},{"heading":"Demonstrasi","body":"Test pada specimen identik dengan dan tanpa coating — verify cacat masih terdeteksi."},{"heading":"When to remove","body":"Coating tebal, cracked, peeling, atau tidak tested → harus dihilangkan."}]}',
   320, NULL),
  (3, 'reading', 'Lighting requirements',
   '{"slides":[{"heading":"Visible MT","body":"Minimum 1000 lux pada permukaan inspeksi. Verify pakai lux meter."},{"heading":"Fluorescent MT","body":"UV-A ≥ 1000 µW/cm² pada permukaan + ambient white light ≤ 20 lux. Verify pakai UV meter dan lux meter."},{"heading":"Eye adaptation","body":"Inspector wajib adapt 1 menit di booth gelap sebelum inspeksi. UV blocking glasses untuk safety."}]}',
   360, NULL),
  (4, 'quiz', 'Mini-quiz — Surface & Lighting',
   '{"description":"5 soal tentang persiapan permukaan, coating limit, dan standar lighting.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 5
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 6 — Indikasi: Real vs False
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Tipe indikasi cacat asli',
   '{"slides":[{"heading":"Linear vs Round","body":"Linear: panjang ≥ 3× lebar. Round: panjang < 3× lebar. Klasifikasi penting untuk acceptance criteria."},{"heading":"Crack","body":"Linear, sharp, sering branched. Indikasi tajam dengan akumulasi partikel padat."},{"heading":"Lack of fusion","body":"Linear di area las. Lokasi typical: weld toe, sidewall."},{"heading":"Porosity","body":"Round, scattered. Multiple kecil-kecil."}]}',
   460, NULL),
  (2, 'reading', 'False indications',
   '{"slides":[{"heading":"Magnetic writing","body":"Partikel terkumpul di lokasi yang pernah disentuh material magnetik lain (yoke, hammer). Hilangkan dengan demag dan re-test."},{"heading":"Surface features","body":"Forging line, machining mark, scratches — bisa mirip indikasi linear. Bedakan dengan visual inspection setelah MT."},{"heading":"Material boundary","body":"Cladding interface atau heat-affected zone bisa akumulasi flux. Kenali dari geometri material."},{"heading":"Strikethrough magnetism","body":"Bagian yang berdekatan terlalu lama di field — residual magnet menarik partikel non-defect related."}]}',
   500, NULL),
  (3, 'animated', 'Real vs False — visual comparison',
   '{"sceneCaption":"Komparasi visual: indikasi linear cacat asli (sharp, terkumpul rapat) vs magnetic writing (loose, scattered) dan surface scratch.","slides":[]}',
   600, 'mt-real-vs-false'),
  (4, 'reading', 'Process verifikasi indikasi',
   '{"slides":[{"heading":"Re-test setelah cleaning","body":"Bersihkan permukaan, re-magnetize, re-apply particles. Indikasi asli akan muncul lagi di lokasi sama."},{"heading":"Confirm dengan secondary method","body":"PT (penetrant) untuk konfirmasi crack permukaan. UT untuk near-surface depth measurement."},{"heading":"Visual + magnification","body":"Setelah cleaning, gunakan magnifier 10× untuk konfirmasi visual."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Indication interpretation',
   '{"description":"8 soal tentang klasifikasi indikasi, false indications, dan verification process.","questionCount":8,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 6
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 7 — Demagnetisasi
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Mengapa demag penting',
   '{"slides":[{"heading":"Risiko residual magnetism","body":"Residual magnetism mengganggu welding (arc deflection), menarik chip ke moving parts (bearing, gear), interferensi dengan instrumen di sekitar."},{"heading":"Gauss limit","body":"Per ASTM E709, residual magnetism ≤ 3 G untuk komponen umum. Aerospace lebih ketat ≤ 2 G."},{"heading":"Verifikasi","body":"Pakai field indicator (gaussmeter) — measure pada beberapa titik komponen."}]}',
   360, NULL),
  (2, 'reading', 'Teknik demagnetisasi',
   '{"slides":[{"heading":"AC decay","body":"Komponen ditaruh dalam AC field yang amplitudonya gradually diturunkan ke nol. Paling efektif untuk material thin & medium."},{"heading":"Reverse DC","body":"DC field di-reverse dengan polaritas berkurang setiap step. Efektif untuk material tebal yang AC tidak penetrate."},{"heading":"Walking through","body":"Komponen lewat coil AC sambil ditarik perlahan. Cocok untuk komponen panjang."},{"heading":"Heating above Curie","body":"Dipanaskan >Curie temperature (~770°C steel) lalu cooling lambat. Ekstrim, jarang dipakai."}]}',
   460, NULL),
  (3, 'reading', 'Setelah demag — verifikasi',
   '{"slides":[{"heading":"Field indicator (gaussmeter)","body":"Letakkan probe pada multiple points: ends, center, area yang dimagnetisasi. Catat reading tertinggi."},{"heading":"Simple field strength meter","body":"Murah, baca ±20 G. Cukup untuk verifikasi umum lapangan."},{"heading":"Hall effect probe","body":"Akurat ±0.1 G. Standar untuk aerospace dan critical components."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Demag',
   '{"description":"5 soal tentang teknik demag, gauss limit, dan verifikasi.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 7
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 8 — Procedures & Code
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Code utama untuk MT',
   '{"slides":[{"heading":"ASME V Article 7","body":"Code utama untuk MT pada pressure equipment. Mengatur magnetisasi, lighting, particles, acceptance criteria."},{"heading":"ASTM E709","body":"Standard guide untuk MT — lebih praktikal, banyak diadopsi industri."},{"heading":"AWS D1.1","body":"Welding code dengan acceptance criteria spesifik untuk struktur baja."},{"heading":"ISO 9934","body":"International standard untuk MT testing."}]}',
   400, NULL),
  (2, 'reading', 'Bagian written procedure',
   '{"slides":[{"heading":"Scope","body":"Material, geometry, ketebalan, area inspeksi."},{"heading":"Equipment","body":"Yoke/coil/prod model + serial, gaussmeter, lux meter, particles."},{"heading":"Magnetisasi","body":"Tipe field (circular/longitudinal), arah, current type, ampere/turn, dwell time."},{"heading":"Inspection","body":"Lighting, viewing distance, scanning pattern, magnification."},{"heading":"Acceptance","body":"Per applicable code — sering merujuk section spesifik."}]}',
   460, NULL),
  (3, 'quiz', 'Mini-quiz — Code & Procedures',
   '{"description":"5 soal tentang ASME V, ASTM E709, dan struktur procedure.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 8
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 9 — Field Workshop
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Setup yoke inspection',
   '{"slides":[{"heading":"Pre-inspection check","body":"Yoke lifting power test, lux meter pada permukaan, particle siap, gaussmeter standby."},{"heading":"Sequence","body":"Clean → magnetize 1st direction → apply particles → inspect → mark indikasi → demag → magnetize 2nd direction → repeat."},{"heading":"Time per inspection","body":"Continuous: particles applied during magnetization. Residual: applied after for high-retentivity material."}]}',
   400, NULL),
  (2, 'animated', 'Step-by-step weld inspection demo',
   '{"sceneCaption":"Demo inspeksi MT pada weld plat dengan yoke. Dua arah field, particle application, indikasi marking, dan reporting.","slides":[]}',
   720, 'mt-weld-workshop'),
  (3, 'reading', 'Common mistakes & troubleshooting',
   '{"slides":[{"heading":"Insufficient field","body":"Indikasi lemah atau tidak terbentuk → cek lifting power, kontak yoke, prod spacing."},{"heading":"Magnetic writing residual","body":"Selalu demag antara dua arah magnetisasi atau setelah moving yoke."},{"heading":"Over-spray particles","body":"Bath terlalu banyak menutupi indikasi halus. Apply tipis, biarkan partikel mengikuti flux."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — Field practice',
   '{"description":"5 soal tentang field setup, sequencing, dan troubleshooting.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 9
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 10 — Reporting
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'MT report essentials',
   '{"slides":[{"heading":"Header","body":"Date, project, weld ID, drawing reference, procedure number, inspector cert."},{"heading":"Equipment & calibration","body":"Yoke/equipment serial, lifting power test result, particles batch, lighting verification."},{"heading":"Magnetization details","body":"Type, direction, current, dwell time, gauss reading."},{"heading":"Findings","body":"Indication location, type (linear/round), length, classification (accept/reject)."},{"heading":"Sign-off","body":"Inspector + level, supervisor, date."}]}',
   480, NULL),
  (2, 'reading', 'Photo + sketch documentation',
   '{"slides":[{"heading":"Photo with reference","body":"Mistar dan label terlihat. Untuk fluorescent: foto di booth dengan UV light, exposure manual."},{"heading":"Sketch","body":"Cross-section weld dengan indikasi marked. Datum line dari weld start."},{"heading":"Digital archive","body":"Naming: Project_Weld_Date_Method. Retention 5 tahun atau per code requirement."}]}',
   320, NULL),
  (3, 'quiz', 'Mini-quiz — Reporting',
   '{"description":"4 soal tentang isi report dan documentation.","questionCount":4,"passingScore":75}',
   400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 10
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 11 — Recap
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Konsep kunci yang harus dikuasai',
   '{"slides":[{"heading":"Field types","body":"Circular vs longitudinal — kapan dipakai, mendeteksi orientasi cacat apa."},{"heading":"Yoke vs Prod vs Coil","body":"Lifting power, application area, risk arc strike."},{"heading":"Particles","body":"Wet vs dry, visible vs fluorescent, settling test."},{"heading":"Demag","body":"Limit 3 G, AC decay vs reverse DC."}]}',
   480, NULL),
  (2, 'quiz', 'Practice exam — 20 soal mixed',
   '{"description":"Latihan komprehensif menggabungkan semua topik MT-L1.","questionCount":20,"passingScore":75}',
   1800, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 11
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 12 — Final
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Aturan main final assessment',
   '{"slides":[{"heading":"Format","body":"40 soal multiple-choice · 90 menit · minimal 75% lulus."},{"heading":"Konten","body":"Distribusi: physics 25%, equipment/technique 30%, indication interpretation 25%, code/safety 20%."},{"heading":"Konsekuensi","body":"Lulus → sertifikat SNS-MT-L1 otomatis terbit. Gagal → retake setelah 7 hari (max 3x dalam 6 bulan)."}]}',
   300, NULL),
  (2, 'quiz', 'FINAL ASSESSMENT — MT Level I',
   '{"description":"Ujian sertifikasi MT Level I — 40 soal. Lulus: ≥75%.","questionCount":40,"passingScore":75,"isFinal":true}',
   5400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 12
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- Verify
SELECT m."orderIndex", m.title, COUNT(ls.id) AS steps, SUM(ls."durationSeconds")/60 AS minutes
FROM "LearningPaths" lp JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.code = 'MT-L1'
GROUP BY m."orderIndex", m.title ORDER BY m."orderIndex";
