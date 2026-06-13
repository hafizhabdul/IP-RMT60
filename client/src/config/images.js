export const IMG_EVENT = '/technical-support.png';
export const IMG_PLACEHOLDER_16x9 = '/technical-support.png';
export const IMG_PLACEHOLDER_16x10 = '/technical-support.png';

// Video paths for local hosting
export const VIDEO_PATHS = {
  demo: '/videos/3987526-hd_1920_1080_25fps.mp4',
  // Add more video paths as needed
};

// Video optimization settings
export const VIDEO_SETTINGS = {
  formats: {
    webm: '/videos/3987526-hd_1920_1080_25fps.webm', // Add WebM format for better compression
    mp4: '/videos/3987526-hd_1920_1080_25fps.mp4'   // Fallback MP4
  },
  poster: null, // fall through to the inline branded posterAlt SVG below (avoids a 404 on a missing /video-poster.jpg)
  posterAlt: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f97316;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230f172a;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1920" height="1080" fill="url(%23grad)" /%3E%3Cg opacity="0.1"%3E%3Ccircle cx="960" cy="540" r="300" fill="none" stroke="white" stroke-width="2"/%3E%3Ccircle cx="960" cy="540" r="200" fill="none" stroke="white" stroke-width="2"/%3E%3Ccircle cx="960" cy="540" r="100" fill="none" stroke="white" stroke-width="2"/%3E%3C/g%3E%3Ctext x="960" y="480" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="white"%3EIndustrial NDT%3C/text%3E%3Ctext x="960" y="560" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white" opacity="0.9"%3ETraining %26 Certification%3C/text%3E%3Ctext x="960" y="620" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.7"%3ELoading...%3C/text%3E%3C/svg%3E',
  preload: 'metadata', // Better for performance than 'auto' or 'none'
  loading: 'lazy',
  playsInline: true,
  muted: true,
  autoPlay: true,
  loop: true
};

// Image credits - Local assets for production
export const IMAGE_CREDITS = {
  placeholder_16x9: 'Local technical support placeholder image',
  placeholder_16x10: 'Local technical support placeholder image',
  source: 'Local assets - IP-RMT60 Platform'
};
