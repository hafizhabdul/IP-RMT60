-- ============================================
-- SNS NDT E-Learning: ET Level I — Comprehensive Content
-- Run AFTER create_elearning_tables.sql + seed_elearning_module1_all_methods.sql
-- Reference: ASNT CP-105, ASME V Article 8, ASTM E309/E243, ISO 15549
-- ============================================

-- MODULE 2 — Electromagnetic Induction Fundamentals
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Faraday law & induced current',
   '{"slides":[{"heading":"Hukum Faraday","body":"Perubahan medan magnet menginduksi tegangan listrik di konduktor. Inilah dasar semua eddy current testing."},{"heading":"Coil sebagai generator","body":"AC current di coil → AC magnetic field → induced current di material konduktif (eddy currents)."},{"heading":"Lenz law","body":"Eddy current mengalir berlawanan untuk menentang perubahan field. Inilah yang detect oleh probe — opposition field menambah/mengurangi impedance coil."}]}',
   400, NULL),
  (2, 'reading', 'Skin depth & frequency',
   '{"slides":[{"heading":"Skin effect","body":"Eddy current konsentrasinya tertinggi dekat permukaan, decay exponentially ke dalam material."},{"heading":"Skin depth formula","body":"δ ≈ 21 / √(f × σ × μᵣ) mm. f dalam kHz, σ dalam %IACS, μᵣ relative permeability. HAFALKAN."},{"heading":"Praktik","body":"100 kHz aluminum (σ=40%IACS, μᵣ=1): δ ≈ 21/√(100×40×1) ≈ 0.33 mm. 100 kHz steel (σ=10%IACS, μᵣ=100): δ ≈ 21/√(100×10×100) ≈ 0.07 mm. Frekuensi rendah → penetrasi dalam, sensitivitas rendah."}]}',
   460, NULL),
  (3, 'reading', 'Trade-off frequency selection',
   '{"slides":[{"heading":"Frekuensi tinggi (>1 MHz)","body":"Cocok deteksi crack permukaan. Sensitivitas tinggi, tapi penetrasi <0.5 mm."},{"heading":"Frekuensi medium (10-100 kHz)","body":"Standard untuk inspeksi tubing dan permukaan. Compromise sensitivity vs penetration."},{"heading":"Frekuensi rendah (<10 kHz)","body":"Penetrasi dalam (sampai 5+ mm), tapi sensitivitas turun. Pakai untuk near-surface defect detection."}]}',
   400, NULL),
  (4, 'animated', 'Eddy current generation visualization',
   '{"sceneCaption":"Lihat bagaimana coil AC menciptakan eddy currents di material konduktif. Cacat mengganggu pola eddy current → impedance coil berubah → display.","slides":[]}',
   480, 'et-eddy-current-gen'),
  (5, 'quiz', 'Mini-quiz — EM induction',
   '{"description":"6 soal tentang Faraday, skin depth, frequency selection.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 2
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 3 — Probe Types
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Surface probe (pencil)',
   '{"slides":[{"heading":"Konstruksi","body":"Single coil kecil di tip cylindrical. Diameter 2-10 mm typical."},{"heading":"Aplikasi","body":"Inspeksi titik per titik pada permukaan datar atau gentle curve. Crack detection di weld, structural, machined parts."},{"heading":"Limitasi","body":"Slow scanning, satu titik per scan. Lift-off sensitive."}]}',
   360, NULL),
  (2, 'reading', 'Encircling & bobbin probe',
   '{"slides":[{"heading":"Encircling probe","body":"Coil mengelilingi diameter luar bar/rod. Inspeksi seragam keliling. Cocok produksi tubing dari OD."},{"heading":"Bobbin probe","body":"Coil internal yang dimasukkan ke dalam tube. Standard untuk heat exchanger inspection. Differential atau absolute config."},{"heading":"Differential vs absolute","body":"Differential: dua coil baca beda → defect kecil terdeteksi. Absolute: satu coil → cocok untuk gradual changes (wall thinning)."}]}',
   460, NULL),
  (3, 'reading', 'Array probe',
   '{"slides":[{"heading":"Multiple coil arrangement","body":"Banyak coil disusun, scan area lebar dalam satu pass. Modern productivity boost."},{"heading":"Resolution","body":"Resolusi tinggi karena multiple coil baca simultaneously. Ideal untuk pipeline & heat exchanger."},{"heading":"Cost","body":"Probe + electronics jauh lebih mahal dari single coil. Justifiable untuk volume tinggi."}]}',
   360, NULL),
  (4, 'reading', 'Lift-off effect',
   '{"slides":[{"heading":"Apa itu","body":"Jarak antara coil dan permukaan material. Perubahan jarak → impedance change yang bisa salah dibaca sebagai defect."},{"heading":"Compensasi","body":"Probe modern dengan two-frequency atau lift-off mixing menghilangkan signal lift-off otomatis."},{"heading":"Manual technique","body":"Praktek: tangan stabil, light pressure, consistent contact. Verify dengan signal pada area no-defect."}]}',
   360, NULL),
  (5, 'quiz', 'Mini-quiz — Probe types',
   '{"description":"7 soal tentang surface, bobbin, array, lift-off.","questionCount":7,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 3
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 4 — Impedance Plane
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Apa itu impedance plane',
   '{"slides":[{"heading":"X-Y display","body":"Sumbu X = resistance change, Y = reactance change. Setiap kondisi material/defect = titik di plane."},{"heading":"Operating point","body":"Point at zero defect (balanced air or reference). Movement dari sini = signal."},{"heading":"Magnitude & phase","body":"Magnitude = jarak dari operating point. Phase = sudut dari sumbu X. Keduanya bawa info berbeda."}]}',
   400, NULL),
  (2, 'reading', 'Conductivity, lift-off, & defect signatures',
   '{"slides":[{"heading":"Conductivity change","body":"Beda material atau temper → moves along ''conductivity curve''."},{"heading":"Lift-off","body":"Probe diangkat → moves along ''lift-off line''. Direction predictable, bisa di-rotate ke horizontal axis."},{"heading":"Crack","body":"Surface crack pada conductive material → signature spesifik per frequency. Phase angle differentiate dari lift-off."}]}',
   420, NULL),
  (3, 'animated', 'Reading impedance plane',
   '{"sceneCaption":"Walkthrough impedance plane: probe pada calibration block dengan crack, lift-off variation, dan conductivity change. Lihat phase angle differences.","slides":[]}',
   600, 'et-impedance-plane'),
  (4, 'reading', 'Phase rotation & analysis',
   '{"slides":[{"heading":"Phase rotation","body":"Modern instrument bisa rotate phase untuk align lift-off ke horizontal. Defect yang muncul vertical = signal pure."},{"heading":"Mixing channel","body":"Two-frequency: signal channel - reference channel = defect-only display. Cancel out lift-off & support plate signals."},{"heading":"Filter & threshold","body":"Set amplitude threshold untuk reject signal kecil. Adjustable per inspection requirement."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Impedance plane',
   '{"description":"7 soal tentang plane reading, phase, mixing.","questionCount":7,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 4
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 5 — Calibration & Reference
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Reference standards',
   '{"slides":[{"heading":"EDM notch","body":"Electrical-discharge machined notch dengan dimensi presisi. Standard untuk crack reference."},{"heading":"Drilled holes","body":"FBH (flat bottom hole) atau through-hole pada material reference. Standard untuk volumetric defect."},{"heading":"ASTM standards","body":"E309 untuk material conductivity. E243 untuk tubing inspection. Patuhi dimensi standar."}]}',
   400, NULL),
  (2, 'reading', 'Calibration sequence',
   '{"slides":[{"heading":"Step 1","body":"Set frequency per procedure. Pilih probe yang tepat."},{"heading":"Step 2","body":"Balance probe di area no-defect (operating point ke center display)."},{"heading":"Step 3","body":"Scan reference standard. Adjust gain sehingga signal dari notch reference = predetermined amplitude (typical 80% FSH)."},{"heading":"Step 4","body":"Verify dengan multiple notch atau hole. Document parameter di calibration sheet."}]}',
   400, NULL),
  (3, 'reading', 'Mid-shift verification',
   '{"slides":[{"heading":"Mengapa wajib","body":"Equipment drift karena temperature, battery, atau lift-off variation. Re-verify per procedure."},{"heading":"Frekuensi","body":"ASME V: setiap 4 jam atau saat operator change. ASTM: tergantung procedure."},{"heading":"Action saat fail","body":"Recalibrate dari awal. Re-scan semua weld/tube sejak last good calibration."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Calibration',
   '{"description":"5 soal tentang reference, sequence, mid-shift.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 5
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 6 — Heat Exchanger Tube Inspection
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Aplikasi terbesar ET',
   '{"slides":[{"heading":"Mengapa heat exchanger","body":"Tubing tersusun rapat, tidak accessible secara visual atau RT. Bobbin probe ET adalah satu-satunya cara inspeksi feasibles."},{"heading":"Defect types","body":"Pitting, ID/OD wall loss, dent, support plate ID, tube-to-tube sheet weld defect."},{"heading":"Industri","body":"Petrokimia (kondisi corrosive), nuklir (regulasi ketat), HVAC, marine."}]}',
   360, NULL),
  (2, 'reading', 'Bobbin probe technique',
   '{"slides":[{"heading":"Differential bobbin","body":"Two coil close-spaced. Defect kecil → signal jelas. Cocok untuk pitting & local defect."},{"heading":"Absolute bobbin","body":"Single coil. Cocok deteksi gradual wall thinning yang spread."},{"heading":"Pull speed","body":"Pull rate konstan, typical 0.5-1 m/s. Inconsistent speed → signal artifact."}]}',
   400, NULL),
  (3, 'animated', 'Heat exchanger tube inspection demo',
   '{"sceneCaption":"Demo bobbin probe melewati tube. Saat probe melewati support plate, dent, dan pit — lihat signature di display.","slides":[]}',
   720, 'et-tube-inspection'),
  (4, 'reading', 'Defect interpretation tubing',
   '{"slides":[{"heading":"Pit","body":"Sharp localized signal. Pit deeper >40% wall = repair/plug needed."},{"heading":"Wall loss general","body":"Gradual broad signal. Quantify with multi-frequency mixing."},{"heading":"Support plate","body":"Predictable repeating signal at known intervals — bukan defect, ini reference geometric."},{"heading":"Tube end (tube sheet)","body":"Strong signal di end. Different signature dari pit di mid-tube."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Tube inspection',
   '{"description":"6 soal tentang bobbin, signal interpretation, defect types.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 6
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 7 — Procedures & Code
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Code utama untuk ET',
   '{"slides":[{"heading":"ASME V Article 8","body":"Code utama untuk ET pada pressure equipment."},{"heading":"ASTM E309","body":"Standard practice untuk inspeksi tubing dengan eddy current."},{"heading":"ASTM E243","body":"Untuk pipe & tube manufacturing inspection."},{"heading":"ISO 15549","body":"International standard untuk EC inspection."}]}',
   320, NULL),
  (2, 'reading', 'Written procedure essentials',
   '{"slides":[{"heading":"Scope","body":"Material, tubing OD/ID, ketebalan, defect type yang dicari."},{"heading":"Equipment","body":"EC instrument model, probe spec, cabel, calibration block."},{"heading":"Calibration","body":"Reference notch/hole, frequency, gain setting, phase rotation."},{"heading":"Acceptance","body":"Signal threshold, defect categorization."}]}',
   320, NULL),
  (3, 'quiz', 'Mini-quiz — Code & Procedure',
   '{"description":"4 soal tentang code dan procedure.","questionCount":4,"passingScore":75}',
   400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 7
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 8 — Recap
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Comprehensive review',
   '{"slides":[{"heading":"Konsep kunci","body":"Faraday law, skin depth δ = 21/√(fσμᵣ), frequency selection."},{"heading":"Probe","body":"Surface vs encircling vs bobbin vs array. Differential vs absolute."},{"heading":"Impedance plane","body":"X-Y reading, lift-off vs defect phase angle."},{"heading":"Heat exchanger","body":"Bobbin technique, pull speed, signal interpretation."}]}',
   480, NULL),
  (2, 'quiz', 'Practice exam — 20 soal mixed',
   '{"description":"Latihan komprehensif ET-L1.","questionCount":20,"passingScore":75}',
   1800, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 8
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 9 — Final
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Aturan main',
   '{"slides":[{"heading":"Format","body":"40 soal · 90 menit · ≥75% lulus."},{"heading":"Distribusi","body":"Physics 30%, probe/equipment 25%, impedance plane/calibration 25%, application/code 20%."},{"heading":"Konsekuensi","body":"Lulus → sertifikat SNS-ET-L1 otomatis. Note: prerequisite MT-L1 wajib sudah lulus untuk akses ET path."}]}',
   320, NULL),
  (2, 'quiz', 'FINAL ASSESSMENT — ET Level I',
   '{"description":"Ujian sertifikasi ET Level I — 40 soal.","questionCount":40,"passingScore":75,"isFinal":true}',
   5400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 9
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

SELECT m."orderIndex", m.title, COUNT(ls.id) AS steps, SUM(ls."durationSeconds")/60 AS minutes
FROM "LearningPaths" lp JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.code = 'ET-L1'
GROUP BY m."orderIndex", m.title ORDER BY m."orderIndex";
