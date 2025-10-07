// Mobile performance optimizations utilities

export const optimizeImages = (src, options = {}) => {
  const { width, height, quality = 80, format = 'auto' } = options;

  // For local images, return as-is
  if (src.startsWith('/')) {
    return src;
  }

  // For external images, could add CDN optimization
  return src;
};

export const optimizeVideoForDevice = (deviceInfo) => {
  const { isMobile, isTablet, screenWidth } = deviceInfo;

  if (isMobile) {
    return {
      quality: 'low',
      resolution: '720p',
      preload: 'metadata',
      autoplay: false,
      controls: true,
      poster: '/video-poster-mobile.jpg'
    };
  } else if (isTablet) {
    return {
      quality: 'medium',
      resolution: '1080p',
      preload: 'metadata',
      autoplay: true,
      controls: false,
      poster: '/video-poster.jpg'
    };
  } else {
    return {
      quality: 'high',
      resolution: '1080p',
      preload: 'metadata',
      autoplay: true,
      controls: false,
      poster: '/video-poster.jpg'
    };
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const smoothScroll = (element, options = {}) => {
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  element.scrollIntoView({ ...defaultOptions, ...options });
};

export const preventZoomOnInputFocus = () => {
  // Prevent zoom on input focus for iOS
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      document.querySelector('meta[name="viewport"]').setAttribute('content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    });

    input.addEventListener('blur', () => {
      document.querySelector('meta[name="viewport"]').setAttribute('content',
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    });
  });
};

export const handleViewportHeight = () => {
  // Fix viewport height issues on mobile browsers
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);

  return () => {
    window.removeEventListener('resize', setVH);
    window.removeEventListener('orientationchange', setVH);
  };
};

export const optimizeAnimations = () => {
  // Disable animations for low-end devices
  const isLowEndDevice = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    return (
      (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) ||
      hardwareConcurrency <= 2
    );
  };

  if (isLowEndDevice()) {
    document.documentElement.setAttribute('data-reduced-motion', 'true');
  }

  // Respect user's motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.setAttribute('data-reduced-motion', 'true');
  }
};

export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

export const enablePullToRefresh = () => {
  let startY = 0;
  let isPulling = false;

  document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].pageY;
      isPulling = true;
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (!isPulling) return;

    const currentY = e.touches[0].pageY;
    const pullDistance = currentY - startY;

    if (pullDistance > 100 && window.scrollY === 0) {
      // Trigger refresh
      window.location.reload();
    }
  });

  document.addEventListener('touchend', () => {
    isPulling = false;
  });
};

export const fixScrollingIssues = () => {
  // Fix scrolling issues on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    document.body.style.webkitOverflowScrolling = 'touch';

    // Fix momentum scrolling
    const scrollableElements = document.querySelectorAll('.scroll-container');
    scrollableElements.forEach(element => {
      element.style.webkitOverflowScrolling = 'touch';
    });
  }
};

export const optimizeTouchTargets = () => {
  // Ensure touch targets are at least 44x44 pixels
  const touchTargets = document.querySelectorAll('button, a, input, .touch-target');

  touchTargets.forEach(target => {
    const computedStyle = window.getComputedStyle(target);
    const width = parseInt(computedStyle.width);
    const height = parseInt(computedStyle.height);

    if (width < 44) {
      target.style.minWidth = '44px';
    }

    if (height < 44) {
      target.style.minHeight = '44px';
    }
  });
};

// Initialize all mobile optimizations
export const initializeMobileOptimizations = () => {
  preventZoomOnInputFocus();
  handleViewportHeight();
  optimizeAnimations();
  lazyLoadImages();
  fixScrollingIssues();
  optimizeTouchTargets();

  // Enable pull-to-refresh only if needed
  if (window.matchMedia('(hover: none)').matches) {
    enablePullToRefresh();
  }
};