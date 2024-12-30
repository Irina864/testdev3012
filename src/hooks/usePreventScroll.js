import { useEffect } from 'react';

const usePreventScroll = (open) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    }

    return () => {
      document.body.style.overflow = originalStyle;

      if (document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [open]);
};

export default usePreventScroll;
