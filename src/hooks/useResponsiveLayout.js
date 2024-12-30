import { useState, useEffect } from 'react';

const useResponsiveLayout = () => {
  const [isAsideVisible, setAsideVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 580) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setAsideVisible(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isAsideVisible, setAsideVisible, isMobile };
};

export default useResponsiveLayout;
