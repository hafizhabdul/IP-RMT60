import React, { useState, useRef, useEffect } from 'react';
import { buildOptimizedImageUrl, getResponsiveImageSrcSet, OPTIMIZED_IMAGES } from '@/config/optimized-images';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width = 400,
  height = 250,
  quality = 85,
  lazy = true,
  responsive = true,
  fallback = null,
  onLoad = () => {},
  onError = () => {},
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!lazy || typeof window === 'undefined') {
      setInView(true);
      return;
    }

    // Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: '50px 0px', threshold: 0.01 }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy]);

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad(e);
  };

  const handleError = (e) => {
    setError(true);
    onError(e);
  };

  const optimizedSrc = buildOptimizedImageUrl(src, { width, height, quality });
  const srcSet = responsive ? getResponsiveImageSrcSet(src) : undefined;

  // Show fallback or placeholder while not in view or loading
  if (!inView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
        {...props}
      >
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }

  if (error && fallback) {
    return (
      <div className={`bg-gray-100 ${className}`} style={{ width, height }}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Loading placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={responsive ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
