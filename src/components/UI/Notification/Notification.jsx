import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Notification.module.scss';

const Notification = ({ text, btnName, onClick, onClose }) => {
  const imgs = [
    '/images/notification-success/success-state-0.25.svg',
    '/images/notification-success/success-state-0.50.svg',
    '/images/notification-success/success-state-0.75.svg',
    '/images/notification-success/success-state-1.00.svg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId;
    const animateImage = (index) => {
      if (index < imgs.length) {
        timeoutId = setTimeout(
          () => {
            setCurrentImageIndex(index);
            animateImage(index + 1);
          },
          index === 0 ? 150 : 300
        );
      } else {
        // Animation completed
        setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 1000); // Wait 1 second before closing
      }
    };

    animateImage(0);

    return () => clearTimeout(timeoutId);
  }, [onClose]); // Depend only on onClose

  const handleClick = () => {
    setIsVisible(false);
    onClick();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.notification}>
      <div className={styles.animbox}>
        <div className={styles.animation}>
          <Image
            className={styles.img}
            src={imgs[currentImageIndex]}
            alt="progress circle"
            width={40}
            height={40}
          />
        </div>
        <div className={styles.text}>{text}</div>
      </div>
      {btnName && (
        <div className={styles.textBtn} onClick={handleClick}>
          {btnName}
        </div>
      )}
    </div>
  );
};

export default Notification;
