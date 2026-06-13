-- ============================================
-- SNS NDT E-Learning: Comprehensive Quiz Questions
-- Run AFTER all e-learning content seed files
-- ============================================
-- Adds 100+ real quiz questions linked to LessonStepId
-- so QuizRunner pulls them automatically per step.
-- Reference: ASNT CP-105, ANSI/ASNT CP-105, study guides per method
-- ============================================

-- Helper: assume LessonStep id can be looked up via path code + module orderIndex + step orderIndex.
-- Pattern: insert via subquery JOIN.

-- ============================================
-- UT-L1 Module 2 quiz (Step 6) — Fisika Ultrasound
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'UT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Hubungan dasar antara kecepatan, frekuensi, dan panjang gelombang adalah:',
   '["c = f × λ", "c = f / λ", "c = f + λ", "c = f - λ"]', 0,
   'Kecepatan suara = frekuensi × panjang gelombang. Hubungan fundamental dalam fisika gelombang.', 'physics', 'easy'),
  ('Kecepatan longitudinal pada baja kira-kira:',
   '["1480 m/s", "3230 m/s", "5900 m/s", "6320 m/s"]', 2,
   'Baja: longitudinal ~5900 m/s, shear ~3230 m/s. 1480 m/s adalah air, 6320 m/s aluminum.', 'physics', 'medium'),
  ('Tipe gelombang yang TIDAK bisa merambat di liquid adalah:',
   '["Longitudinal", "Shear (transverse)", "Surface (Rayleigh)", "Lamb"]', 1,
   'Shear wave butuh modulus geser yang tidak dimiliki liquid. Hanya solid yang bisa propagate shear wave.', 'physics', 'medium'),
  ('Frekuensi tinggi pada UT memberikan:',
   '["Resolusi tinggi, penetrasi rendah", "Resolusi rendah, penetrasi tinggi", "Resolusi tinggi, penetrasi tinggi", "Resolusi rendah, penetrasi rendah"]', 0,
   'Frekuensi tinggi → wavelength pendek → resolusi tinggi tapi atenuasi besar → penetrasi terbatas.', 'physics', 'easy'),
  ('Atenuasi paling tinggi terjadi pada material dengan:',
   '["Grain halus", "Grain kasar", "Permukaan halus", "Densitas rendah"]', 1,
   'Material grain kasar (cast iron, austenitic stainless steel) memiliki banyak boundary yang scatter sound.', 'physics', 'medium'),
  ('Kecepatan suara di air adalah sekitar:',
   '["340 m/s", "1480 m/s", "5900 m/s", "2730 m/s"]', 1,
   'Air: 1480 m/s. 340 m/s adalah udara. 5900 m/s baja. 2730 m/s acrylic.', 'physics', 'easy'),
  ('Surface (Rayleigh) wave merambat dengan kedalaman penetrasi sekitar:',
   '["Sangat dalam", "Setengah panjang gelombang", "Satu panjang gelombang", "Sepuluh panjang gelombang"]', 2,
   'Rayleigh wave terkonsentrasi dekat permukaan, kedalaman efektif ~1λ.', 'physics', 'hard'),
  ('Mode konversi paling sering terjadi pada:',
   '["Permukaan datar normal beam", "Interface dengan sudut", "Material homogen", "Vacuum"]', 1,
   'Pada interface dengan sudut, energi bisa convert antara longitudinal & shear wave (Snell law).', 'physics', 'medium')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 2 AND ls."orderIndex" = 6 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- UT-L1 Module 3 quiz (Step 5) — Couplant & Calibration
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'UT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Acoustic impedance Z dihitung dengan rumus:',
   '["Z = ρ × c", "Z = ρ / c", "Z = ρ + c", "Z = ρ × f"]', 0,
   'Z = ρ × c, dengan ρ densitas dan c velocity. Unit: Rayl atau kg/(m²·s).', 'calibration', 'easy'),
  ('Tanpa couplant, energi UT yang ditransmisikan ke baja adalah:',
   '["~99%", "~50%", "~12%", "~0.1%"]', 3,
   'Air gap antara probe dan steel hampir reflect 99.9% energy karena impedance mismatch besar.', 'calibration', 'medium'),
  ('Block kalibrasi paling umum untuk angle beam UT adalah:',
   '["IIW V1", "Step wedge", "Flat plate", "Hemispherical"]', 0,
   'IIW V1 (International Institute of Welding) adalah block standar untuk angle beam calibration.', 'calibration', 'easy'),
  ('DAC (Distance Amplitude Correction) dipakai untuk:',
   '["Mengukur ketebalan", "Mengompensasi atenuasi dengan jarak", "Mendeteksi material", "Mengubah frekuensi"]', 1,
   'DAC adalah curve referensi yang mengompensasi penurunan amplitudo akibat attenuasi & beam spread.', 'calibration', 'medium'),
  ('Couplant dengan acoustic impedance roughly halfway between probe dan specimen memberikan:',
   '["Refleksi maksimum", "Transfer energi optimal", "Beam terpantul ke probe", "Tidak ada efek"]', 1,
   'Z-matching meminimalisir reflection di interface, memaksimalkan energi yang masuk ke specimen.', 'calibration', 'hard'),
  ('IIW V1 block memiliki ketebalan utama:',
   '["10 mm", "25 mm", "100 mm", "200 mm"]', 1,
   'IIW V1 standard thickness 25 mm dengan multiple reference reflectors untuk angle beam calibration.', 'calibration', 'medium'),
  ('Saat mengganti couplant pertengahan inspeksi, harus:',
   '["Tidak masalah", "Re-kalibrasi DAC", "Switch ke probe lain", "Stop inspeksi permanently"]', 1,
   'DAC valid hanya jika couplant sama dengan saat kalibrasi. Beda couplant = beda transfer = invalidasi DAC.', 'calibration', 'hard'),
  ('Untuk inspeksi pada permukaan vertikal atau overhead, couplant terbaik adalah:',
   '["Air biasa", "Glycerin gel", "Cellulose paste", "Silicon oil"]', 2,
   'Cellulose paste lebih kental dan tidak melorot. Gel meleleh, water mengalir ke bawah.', 'calibration', 'medium')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 3 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- UT-L1 Module 4 quiz (Step 5) — Transduser & Beam
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'UT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Material piezoelektrik yang umum dipakai dalam transduser UT adalah:',
   '["Aluminum", "PZT (Lead Zirconate Titanate)", "Iron", "Copper"]', 1,
   'PZT adalah material piezoelektrik standar industri. Lithium niobate dan composite juga dipakai.', 'equipment', 'easy'),
  ('Near field (Fresnel zone) panjangnya dihitung dengan rumus:',
   '["N = D / 4λ", "N = D² / 4λ", "N = 4D / λ", "N = D × λ"]', 1,
   'N = D²/(4λ), dengan D diameter probe dan λ panjang gelombang. Hafalkan untuk Level I.', 'equipment', 'medium'),
  ('Sizing flaw paling akurat dilakukan di:',
   '["Near field", "Far field", "Pada permukaan", "Tidak bisa di-size"]', 1,
   'Near field memiliki interferensi yang membuat sizing tidak akurat. Far field punya beam pattern predictable.', 'equipment', 'medium'),
  ('Snell''s Law dalam UT menghubungkan:',
   '["Frekuensi & velocity", "Sudut datang & sudut bias dengan velocity", "Densitas & atenuasi", "Amplitudo & jarak"]', 1,
   'sin θ₁/c₁ = sin θ₂/c₂. Sudut bias depend velocity di kedua medium.', 'equipment', 'medium'),
  ('First critical angle (perspex ke baja) sekitar:',
   '["10°", "27.5°", "45°", "57°"]', 1,
   'First critical: longitudinal wave refract 90°. ~27.5° untuk wedge perspex ke baja.', 'equipment', 'hard'),
  ('Probe angle beam umum untuk inspeksi las:',
   '["10°, 20°, 30°", "45°, 60°, 70°", "80°, 85°, 90°", "100°, 120°"]', 1,
   '45°, 60°, 70° adalah sudut angle beam standar untuk inspeksi las. Memungkinkan beam capture cacat planar.', 'equipment', 'easy'),
  ('Backing material pada transduser berfungsi:',
   '["Memantulkan suara", "Damping vibrasi crystal", "Mengontrol temperatur", "Sebagai isolator listrik"]', 1,
   'Backing menyerap vibrasi belakang crystal supaya pulse pendek (resolusi axial baik).', 'equipment', 'medium')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 4 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- UT-L1 Module 5 quiz — Defect Interpretation (10 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'UT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Cacat las paling kritis untuk struktur beban siklik adalah:',
   '["Porosity", "Slag inclusion", "Crack", "Excessive reinforcement"]', 2,
   'Crack (planar, sharp, sering branched) → fatigue failure. Selalu REJECT semua code.', 'defects', 'easy'),
  ('Echo dari porosity biasanya muncul sebagai:',
   '["Single high amplitude sharp", "Multiple small scattered", "Loss of back-wall echo total", "No signal"]', 1,
   'Porosity = banyak void kecil → multiple low amplitude scattered echoes.', 'defects', 'medium'),
  ('Lack of fusion (LOF) pada angle beam UT terlihat sebagai:',
   '["Multiple round echoes", "Linear sharp signal at sidewall location", "Loss of penetration echo", "No visible signal"]', 1,
   'LOF planar paralel groove face → echo amplitudo tinggi dan linear di lokasi sidewall.', 'defects', 'medium'),
  ('A-scan menampilkan:',
   '["Top view dengan amplitudo warna", "Cross-section dengan depth", "Amplitudo vs time-of-flight", "3D model defect"]', 2,
   'A-scan: vertikal = amplitudo, horizontal = waktu (jarak). Display fundamental UT.', 'equipment', 'easy'),
  ('B-scan menampilkan:',
   '["Amplitudo vs time", "Cross-section view (posisi vs depth)", "Top-down area", "3D rendering"]', 1,
   'B-scan: cross-section dengan probe position vs depth/time-of-flight.', 'equipment', 'medium'),
  ('Mode-converted echo paling sering muncul saat:',
   '["Normal beam", "Angle beam pada interface", "Immersion testing", "Calibration block check"]', 1,
   'Pada angle beam, sebagian energi convert dari shear ke longitudinal di interface — bisa salah dibaca.', 'defects', 'hard'),
  ('Lamination pada plat rolled paling jelas terdeteksi dengan:',
   '["45° angle beam", "Normal beam (straight beam)", "70° angle beam", "Surface wave"]', 1,
   'Lamination paralel permukaan → straight beam akan langsung tegak lurus terhadap defect.', 'defects', 'medium'),
  ('Geometric reflector (corner, weld cap) bukan cacat tapi muncul sebagai echo karena:',
   '["Material defect", "Permukaan refleksi geometry yang predictable", "Couplant pooling", "Probe malfunction"]', 1,
   'Geometric features memantulkan beam predictable. Operator harus aware geometri specimen.', 'defects', 'hard'),
  ('Slag inclusion biasanya menampilkan:',
   '["Single high amplitude sharp peak", "Multiple medium amplitude in cluster", "No signal", "Saturated signal"]', 1,
   'Slag chain dari SMAW = pattern multiple medium amplitude — typical signature.', 'defects', 'medium'),
  ('Crack pada UT signature paling khas adalah:',
   '["Low amplitude scattered", "High amplitude sharp linear", "Saturated wide blob", "Multiple small peaks"]', 1,
   'Crack = planar reflector tajam → amplitudo sangat tinggi (sering saturated), sharp peak, linear extent.', 'defects', 'medium')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 5 AND ls."orderIndex" = 6 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- UT-L1 Module 6 quiz — Procedures & Code (6 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'UT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Code utama untuk UT pada pressure equipment adalah:',
   '["ASME V Article 4", "ASME I", "API 510", "AWS A2.4"]', 0,
   'ASME Section V Article 4 spesifik untuk Ultrasonic Testing pada pressure equipment.', 'code', 'easy'),
  ('Welding code yang umum dipakai untuk struktur baja adalah:',
   '["ASME V", "AWS D1.1", "API 1104", "ISO 17640"]', 1,
   'AWS D1.1 = Structural Welding Code Steel. Acceptance criteria untuk weld struktural.', 'code', 'medium'),
  ('Written procedure UT harus di-qualify oleh:',
   '["Level I", "Level II", "Level III", "Inspector teknis"]', 2,
   'Level III bertanggung jawab develop dan qualify procedure. Level I dan II execute.', 'code', 'medium'),
  ('Re-verifikasi kalibrasi UT minimal dilakukan setiap:',
   '["1 jam", "4 jam atau perubahan kondisi", "8 jam", "Akhir shift"]', 1,
   'ASME V mensyaratkan re-verify setiap 4 jam atau saat operator/equipment/material berubah.', 'code', 'medium'),
  ('In-service inspection pada storage tank diatur oleh:',
   '["API 510", "API 570", "API 653", "ASME VIII"]', 2,
   'API 653 spesifik untuk above-ground storage tank inspection.', 'code', 'hard'),
  ('Audit trail UT inspection harus mencakup:',
   '["Hanya nama inspector", "Procedure, equipment serial, calibration block, operator cert", "Hanya hasil akhir", "Hanya tanggal"]', 1,
   'Traceability lengkap: procedure no, equipment serial, calibration evidence, operator cert.', 'code', 'easy')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'UT-L1' AND m."orderIndex" = 6 AND ls."orderIndex" = 4 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- MT-L1 Module 6 quiz — Indication interpretation (8 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'MT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Indikasi linear didefinisikan sebagai indikasi dengan panjang:',
   '["≥ 3× lebar", "≥ 5× lebar", "= lebar", "< 2× lebar"]', 0,
   'Linear: panjang ≥ 3× lebar. Round: panjang < 3× lebar. Klasifikasi standar.', 'interpretation', 'easy'),
  ('Magnetic writing adalah:',
   '["Cacat asli yang ditandai dengan magnetic", "Indikasi palsu dari sentuhan magnet eksternal", "Tipe partikel khusus", "Calibration mark"]', 1,
   'Magnetic writing = false indication dari kontak material magnetik lain (yoke, hammer). Demag & re-test.', 'interpretation', 'medium'),
  ('Indikasi crack pada MT muncul sebagai:',
   '["Round, scattered", "Linear, sharp, sering branched", "Tidak terlihat", "Wide diffuse blob"]', 1,
   'Crack = linear sharp dengan akumulasi partikel padat, sering branched.', 'interpretation', 'easy'),
  ('Untuk konfirmasi indikasi crack di MT, secondary method paling cocok adalah:',
   '["RT", "PT (penetrant)", "ET", "VT only"]', 1,
   'PT excellent untuk konfirmasi crack permukaan. Lebih cepat dan murah dari secondary methods.', 'interpretation', 'medium'),
  ('Surface scratch yang menyerupai indikasi linear bisa dibedakan dengan:',
   '["Re-magnetize lagi", "Visual inspection setelah cleaning", "Pakai partikel berbeda", "Tidak ada cara"]', 1,
   'Setelah cleaning, scratch tetap visible secara visual sedangkan crack indikasi hilang sampai re-magnetize.', 'interpretation', 'medium'),
  ('Pada material ferromagnetik, cacat yang TIDAK terdeteksi MT adalah cacat dengan orientasi:',
   '["Tegak lurus terhadap flux", "Paralel terhadap flux", "Sudut 45°", "Sudut 30°"]', 1,
   'Cacat paralel ke flux line tidak menyebabkan flux leakage → tidak terdeteksi. Itulah kenapa harus 2 arah.', 'interpretation', 'medium'),
  ('Verifikasi indikasi asli dilakukan dengan:',
   '["Ambil photo saja", "Re-clean & re-magnetize, indikasi muncul lagi", "Pindah ke spot lain", "Tidak perlu verifikasi"]', 1,
   'Re-test setelah cleaning. Indikasi asli akan muncul kembali di lokasi sama. False indication tidak.', 'interpretation', 'easy'),
  ('Indikasi pada heat-affected zone (HAZ) yang muncul di tepi clad area kemungkinan:',
   '["Selalu cacat asli", "Material boundary atau cladding interface — bukan cacat", "Probe malfunction", "Surface oxidation"]', 1,
   'Material boundary akumulasi flux. Kenali dari geometri material, not necessarily defect.', 'interpretation', 'hard')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 6 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- MT-L1 Module 3 quiz — Magnetisasi techniques (7 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'MT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('AC yoke harus memiliki lifting power minimum:',
   '["1 kg", "4.5 kg (10 lb)", "10 kg", "18 kg (40 lb)"]', 1,
   'AC yoke: 4.5 kg (10 lb). DC yoke: 18 kg (40 lb). Verify before each shift.', 'equipment', 'medium'),
  ('Yoke menghasilkan field tipe:',
   '["Circular", "Longitudinal", "Random", "Static only"]', 1,
   'Yoke dengan dua kaki di permukaan → longitudinal field di antara kaki.', 'equipment', 'easy'),
  ('Risiko paling besar dari prod technique adalah:',
   '["Magnetic writing", "Arc strike (terbakar permukaan)", "Demag", "Battery drain"]', 1,
   'Arc strike = bekas terbakar dari electrical arc. Tidak boleh untuk aerospace material.', 'equipment', 'medium'),
  ('Coil magnetization mendeteksi cacat dengan orientasi:',
   '["Sepanjang sumbu komponen (longitudinal cracks)", "Melingkar (transverse cracks)", "Tidak ada", "Random"]', 1,
   'Coil → longitudinal field sepanjang sumbu → mendeteksi cacat melingkar (transversal).', 'equipment', 'hard'),
  ('Untuk inspeksi penuh, magnetization harus dilakukan:',
   '["Satu arah saja", "Dua arah saling tegak lurus", "Random angle", "Pada satu sisi saja"]', 1,
   'Cacat hanya terdeteksi tegak lurus flux. Dua arah tegak lurus = coverage komplit.', 'equipment', 'easy'),
  ('Prod spacing untuk arus 4-5 A/mm adalah pertimbangan untuk:',
   '["Voltage", "Field strength yang cukup di area inspeksi", "Battery life", "Display brightness"]', 1,
   'Prod spacing menentukan area inspection. 4-5 A/mm adalah aturan ampere per millimeter spacing.', 'equipment', 'hard'),
  ('Multi-directional MT melakukan magnetisasi:',
   '["Hanya circular", "Hanya longitudinal", "Beberapa arah simultan atau switch cepat", "Permanent"]', 2,
   'Equipment modern memungkinkan switch cepat atau simultaneous untuk efisiensi.', 'equipment', 'medium')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'MT-L1' AND m."orderIndex" = 3 AND ls."orderIndex" = 6 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- PT-L1 Module 5 quiz — Excess Removal (6 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'PT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Saat solvent removal, urutan wipe yang benar adalah:',
   '["Solvent → dry", "Dry → solvent damp → dry", "Spray solvent langsung ke part → wipe", "Solvent damp → dry"]', 1,
   'Step 1: dry wipe untuk hilangkan excess. Step 2: solvent damp wipe untuk bersih final. JANGAN spray langsung.', 'technique', 'medium'),
  ('Water wash pressure maksimum adalah:',
   '["10 psi", "40 psi (276 kPa)", "100 psi", "200 psi"]', 1,
   'ASME V Article 6: max 40 psi. Higher pressure akan wash out indikasi crack.', 'technique', 'medium'),
  ('Spray solvent langsung ke permukaan dapat menyebabkan:',
   '["Tidak ada efek", "Penetran terdorong masuk ke crack lalu keluar", "Sensitivitas naik", "Tidak boleh disebut"]', 1,
   'Spray langsung mendorong penetran di permukaan masuk ke crack lalu wash out — invalidasi inspection.', 'technique', 'hard'),
  ('Tujuan utama excess removal yang benar adalah:',
   '["Menghapus dari permukaan, BUKAN dari crack", "Menghapus dari crack juga", "Tidak perlu hapus", "Hapus penetran 100%"]', 0,
   'Aturan dasar: hilangkan dari permukaan. Penetran di crack HARUS tetap untuk indikasi terbentuk.', 'technique', 'easy'),
  ('Indikator excess removal sukses pada visible PT:',
   '["Permukaan bersih dari penetran berlebih", "Permukaan masih merah merata", "Tidak ada penetran sama sekali", "Surface masih basah"]', 0,
   'Permukaan harus tampak bersih dari excess penetran tapi penetran tetap di crack.', 'technique', 'easy'),
  ('Untuk fluorescent PT, verifikasi excess removal dilakukan dengan:',
   '["Lampu putih saja", "UV light di booth gelap", "Mata telanjang", "Microscope"]', 1,
   'Verify di UV — permukaan tidak boleh ada green glow merata. Hanya indikasi spot yang glow.', 'technique', 'medium')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 5 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- PT-L1 Module 8 quiz — Indication interpretation (7 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'PT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Indikasi linear pada PT didefinisikan sebagai panjang:',
   '["= lebar", "≥ 2× lebar", "≥ 3× lebar", "≥ 5× lebar"]', 2,
   'Linear ≥ 3× lebar, round < 3× lebar. Standar klasifikasi.', 'interpretation', 'easy'),
  ('Bleed-back adalah:',
   '["Penetran muncul kembali setelah hilang", "Penetran terjebak di scratch atau lap", "False indication dari cleaning", "Penetran kembali ke container"]', 1,
   'Bleed-back: penetran masuk celah luar yang tidak ter-clean → muncul indikasi di lokasi tidak sebenarnya.', 'interpretation', 'medium'),
  ('Dwell time developer minimum per ASME V Article 6 adalah:',
   '["1 menit", "5 menit", "7 menit", "30 menit"]', 2,
   'Min 7 menit per ASME V. Max 30 menit. Reading multi-stage untuk catch slow bleed-out.', 'interpretation', 'medium'),
  ('Cleaning fluid traces yang tertinggal bisa menyebabkan:',
   '["Tidak ada masalah", "False indication berfluoresensi", "Kalibrasi off", "Equipment damage"]', 1,
   'Solvent atau cleaner residual berfluoresensi atau warna mirip penetran → false indication.', 'interpretation', 'hard'),
  ('Crack besar pada PT terlihat sebagai indikasi yang:',
   '["Muncul cepat dan spread", "Muncul lambat dan tetap precise", "Tidak terlihat", "Saturated saja"]', 0,
   'Crack besar release banyak penetran dengan cepat → indikasi muncul cepat dan spread/lebar.', 'interpretation', 'medium'),
  ('Crack halus (tight) pada PT terlihat sebagai indikasi yang:',
   '["Muncul cepat", "Muncul lambat dan precise", "Tidak akan muncul", "Sama dengan crack besar"]', 1,
   'Crack tight release penetran sedikit per unit time → indikasi gradual dan stay precise. Beri waktu cukup.', 'interpretation', 'medium'),
  ('Untuk verify indikasi yang meragukan, langkah terbaik adalah:',
   '["Asumsi indikasi asli", "Re-clean dan re-test full process", "Spray developer lagi", "Ignore"]', 1,
   'Tidak boleh re-spray developer saja. Harus full re-test dari awal kalau perlu konfirmasi.', 'interpretation', 'easy')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 8 AND ls."orderIndex" = 4 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- RT-L1 Module 3 quiz — Radiation Safety (8 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'RT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Singkatan ALARA berarti:',
   '["As Low As Reasonably Achievable", "Always Limit Active Radiation Areas", "All Levels Are Reduced Always", "Average Limit At Reasonable Activity"]', 0,
   'ALARA: filosofi radiation protection — kurangi exposure ke level paling rendah yang praktis.', 'safety', 'easy'),
  ('Tiga pilar perlindungan radiasi adalah:',
   '["Time, Distance, Shielding", "Power, Speed, Strength", "Voltage, Current, Time", "Source, Film, Distance"]', 0,
   'TDS: kurangi durasi exposure, jauhkan dari source, lapisan attenuating.', 'safety', 'easy'),
  ('Inverse square law: jika jarak dari source 2× lebih jauh, dose rate menjadi:',
   '["Sama", "1/2", "1/4", "2×"]', 2,
   'Dose rate ∝ 1/r². Jarak 2× → dose 1/4. Distance adalah perlindungan paling powerful.', 'safety', 'medium'),
  ('Annual dose limit untuk occupational worker adalah:',
   '["1 mSv", "5 mSv", "50 mSv (5 rem)", "500 mSv"]', 2,
   'Per ICRP & banyak regulator: 50 mSv/year occupational. Public 1 mSv/year.', 'safety', 'medium'),
  ('Half-life Iridium-192 adalah:',
   '["1 hari", "30 hari", "74 hari", "5 tahun"]', 2,
   'Ir-192: 74 hari. Co-60: 5.27 tahun. Setelah 1 half-life, source intensity 50%.', 'safety', 'medium'),
  ('Saat source stuck (tidak masuk container), tindakan pertama adalah:',
   '["Coba paksa masuk", "Evakuasi area, isolate, panggil RSO", "Lanjut shoot", "Diamkan saja"]', 1,
   'EMERGENCY situation. Evakuasi, isolate, panggil Radiation Safety Officer. Jangan dekati source.', 'safety', 'hard'),
  ('Dosimeter yang harus dipakai operator RT adalah:',
   '["Hanya TLD", "Hanya pocket dosimeter", "TLD/OSL + pocket dosimeter (real-time)", "Tidak perlu"]', 2,
   'TLD untuk record passive monthly. Pocket/EPD untuk real-time alert dose tinggi.', 'safety', 'medium'),
  ('Survey meter dipakai untuk:',
   '["Mengukur film density", "Mengukur dose rate area", "Calibrate exposure", "Cek battery"]', 1,
   'Survey meter (Geiger atau ion chamber) cek dose rate sebelum approach source.', 'safety', 'easy')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 3 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- RT-L1 Module 9 quiz — Defect interpretation (10 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'RT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Porosity pada radiograph terlihat sebagai:',
   '["Linear dark di centerline", "Round dark scattered atau cluster", "Lighter than base metal", "Tidak terlihat"]', 1,
   'Porosity: void → less material → lebih banyak radiasi tembus → area dark round pada radiograph.', 'interpretation', 'easy'),
  ('Lack of penetration (LOP) muncul sebagai:',
   '["Round scattered", "Linear dark di centerline (root)", "Sharp branched", "Lighter areas"]', 1,
   'LOP = root tidak terisi → linear void di centerline → sangat dark karena void besar.', 'interpretation', 'medium'),
  ('Crack pada radiograph paling khas:',
   '["Round dark", "Linear dark, sharp, often branched", "Lighter than base", "Multiple small spots"]', 1,
   'Crack: linear, sharp edge, often branched. Most critical defect — selalu reject.', 'interpretation', 'medium'),
  ('Slag inclusion biasanya tampil sebagai:',
   '["Round dark", "Irregular elongated dark within weld", "Linear sharp", "Lighter spots"]', 1,
   'Slag = material non-metallic less dense → dark, irregular, often elongated.', 'interpretation', 'medium'),
  ('Density target untuk X-ray per ASME V adalah:',
   '["0.5-1.5", "1.8-4.0", "5.0-8.0", "Tidak diatur"]', 1,
   'Density 1.8-4.0 untuk X-ray, 2.0-4.0 untuk gamma. Outside → re-shoot.', 'quality', 'medium'),
  ('IQI (Image Quality Indicator) dipakai untuk:',
   '["Mengukur thickness", "Verify image quality / sensitivity", "Mengukur radiasi", "Calibration source"]', 1,
   'IQI = device kalibrasi quality. Wire/hole minimum yang harus terlihat = sensitivity check.', 'quality', 'easy'),
  ('Crimp marks pada film adalah:',
   '["Cacat asli", "Artifact dari handling film tertekuk", "Dari source", "Dari developer"]', 1,
   'Crimp: bekas tekuk fisik pada film → artifact, bukan defect. Pattern tidak natural.', 'interpretation', 'medium'),
  ('Geometric unsharpness Ug dihitung dengan rumus:',
   '["Ug = (F × OFD) / SOD", "Ug = SOD / F", "Ug = F + OFD", "Ug = SOD × OFD"]', 0,
   'Ug = (F × OFD) / SOD. F = focal spot size, OFD = object-to-film distance, SOD = source-to-object distance. Perbesar SOD & perkecil OFD untuk menurunkan Ug.', 'quality', 'hard'),
  ('Untuk verify apakah indikasi adalah cacat asli atau artifact, langkah terbaik:',
   '["Re-shoot dari sudut berbeda", "Increase exposure", "Decrease density", "Change developer"]', 0,
   'Real defect tetap terlihat dari multiple angle. Artifact film bisa hilang dengan re-shoot.', 'interpretation', 'medium'),
  ('Lamination pada plat sering sulit terdeteksi RT karena:',
   '["Material tidak konduktif", "Cacat paralel ke beam (orthogonal view tidak show)", "RT tidak bisa untuk plat", "Frekuensi terlalu tinggi"]', 1,
   'Lamination paralel permukaan → orthogonal view tidak captures. Edge view lebih efektif.', 'interpretation', 'hard')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'RT-L1' AND m."orderIndex" = 9 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- VT-L1 Module 4 quiz — Weld profile (7 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'VT', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Undercut adalah:',
   '["Weld terlalu tinggi", "Groove di base metal di sebelah weld toe", "Weld tidak menyatu", "Crater crack"]', 1,
   'Undercut: groove di base metal → reduce cross-section → stress concentration. AWS D1.1 limit ketat.', 'defects', 'easy'),
  ('Overlap pada weld adalah:',
   '["Weld penetrate maksimal", "Weld metal overflow ke base tanpa fusion (crevice)", "Heat-affected zone besar", "Penetration normal"]', 1,
   'Overlap = lap antara weld metal dan base metal tanpa fusion. Crevice yang retain corrosive.', 'defects', 'medium'),
  ('AWS D1.1 acceptance untuk crack pada weld:',
   '["Allowed sampai size tertentu", "Reject semua", "Hanya transverse crack reject", "Allow jika di repair area"]', 1,
   'Crack: REJECT semua, tidak ada exception. AWS D1.1 dan semua welding code.', 'code', 'easy'),
  ('Distance maksimum mata dari permukaan inspeksi per ASME V Article 9:',
   '["100 mm", "300 mm", "600 mm (24 inch)", "1 meter"]', 2,
   '600 mm dengan sudut ≥ 30°. Aturan baku visual inspection.', 'inspection', 'medium'),
  ('Lighting minimum pada permukaan inspeksi adalah:',
   '["100 lux", "500 lux", "1000 lux", "5000 lux"]', 2,
   '1000 lux per ASME V. Verify dengan lux meter setiap shift.', 'inspection', 'easy'),
  ('Crater crack adalah:',
   '["Crack di start of weld", "Crack di end of weld pass, sering star shape", "Crack di base metal", "Crack di HAZ"]', 1,
   'Crater crack = crack di akhir pass weld saat solidifikasi terlalu cepat. Sering star shape.', 'defects', 'medium'),
  ('Excessive reinforcement pada weld dapat menyebabkan:',
   '["Stress concentration & fatigue concern", "Ketahanan beban naik", "Tidak ada efek", "Korosi turun"]', 0,
   'Cap weld terlalu tinggi → stress concentration di toe → fatigue risk. Acceptance limit per code.', 'defects', 'medium')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'VT-L1' AND m."orderIndex" = 4 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- ET-L1 Module 4 quiz — Impedance plane (7 questions)
