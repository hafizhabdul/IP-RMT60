import { useState, useEffect } from 'react';

export function useMobileDetection() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    screenWidth: 0,
    screenHeight: 0,
    orientation: 'portrait'
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Device detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) && width < 768;
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent) || (width >= 768 && width < 1024);
      const isDesktop = !isMobile && !isTablet;

      // OS detection
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);

      // Browser detection
      const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
      const isChrome = /Chrome/.test(userAgent);

      // Orientation
      const orientation = width > height ? 'landscape' : 'portrait';

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isIOS,
        isAndroid,
        isSafari,
        isChrome,
        screenWidth: width,
        screenHeight: height,
        orientation
      });
    };

    // Initial detection
    updateDeviceInfo();

    // Listen for resize and orientation change
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}

export function useDeviceType() {
  const { isMobile, isTablet, isDesktop } = useMobileDetection();

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    devicePixelRatio: window.devicePixelRatio || 1
  };
}