// Optimized image configuration for better performance
export const OPTIMIZED_IMAGES = {
  // Base Unsplash URL parameters for optimization
  BASE_PARAMS: {
    auto: 'format,compress',
    q: 85, // Quality 85%
    fit: 'crop'
  },
  
  // Responsive image sizes
  SIZES: {
    thumbnail: { w: 300, h: 200 },
    card: { w: 400, h: 250 },
    hero: { w: 800, h: 450 },
    fullscreen: { w: 1200, h: 675 }
  },
  
  // Lazy loading placeholder (base64 1x1 transparent pixel)
  LAZY_PLACEHOLDER: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  
  // WebP fallback support
  WEBP_SUPPORT: typeof window !== 'undefined' && 
    (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    })()
};

// Function to build optimized image URL
export function buildOptimizedImageUrl(baseUrl, options = {}) {
  if (!baseUrl || !baseUrl.includes('unsplash.com')) {
    return baseUrl; // Return original if not Unsplash
  }
  
  const {
    width = 400,
    height = 250,
    quality = 85,
    format = 'auto'
  } = options;
  
  const params = new URLSearchParams({
    w: width,
    h: height,
    fit: 'crop',
    auto: format + ',compress',
    q: quality
  });
  
  // Remove existing parameters from URL
  const cleanUrl = baseUrl.split('?')[0];
  
  return `${cleanUrl}?${params.toString()}`;
}

// Responsive image component helper
export function getResponsiveImageSrcSet(baseUrl, sizes = ['300', '400', '800', '1200']) {
  if (!baseUrl || !baseUrl.includes('unsplash.com')) {
    return baseUrl;
  }
  
  return sizes.map(size => {
    const optimizedUrl = buildOptimizedImageUrl(baseUrl, { 
      width: parseInt(size), 
      height: Math.floor(parseInt(size) * 0.6) // 16:10 aspect ratio
    });
    return `${optimizedUrl} ${size}w`;
  }).join(', ');
}

// Preload critical images
export function preloadCriticalImages(imageUrls) {
  if (typeof window === 'undefined') return; // SSR check
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = buildOptimizedImageUrl(url, { width: 400, height: 250 });
    document.head.appendChild(link);
  });
}

// Intersection Observer for lazy loading
export function createLazyImageObserver(callback) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
}

export default OPTIMIZED_IMAGES;