-- ============================================
INSERT INTO "QuizQuestions" ("LessonStepId", question, options, "correctAnswer", explanation, category, method, level, difficulty)
SELECT ls.id, q.question, q.options::jsonb, q."correctAnswer", q.explanation, q.category, 'ET', 'Level I', q.difficulty
FROM "LessonSteps" ls
JOIN "Modules" m ON ls."ModuleId" = m.id
JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  ('Skin depth formula adalah:',
   '["δ = 50 / √(f × σ × μᵣ)", "δ = f × σ", "δ = f / σ", "δ = √(f + σ)"]', 0,
   'δ = 50/√(fσμᵣ) mm. Hafalkan untuk Level I — fondasi semua perhitungan ET.', 'physics', 'medium'),
  ('Frekuensi tinggi pada ET memberikan:',
   '["Penetrasi dalam, sensitivitas rendah", "Penetrasi rendah, sensitivitas tinggi", "Keduanya naik", "Keduanya turun"]', 1,
   'Frekuensi tinggi → skin depth kecil → sensitif crack permukaan tapi tidak penetrate dalam.', 'physics', 'medium'),
  ('Lift-off adalah:',
   '["Probe diangkat dari material", "Defect signal", "Calibration mark", "Filter setting"]', 0,
   'Lift-off: jarak coil dari permukaan. Variasi → impedance change → bisa salah dibaca sebagai defect.', 'technique', 'easy'),
  ('Bobbin probe paling sering dipakai untuk:',
   '["Surface inspection", "Heat exchanger tube inspection", "Plate inspection", "Welding"]', 1,
   'Bobbin probe internal tubing inspection — aplikasi terbesar ET di industri.', 'application', 'easy'),
  ('Impedance plane menampilkan:',
   '["Amplitude vs time", "Resistance vs reactance change", "Frequency vs sensitivity", "Distance vs amplitude"]', 1,
   'X-Y display dengan X = resistance, Y = reactance. Setiap kondisi material/defect = titik di plane.', 'equipment', 'medium'),
  ('Differential bobbin paling cocok untuk:',
   '["Gradual wall thinning", "Local pitting/defect kecil", "General corrosion", "Coating thickness"]', 1,
   'Differential = dua coil close-spaced → defect kecil mudah terdeteksi. Local pit signature jelas.', 'application', 'medium'),
  ('ET hanya bisa untuk material:',
   '["Semua material", "Plastic dan keramik", "Konduktif (logam)", "Magnetik saja"]', 2,
   'ET butuh material konduktif untuk eddy current bisa terinduksi. Tidak bisa plastic/keramik.', 'physics', 'easy')
) AS q(question, options, "correctAnswer", explanation, category, difficulty)
WHERE lp.code = 'ET-L1' AND m."orderIndex" = 4 AND ls."orderIndex" = 5 AND ls.kind = 'quiz'
ON CONFLICT DO NOTHING;

-- ============================================
-- Verification
-- ============================================
SELECT
  lp.code,
  COUNT(DISTINCT ls.id) FILTER (WHERE ls.kind = 'quiz') AS quiz_steps,
  COUNT(DISTINCT qq.id) AS total_questions
FROM "LearningPaths" lp
JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
LEFT JOIN "QuizQuestions" qq ON qq."LessonStepId" = ls.id
WHERE lp.code IN ('UT-L1', 'MT-L1', 'PT-L1', 'RT-L1', 'VT-L1', 'ET-L1')
GROUP BY lp.code
ORDER BY lp.code;
