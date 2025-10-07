// Utility functions for scroll behavior

export function scrollToTop(smooth = true) {
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  } catch (error) {
    // Fallback for browsers that don't support smooth scrolling
    window.scrollTo(0, 0);
  }
}

export function scrollToElement(elementId, offset = 0) {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  } catch (error) {
    console.error('Error scrolling to element:', error);
  }
}

export function isExternalLink(url) {
  return url && (url.startsWith('http') || url.startsWith('//'));
}