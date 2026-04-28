# E-Learning Content Seeds — Run Order

## All seed files in correct order

Run di Supabase SQL Editor dalam urutan ini:

### Level I (foundation)
1. **`create_elearning_tables.sql`** — Schema (tables + UT-L1 modules + UT-L1 Module 3 steps + 18 paths metadata)
2. **`seed_elearning_module1_all_methods.sql`** — Modules untuk MT/PT/RT/VT/ET-L1 + Module 1 lesson steps untuk semua 6 method
3. **`seed_elearning_ut_l1_complete.sql`** — UT-L1 Module 2-12 lesson steps lengkap
4. **`seed_elearning_mt_l1_complete.sql`** — MT-L1 Module 2-12 lesson steps lengkap
5. **`seed_elearning_pt_l1_complete.sql`** — PT-L1 Module 2-12 lesson steps lengkap
6. **`seed_elearning_rt_l1_complete.sql`** — RT-L1 Module 2-14 lesson steps lengkap
7. **`seed_elearning_vt_l1_complete.sql`** — VT-L1 Module 2-6 lesson steps lengkap
8. **`seed_elearning_et_l1_complete.sql`** — ET-L1 Module 2-9 lesson steps lengkap

### Quiz questions (real questions per LessonStep)
9. **`seed_quiz_questions_comprehensive.sql`** — 80+ real quiz questions linked ke quiz lesson_steps di Level I

### Knowledge Base
10. **`seed_knowledge_base_articles.sql`** — 10 in-depth articles cross-method (3000+ words each)

### Level II (advanced — newly added)
11. **`seed_elearning_level2_all_methods.sql`** — Modules untuk semua 6 Level II paths + Module 1 intro (+ UT-L2 Module 3 PAUT detail)

Semua file idempotent (`ON CONFLICT DO NOTHING`) — aman re-run.

## Total content setelah semua seed jalan

### Level I (production-ready)
| Path | Modules | Total Steps | Est. Hours |
|------|---------|-------------|------------|
| UT-L1 | 12 | ~53 | ~10 |
| MT-L1 | 12 | ~50 | ~9 |
| PT-L1 | 12 | ~46 | ~8 |
| RT-L1 | 14 | ~58 | ~12 |
| VT-L1 | 6 | ~22 | ~5 |
| ET-L1 | 9 | ~38 | ~7 |
| **Total Level I** | **65** | **~267** | **~51 jam** |

### Level II (modules ready, content pilot)
| Path | Modules | Module 1 Steps | Special detail |
|------|---------|----------------|----------------|
| UT-L2 | 14 | 4 + Module 3 PAUT 6 steps | PAUT introduction lengkap |
| MT-L2 | 12 | 4 | |
| PT-L2 | 12 | 4 | |
| RT-L2 | 16 | 4 | |
| VT-L2 | 8 | 4 | CWI pathway focus |
| ET-L2 | 11 | 4 | Multi-frequency emphasis |
| **Total Level II** | **73** | **~32** | Skeleton ready for content authoring |

### Quiz questions
- 80+ real multiple-choice questions
- Linked ke quiz lesson_steps via `LessonStepId`
- Coverage semua 6 method Level I

### Knowledge Base
- 10 articles in-depth (3000+ words each)
- Cross-method coverage: MT (2), PT (1), RT (2), VT (1), ET (1), UT (1), General (1), Calibration (1)
- Mix of theory, technique, safety, dan strategy

## References

Content disusun mengikuti:
- ASNT Standard Topical Outlines (ANSI/ASNT CP-105)
- ASNT Recommended Practice SNT-TC-1A 2020
- ISO 9712:2021 — NDT Personnel Qualification
- Code spesifik per method:
  - **UT**: ASME V Article 4, AWS D1.1, ISO 17640
  - **MT**: ASME V Article 7, ASTM E709, ISO 9934
  - **PT**: ASME V Article 6, ASTM E165, ISO 3452
  - **RT**: ASME V Article 2, ISO 17636-1, AWS D1.1, API 1104
  - **VT**: ASME V Article 9, AWS D1.1, ISO 17637
  - **ET**: ASME V Article 8, ASTM E309/E243, ISO 15549

## Disclaimer

Konten edukasi yang dihasilkan secara struktural sesuai topical outline ASNT,
tetapi sebelum dipakai sebagai materi sertifikasi resmi disarankan direview
oleh Level III instructor sebagai subject matter expert (SME) untuk verifikasi
akurasi technical detail dan sesuai praktik industri Indonesia.

## Future content roadmap

Saat ini hanya Level I yang punya content. Untuk scaling:
- **Level II** untuk semua 6 method — schema sudah ready, modul + step belum di-seed
- **Level III** untuk method utama (UT, RT) — strategic untuk certifikasi senior
- **Specialty paths**: PAUT, TOFD, advanced UT, digital RT
- **Quiz banks**: tabel `QuizQuestions` masih perlu di-extend dengan `LessonStepId` linkage untuk soal yang attached ke specific step
