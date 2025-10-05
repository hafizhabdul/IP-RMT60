# Image Optimization Guide

## 🖼️ Overview

Setelah mengupdate gambar dengan script, berikut adalah panduan untuk mengoptimalkan performa gambar di aplikasi Anda.

## 🚀 Fitur Optimasi yang Tersedia

### 1. Optimized Image Configuration
File: `client/src/config/optimized-images.js`

- **Auto Format**: Otomatis pilih format terbaik (WebP, JPEG, dll)
- **Compression**: Kompresi otomatis dengan kualitas 85%
- **Responsive Sizes**: Multiple ukuran untuk berbagai device
- **Lazy Loading**: Load gambar saat diperlukan saja

### 2. OptimizedImage Component
File: `client/src/components/OptimizedImage.jsx`

React component yang menggabungkan semua optimasi:

```jsx
import OptimizedImage from '@/components/OptimizedImage';

// Basic usage
<OptimizedImage 
  src={lecture.image}
  alt={lecture.title}
  width={400}
  height={250}
  className="rounded-lg"
/>

// Advanced usage
<OptimizedImage 
  src={lecture.image}
  alt={lecture.title}
  width={800}
  height={450}
  quality={90}
  lazy={true}
  responsive={true}
  className="w-full h-64 object-cover"
  onLoad={() => console.log('Image loaded')}
  fallback={<div>Image failed to load</div>}
/>
```

## 📱 Responsive Images

### Menggunakan Responsive Images

```jsx
import { getResponsiveImageSrcSet, buildOptimizedImageUrl } from '@/config/optimized-images';

// Manual srcSet
const srcSet = getResponsiveImageSrcSet(imageUrl);

// Atau gunakan OptimizedImage component (recommended)
<OptimizedImage 
  src={imageUrl}
  responsive={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Ukuran yang Tersedia

- **Thumbnail**: 300x200px - untuk card kecil
- **Card**: 400x250px - untuk card medium  
- **Hero**: 800x450px - untuk gambar besar
- **Fullscreen**: 1200x675px - untuk modal/lightbox

## ⚡ Lazy Loading

### Automatic Lazy Loading
OptimizedImage component sudah include lazy loading by default:

```jsx
// Lazy loading enabled (default)
<OptimizedImage src={image} lazy={true} />

// Disable untuk above-the-fold images
<OptimizedImage src={heroImage} lazy={false} />
```

### Manual Lazy Loading
```jsx
import { createLazyImageObserver } from '@/config/optimized-images';

const observer = createLazyImageObserver((img) => {
  img.src = img.dataset.src;
});

// Observe all lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
```

## 🎯 Performance Tips

### 1. Preload Critical Images
```jsx
import { preloadCriticalImages } from '@/config/optimized-images';

// Preload hero images
useEffect(() => {
  preloadCriticalImages([
    heroImage,
    logoImage,
    featuredCourseImage
  ]);
}, []);
```

### 2. Optimize untuk Different Views

```jsx
// List view - smaller images
<OptimizedImage 
  src={course.image}
  width={300}
  height={200}
  quality={80}
/>

// Detail view - larger images  
<OptimizedImage 
  src={course.image}
  width={800}
  height={450}
  quality={90}
/>
```

### 3. Background Images
```jsx
import { buildOptimizedImageUrl } from '@/config/optimized-images';

const bgUrl = buildOptimizedImageUrl(image, { width: 1200, height: 800 });

<div 
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${bgUrl})` }}
>
  {/* content */}
</div>
```

## 🔄 Migration dari Placeholder

### Before (dengan placeholder)
```jsx
<img 
  src={course.image || IMG_PLACEHOLDER_16x9}
  alt={course.title}
  className="w-full h-48 object-cover"
/>
```

### After (dengan optimasi)
```jsx
<OptimizedImage 
  src={course.image}
  alt={course.title}
  width={400}
  height={240}
  className="w-full h-48"
  fallback={
    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">NDT Course</span>
    </div>
  }
/>
```

## 📊 Monitoring Performance

### Web Vitals to Monitor

1. **LCP (Largest Contentful Paint)**
   - Target: < 2.5s
   - Optimasi: Preload hero images, optimize above-the-fold content

2. **CLS (Cumulative Layout Shift)**  
   - Target: < 0.1
   - Optimasi: Set explicit width/height, use aspect-ratio CSS

3. **FID (First Input Delay)**
   - Target: < 100ms
   - Optimasi: Lazy load non-critical images

### Chrome DevTools

1. Open DevTools → Network tab
2. Reload page dan check:
   - Image file sizes
   - Format yang dikirim (WebP vs JPEG)
   - Loading times

### Lighthouse Audit

Run Lighthouse untuk score performa:
```bash
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
```

## 🛠️ Troubleshooting

### Images Not Loading
1. Check console untuk network errors
2. Verify Unsplash URLs masih valid
3. Check CORS settings

### Slow Loading
1. Reduce image quality (70-85 recommended)
2. Use smaller sizes untuk thumbnails
3. Enable lazy loading

### Layout Shift
1. Always set width/height
2. Use aspect-ratio CSS property
3. Reserve space dengan placeholder

## 📈 Expected Performance Improvements

Setelah implementasi optimasi:

- **Load Time**: 40-60% faster
- **Bandwidth**: 30-50% reduction  
- **Core Web Vitals**: Significant improvement
- **User Experience**: Smoother scrolling, faster interaction

---

🚀 **Next Steps**: 
1. Implement OptimizedImage component
2. Replace existing `<img>` tags
3. Test dengan Lighthouse
4. Monitor real user metrics
