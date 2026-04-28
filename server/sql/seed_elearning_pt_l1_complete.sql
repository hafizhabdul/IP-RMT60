-- ============================================
-- SNS NDT E-Learning: PT Level I — Comprehensive Content
-- Run AFTER create_elearning_tables.sql + seed_elearning_module1_all_methods.sql
-- Reference: ASNT CP-105, ASTM E165, ASME V Article 6, ISO 3452
-- ============================================

-- MODULE 2 — Capillary Action Physics
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Aksi kapiler — bagaimana cairan masuk celah halus',
   '{"slides":[{"heading":"Tegangan permukaan","body":"Cairan punya tegangan permukaan akibat gaya kohesi antar molekul. Air tegangan ~72 mN/m, penetrant ~30 mN/m — lebih rendah lebih baik untuk masuk celah halus."},{"heading":"Sudut kontak (wetting)","body":"Sudut antara cairan dan permukaan padat. Wetting baik: <90° (cairan menyebar). Sudut tinggi: cairan menggumpal — tidak masuk celah."},{"heading":"Persamaan kapiler","body":"Tinggi naik h = (2γcosθ) / (ρgr) — γ tegangan permukaan, θ sudut kontak, r jari-jari capillary. Penetrant sengaja didesain low γ + good wetting."}]}',
   460, NULL),
  (2, 'reading', 'Viskositas & dwell time relationship',
   '{"slides":[{"heading":"Viskositas","body":"Resistance cairan terhadap aliran. Viskositas tinggi → lambat masuk celah, tapi lebih lama bertahan setelah excess removal."},{"heading":"Trade-off","body":"Viskositas rendah masuk cepat tapi cepat habis. Viskositas tinggi butuh dwell lebih lama tapi indikasi lebih tahan."},{"heading":"Standar dwell","body":"5-10 menit untuk umum, sampai 30 menit untuk crack halus. Per ASME V atau procedure."}]}',
   400, NULL),
  (3, 'animated', 'Visualisasi penetrant masuk crack',
   '{"sceneCaption":"Lihat penetran low-viscosity dan good-wetting masuk ke celah crack halus melalui aksi kapiler. Setelah dwell, excess dihapus, dan developer menarik penetran keluar.","slides":[]}',
   480, 'pt-capillary-detail'),
  (4, 'reading', 'Effect of temperature',
   '{"slides":[{"heading":"Temperatur tinggi (>50°C)","body":"Viskositas turun drastis, penetran cepat menguap. Indikasi tidak terbentuk dengan baik. Per ASME V, max 52°C."},{"heading":"Temperatur rendah (<10°C)","body":"Viskositas naik, masuk celah lambat. Dwell harus diperpanjang. Min temperature varies per material — typical 5-10°C."},{"heading":"Standar window","body":"ASME V Article 6: 10-52°C (50-125°F). Outside ini → procedure qualification needed."}]}',
   400, NULL),
  (5, 'quiz', 'Mini-quiz — Physics PT',
   '{"description":"6 soal tentang capillary action, viskositas, sudut kontak, dan efek temperatur.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 2
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 3 — Penetrant Types
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Type I (Fluorescent) vs Type II (Visible)',
   '{"slides":[{"heading":"Type I — Fluorescent","body":"Penetran berfluoresensi di bawah UV-A. Sensitivitas tertinggi. Butuh booth gelap dan UV light. Dipakai untuk komponen kritis (aerospace, nuclear)."},{"heading":"Type II — Visible","body":"Penetran berwarna kontras (umumnya merah). Inspeksi di cahaya putih biasa. Lebih praktis lapangan, sensitivitas lebih rendah."},{"heading":"Pemilihan","body":"Type I untuk crack halus dan komponen kritis. Type II untuk inspeksi cepat lapangan dan komponen umum."}]}',
   420, NULL),
  (2, 'reading', 'Method A/B/C/D — penetrant removal',
   '{"slides":[{"heading":"Method A — Water washable","body":"Penetran sudah mengandung emulsifier. Excess dihapus dengan air. Cepat tapi sensitivitas lebih rendah."},{"heading":"Method B — Post-emulsifiable lipophilic","body":"Apply emulsifier setelah dwell. Sensitivitas lebih tinggi. Time-controlled — emulsifier tidak boleh masuk celah cacat."},{"heading":"Method C — Solvent removable","body":"Excess dihapus dengan solvent + lap. Sangat sensitif tapi paling lambat. Cocok inspeksi spot atau lapangan."},{"heading":"Method D — Post-emulsifiable hydrophilic","body":"Emulsifier diluted dengan air. Lebih kontrol dari Method B."}]}',
   500, NULL),
  (3, 'reading', 'Sensitivity levels (1-4)',
   '{"slides":[{"heading":"Level 1 — Ultra-low","body":"Untuk crack sangat halus. Aerospace turbine blade, weld root."},{"heading":"Level 2 — Medium","body":"Industri umum, weld inspection. Paling sering dipakai."},{"heading":"Level 3 — High","body":"Casting porosity, surface tight crack."},{"heading":"Level 4 — Ultra-high","body":"Critical aerospace, very tight crack detection. Mahal & butuh proses ketat."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — Penetrant types',
   '{"description":"6 soal tentang Type I/II, Method A/B/C/D, sensitivity levels.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 3
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 4 — Dwell time
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Penetrant dwell — minimum & maximum',
   '{"slides":[{"heading":"Standar minimum","body":"Per ASME V Article 6: 5 menit untuk crack normal. Per ASTM E165: 10 menit standar industri umum."},{"heading":"Crack tight (halus)","body":"Sampai 30 menit untuk masuk celah <1 µm. Per procedure spesifik atau code."},{"heading":"Maximum","body":"Penetran tidak boleh kering — kalau kering masuk celah jadi sulit dikeluarkan. Maks ~60 menit."}]}',
   360, NULL),
  (2, 'reading', 'Developer dwell',
   '{"slides":[{"heading":"Tujuan","body":"Developer narik penetran keluar dari celah. Butuh waktu untuk capillary reverse-action."},{"heading":"Standar","body":"Min 7 menit, max 30 menit untuk dry/wet developer. Final reading harus dilakukan sebelum penetran spread terlalu lebar."},{"heading":"Bleed-out time","body":"Crack besar terlihat dalam 2 menit. Crack halus mungkin baru muncul setelah 10-15 menit."}]}',
   360, NULL),
  (3, 'reading', 'Effect of contaminants on dwell',
   '{"slides":[{"heading":"Oil/grease residual","body":"Mencegah penetran masuk celah. Surface harus benar-benar bersih dan kering sebelum apply."},{"heading":"Water in crack","body":"Air harus dihilangkan sempurna sebelum apply penetran (low temperature drying). Air dalam crack memblok penetran."},{"heading":"Coating residue","body":"Dari paint stripper atau cleaner — bisa berinteraksi dengan penetran. Verify chemistry compatibility."}]}',
   320, NULL),
  (4, 'quiz', 'Mini-quiz — Dwell time',
   '{"description":"5 soal tentang penetrant/developer dwell, effect of contaminants.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 4
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 5 — Excess Removal
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'The most critical PT step',
   '{"slides":[{"heading":"Mengapa kritis","body":"Excess removal salah = false indications dimana-mana atau penetran terkeluarkan dari crack. Step paling sering bikin Level I trainee gagal."},{"heading":"Aturan dasar","body":"Hapus dari permukaan, BUKAN dari celah cacat. Wipe seminimal mungkin, jangan agresif."},{"heading":"Test for adequate removal","body":"Permukaan tampak bersih dari penetran berlebih. Untuk fluorescent: di-check dengan UV — tidak ada glow merata."}]}',
   400, NULL),
  (2, 'reading', 'Solvent wipe technique',
   '{"slides":[{"heading":"Step 1 — Dry wipe","body":"Lap kering hilangkan penetran berlebih. JANGAN basahi dulu — solvent akan dorong penetran masuk crack lalu keluar."},{"heading":"Step 2 — Solvent damp wipe","body":"Lap dibasahi solvent (sedikit), wipe permukaan lembut sampai bersih. JANGAN spray solvent langsung ke part."},{"heading":"Step 3 — Final dry","body":"Lap kering untuk angkat solvent residue. Permukaan harus dry sebelum apply developer."}]}',
   460, NULL),
  (3, 'reading', 'Water wash technique',
   '{"slides":[{"heading":"Pressure & temperature","body":"Air pressure max 40 psi (276 kPa). Temperature 10-38°C. Higher = wash out indikasi."},{"heading":"Spray angle","body":"45° dari permukaan. Jarak nozzle 30 cm minimum."},{"heading":"Time","body":"Minimum effective time, jangan over-wash. Periksa sambil wash."}]}',
   360, NULL),
  (4, 'animated', 'Wipe technique — common mistakes',
   '{"sceneCaption":"Demo wipe yang BENAR (gentle, dry first) vs SALAH (solvent langsung, agresif). Lihat dampak ke indikasi crack.","slides":[]}',
   480, 'pt-wipe-technique'),
  (5, 'quiz', 'Mini-quiz — Excess removal',
   '{"description":"6 soal tentang wipe technique, water wash, dan common mistakes.","questionCount":6,"passingScore":75}',
   600, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 5
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 6 — Developer
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Tipe developer',
   '{"slides":[{"heading":"Form a — Dry","body":"Powder kering. Cocok untuk fluorescent. Apply dengan brush atau dust booth."},{"heading":"Form b — Wet aqueous","body":"Powder disuspend di air. Apply dengan spray atau dip. Cocok produksi."},{"heading":"Form c — Wet non-aqueous","body":"Powder di solvent (alcohol/acetone). Spray application. Paling sensitif untuk visible PT."},{"heading":"Form d — Water-soluble","body":"Powder larut di air, dry membentuk thin coating. Kurang umum."},{"heading":"Form e — Water-suspendible","body":"Mirip form b tapi dengan particle berbeda."}]}',
   460, NULL),
  (2, 'reading', 'Application technique',
   '{"slides":[{"heading":"Aturan thin coating","body":"Developer harus thin & uniform. Tebal → menutupi indikasi halus. Tipis → tidak cukup absorbant."},{"heading":"Spray distance","body":"30-40 cm untuk wet non-aqueous. Spray motion pelan dan continuous. Jangan focus satu spot."},{"heading":"Verify","body":"Permukaan terlihat ''powdery white'' merata. Jika ada area shiny atau heavy buildup, re-apply."}]}',
   360, NULL),
  (3, 'reading', 'Developer dwell — bleed out',
   '{"slides":[{"heading":"Mekanisme","body":"Developer particles menarik penetran keluar dari celah via reverse capillary action. Indikasi gradually muncul sebagai bleed-out."},{"heading":"Time tracking","body":"Min 7 menit (per ASME V), max 30 menit. Reading dilakukan beberapa kali untuk catch perkembangan indikasi."},{"heading":"Crack besar vs halus","body":"Crack besar muncul cepat dan spread. Crack halus muncul lambat dan stay precise — harus diberi waktu cukup."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — Developer',
   '{"description":"5 soal tentang developer types, application, dan dwell.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 6
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 7 — Inspection & Light
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Lighting standards',
   '{"slides":[{"heading":"Visible PT","body":"Min 1000 lux pada permukaan. Verify dengan lux meter setiap awal shift."},{"heading":"Fluorescent PT","body":"UV-A 1000 µW/cm² minimum, ambient white light <20 lux. Booth gelap atau ruangan dengan blackout."},{"heading":"Eye adaptation","body":"1 menit dark adaptation untuk fluorescent. UV blocking glasses untuk safety."}]}',
   360, NULL),
  (2, 'reading', 'Inspection technique',
   '{"slides":[{"heading":"Viewing distance","body":"30-60 cm dari permukaan. Variasikan angle untuk catch indikasi yang reflective."},{"heading":"Magnification","body":"3-10× hand magnifier untuk crack halus. Document dengan photo."},{"heading":"Re-apply if needed","body":"Jika developer tidak rata atau penetran ter-wash, BUKAN re-spray developer. Harus full re-test dari awal."}]}',
   320, NULL),
  (3, 'quiz', 'Mini-quiz — Inspection & Light',
   '{"description":"4 soal tentang lighting requirements dan inspection technique.","questionCount":4,"passingScore":75}',
   400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 7
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 8 — Indication Interpretation
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Klasifikasi indikasi',
   '{"slides":[{"heading":"Linear","body":"Panjang ≥ 3× lebar. Crack, lack of fusion, lap. Paling kritis untuk weld."},{"heading":"Round","body":"Panjang < 3× lebar. Porosity, gas pocket, foreign material. Generally less severe."},{"heading":"Continuous vs intermittent","body":"Continuous linear: crack panjang tunggal. Intermittent: spot weld defect atau porosity chain."}]}',
   400, NULL),
  (2, 'reading', 'False indications',
   '{"slides":[{"heading":"Process indications","body":"Penetran terjebak di scratch, lap, atau ridge — bukan cacat asli. Re-clean dan re-test untuk konfirmasi."},{"heading":"Bleed-back","body":"Penetran masuk celah luar yang tidak tercleaning sempurna. Indikasi muncul di lokasi tidak sebenarnya."},{"heading":"Cleaning fluid traces","body":"Solvent atau cleaner residual berfluoresensi. Kontrol kebersihan area inspection."}]}',
   400, NULL),
  (3, 'animated', 'Indikasi interpretation training',
   '{"sceneCaption":"Walkthrough multiple indikasi: real crack, false from scratch, porosity chain, lack of fusion. Bagaimana classify dan ukur.","slides":[]}',
   600, 'pt-indication-interpretation'),
  (4, 'quiz', 'Mini-quiz — Interpretation',
   '{"description":"7 soal interpretasi indikasi.","questionCount":7,"passingScore":75}',
   720, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 8
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 9 — Procedures & Code
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Code utama untuk PT',
   '{"slides":[{"heading":"ASME V Article 6","body":"Code utama untuk pressure equipment. Mengatur material, technique, lighting, acceptance."},{"heading":"ASTM E165","body":"Standard practice umum industri. Lebih praktikal."},{"heading":"ISO 3452","body":"International standard."},{"heading":"AWS D1.1","body":"Welding code dengan acceptance untuk struktur baja."}]}',
   400, NULL),
  (2, 'reading', 'Compatibility — same family',
   '{"slides":[{"heading":"Aturan dasar","body":"Penetran, emulsifier, dan developer dari satu manufacturer dan satu family. Mixing brand bisa cancel sensitivity."},{"heading":"Family list","body":"Manufacturer biasanya publish ''compatible family'' — list product yang boleh dicampur."},{"heading":"Documentation","body":"Catat batch number setiap chemical di logbook setiap inspeksi."}]}',
   320, NULL),
  (3, 'quiz', 'Mini-quiz — Code & Compatibility',
   '{"description":"5 soal tentang ASME V, ASTM E165, dan compatibility rules.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 9
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 10 — Field Practice
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Standard sequence — solvent removable',
   '{"slides":[{"heading":"Step 1-2","body":"Pre-clean dengan solvent. Dry permukaan thoroughly."},{"heading":"Step 3","body":"Apply penetrant. Dwell 5-10 menit."},{"heading":"Step 4","body":"Excess removal — dry wipe → solvent wipe → dry wipe."},{"heading":"Step 5","body":"Apply developer thin & uniform."},{"heading":"Step 6","body":"Inspeksi setelah 7-30 menit dwell. Document indikasi."},{"heading":"Step 7","body":"Post-clean dengan solvent."}]}',
   480, NULL),
  (2, 'animated', 'Full PT sequence demo on weld',
   '{"sceneCaption":"Demo lengkap PT Method C pada weld carbon steel. Setiap step dengan timer.","slides":[]}',
   900, 'pt-full-sequence'),
  (3, 'reading', 'Field troubleshooting',
   '{"slides":[{"heading":"No indications muncul","body":"Cek: permukaan benar bersih? Dwell cukup? Excess tidak terlalu agresif? Developer cukup tipis?"},{"heading":"Background terlalu banyak","body":"Excess removal kurang. Re-clean dan re-do dengan wipe lebih banyak."},{"heading":"Indikasi spread cepat","body":"Crack besar ATAU temperature terlalu tinggi. Kalau temperatur, abort dan tunggu cool down."}]}',
   400, NULL),
  (4, 'quiz', 'Mini-quiz — Field practice',
   '{"description":"5 soal tentang sequence dan troubleshooting.","questionCount":5,"passingScore":75}',
   480, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 10
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 11 — Recap
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Comprehensive review',
   '{"slides":[{"heading":"Konsep kunci","body":"Capillary action, viskositas, dwell time, excess removal critical step."},{"heading":"Type & Method","body":"Type I/II, Method A/B/C/D."},{"heading":"Lighting","body":"1000 lux visible, 1000 µW/cm² UV-A fluorescent."},{"heading":"Code","body":"ASME V Article 6, ASTM E165."}]}',
   480, NULL),
  (2, 'quiz', 'Practice exam — 20 soal mixed',
   '{"description":"Latihan komprehensif PT-L1.","questionCount":20,"passingScore":75}',
   1800, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 11
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

-- MODULE 12 — Final
INSERT INTO "LessonSteps" ("ModuleId", "orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
SELECT m.id, s."orderIndex", s.kind::lesson_step_kind, s.title, s."contentJson"::jsonb, s."durationSeconds", s."simulationRef"
FROM "Modules" m JOIN "LearningPaths" lp ON m."LearningPathId" = lp.id
CROSS JOIN (VALUES
  (1, 'reading', 'Aturan main',
   '{"slides":[{"heading":"Format","body":"40 soal · 90 menit · ≥75% lulus."},{"heading":"Distribusi","body":"Physics 25%, equipment/method 30%, interpretation 25%, code/safety 20%."},{"heading":"Konsekuensi","body":"Lulus → sertifikat SNS-PT-L1 otomatis. Gagal → retake setelah 7 hari."}]}',
   300, NULL),
  (2, 'quiz', 'FINAL ASSESSMENT — PT Level I',
   '{"description":"Ujian sertifikasi PT Level I — 40 soal. Lulus: ≥75%.","questionCount":40,"passingScore":75,"isFinal":true}',
   5400, NULL)
) AS s("orderIndex", kind, title, "contentJson", "durationSeconds", "simulationRef")
WHERE lp.code = 'PT-L1' AND m."orderIndex" = 12
ON CONFLICT ("ModuleId", "orderIndex") DO NOTHING;

SELECT m."orderIndex", m.title, COUNT(ls.id) AS steps, SUM(ls."durationSeconds")/60 AS minutes
FROM "LearningPaths" lp JOIN "Modules" m ON m."LearningPathId" = lp.id
LEFT JOIN "LessonSteps" ls ON ls."ModuleId" = m.id
WHERE lp.code = 'PT-L1'
GROUP BY m."orderIndex", m.title ORDER BY m."orderIndex";
