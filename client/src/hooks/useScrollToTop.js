import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollUtils';

export function useScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    scrollToTop(true);
  }, [pathname, search]);
}