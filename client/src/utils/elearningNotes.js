// Per-step notes & bookmarks persistence layer (localStorage only — no backend).
// All access is wrapped in try/catch so private-mode / disabled-storage browsers
// degrade gracefully instead of throwing. stepId is always coerced to String so
// numeric and string ids map to the same stable key.

const NOTES_KEY = 'el-step-notes'; // JSON object map: { [stepId]: text }
const BOOKMARKS_KEY = 'el-step-bookmarks'; // JSON array: [stepId, ...]

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// ---- Notes -----------------------------------------------------------------

export function getAllNotes() {
  const notes = readJson(NOTES_KEY, {});
  return notes && typeof notes === 'object' ? notes : {};
}

export function getNote(stepId) {
  if (stepId == null) return '';
  const notes = getAllNotes();
  const value = notes[String(stepId)];
  return typeof value === 'string' ? value : '';
}

export function setNote(stepId, text) {
  if (stepId == null) return false;
  const notes = getAllNotes();
  const key = String(stepId);
  const value = typeof text === 'string' ? text : '';
  if (value.length === 0) {
    delete notes[key];
  } else {
    notes[key] = value;
  }
  return writeJson(NOTES_KEY, notes);
}

// ---- Bookmarks -------------------------------------------------------------

export function getBookmarks() {
  const list = readJson(BOOKMARKS_KEY, []);
  return Array.isArray(list) ? list.map(String) : [];
}

export function isBookmarked(stepId) {
  if (stepId == null) return false;
  return getBookmarks().includes(String(stepId));
}

export function toggleBookmark(stepId) {
  if (stepId == null) return false;
  const key = String(stepId);
  const list = getBookmarks();
  const idx = list.indexOf(key);
  let nextState;
  if (idx >= 0) {
    list.splice(idx, 1);
    nextState = false;
  } else {
    list.push(key);
    nextState = true;
  }
  writeJson(BOOKMARKS_KEY, list);
  // Return the new bookmarked state so callers can sync UI without re-reading.
  return nextState;
}
