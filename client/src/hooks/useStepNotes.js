import { useEffect, useRef, useState, useCallback } from 'react';
import {
  getNote,
  setNote as persistNote,
  isBookmarked,
  toggleBookmark as persistToggleBookmark,
} from '@/utils/elearningNotes';

const PERSIST_DEBOUNCE_MS = 400;

// Per-step notes & bookmark state, persisted to localStorage.
// - `note` updates immediately in React state; persistence is debounced (400ms)
//   so typing doesn't hammer localStorage.
// - `bookmarked` toggles synchronously (cheap) and persists right away.
// State is re-initialised whenever `stepId` changes.
export function useStepNotes(stepId) {
  const [note, setNoteState] = useState(() => getNote(stepId));
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(stepId));
  const debounceRef = useRef(null);

  // Re-initialise from storage when the active step changes. Also flush any
  // pending write for the previous step so nothing is lost on fast navigation.
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setNoteState(getNote(stepId));
    setBookmarked(isBookmarked(stepId));
  }, [stepId]);

  // Flush pending debounce on unmount.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const setNote = useCallback(
    (text) => {
      const value = typeof text === 'string' ? text : '';
      setNoteState(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // Capture stepId at call time so a late-firing timer writes to the right key.
      const targetId = stepId;
      debounceRef.current = setTimeout(() => {
        persistNote(targetId, value);
        debounceRef.current = null;
      }, PERSIST_DEBOUNCE_MS);
    },
    [stepId]
  );

  const toggleBookmark = useCallback(() => {
    const next = persistToggleBookmark(stepId);
    setBookmarked(next);
    return next;
  }, [stepId]);

  return { note, setNote, bookmarked, toggleBookmark };
}

export default useStepNotes;
