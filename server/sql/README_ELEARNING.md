# E-Learning Schema — Quick Setup

## Run order (Supabase SQL Editor)

1. **`create_elearning_tables.sql`** — Run once.
   - Creates 8 tables: LearningPaths, Modules, LessonSteps, UserEnrollments,
     UserStepProgress, UserModuleProgress, Certificates (+ extends QuizQuestions
     with `LessonStepId`).
   - Seeds 18 LearningPaths (UT/MT/PT/RT/VT/ET × L1/L2/L3).
   - Seeds 12 Modules for UT-L1 with Module 3 having 5 LessonSteps.
   - Idempotent (safe to re-run; uses `ON CONFLICT DO NOTHING`).

## Verify

After running, the final `SELECT` returns:
```
paths   | modules | steps
--------+---------+-------
   18   |   12    |   5
```

If you re-run, counts won't grow.

## Sequelize models

Already added in `server/models/`:
- `learningpath.js`
- `module.js`
- `lessonstep.js`
- `userenrollment.js`
- `userstepprogress.js`
- `usermoduleprogress.js`
- `certificate.js`

`models/index.js` auto-loads them. `models/quizquestion.js` extended with
`LessonStepId` association.

## API endpoints (Phase 2)

Anonymous + authenticated:
- `GET  /learning-paths` — list all paths
- `GET  /learning-paths/:code` — path detail with modules + steps
- `GET  /learning-paths/:code/modules/:number` — single module + steps

Authenticated:
- `POST /learning-paths/:code/enroll`
- `POST /progress/steps/:id/start`
- `POST /progress/steps/:id/complete` (body: `{ score?, timeSpentSeconds? }`)
- `GET  /progress/me`
- `GET  /certificates/me`

Public:
- `GET  /certificates/verify/:qrToken`

## Frontend routes

- `/e-learning` — Learning Hub (ELearningLayout with sidebar)
- `/e-learning/paths/:code` — Path detail
- `/e-learning/paths/:code/modules/:number/steps/:stepId` — Lesson Player (full screen)

Legacy preserved:
- `/e-learning/simulations`, `/e-learning/quizzes`, `/e-learning/content` —
  still in MinimalLayout for now.
