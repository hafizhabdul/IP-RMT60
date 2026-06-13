// E-Learning shared constants — single source of truth.
// Keep in sync with the server (Module.passingScore defaults to this value).

// Percentage required to pass any quiz or final assessment.
export const PASSING_SCORE = 75;

// Methods that currently ship a built, interactive simulation.
// Everything else should be presented honestly as "coming soon".
export const SIM_AVAILABLE_METHODS = ['UT', 'MT', 'PT', 'RT', 'ET', 'VT'];

// Axios request config flag: progress/grading calls set this so the global
// response interceptor stays silent (no error toast, no localStorage wipe,
// no auth redirect) and lets the caller handle anonymous/404/422 itself.
export const SILENT_REQUEST = { meta: { silent: true } };
