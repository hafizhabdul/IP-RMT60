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
  poster: '/video-poster.jpg', // Create a poster image for better loading
  preload: 'metadata', // Better for performance than 'auto' or 'none'
  loading: 'lazy'
};

// Image credits - Local assets for production
export const IMAGE_CREDITS = {
  placeholder_16x9: 'Local technical support placeholder image',
  placeholder_16x10: 'Local technical support placeholder image',
  source: 'Local assets - IP-RMT60 Platform'
};
