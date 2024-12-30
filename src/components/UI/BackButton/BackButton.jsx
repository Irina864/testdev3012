import React from 'react';
import Link from 'next/link';
import styles from './BackButton.module.scss';

const BackButton = ({
  isMobile,
  onGoBack,
  currentSection,
  linkToBack,
  nameLink,
}) => {
  if (!isMobile) {
    return null;
  }
  return (
    <div className={styles.backButtonWrapper}>
      {linkToBack ? (
        <Link href={linkToBack} className={styles.link_linkToBack}>
          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 14L1.64142 7.64142C1.56332 7.56332 1.56332 7.43668 1.64142 7.35858L8 1"
              stroke="#404B5A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.span_linkToBack}>{nameLink}</span>
        </Link>
      ) : (
        <button
          type="button"
          className={styles.btn_goback}
          onClick={onGoBack}
          aria-label="Назад"
        >
          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 14L1.64142 7.64142C1.56332 7.56332 1.56332 7.43668 1.64142 7.35858L8 1"
              stroke="#404B5A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.span_currentSection}>{currentSection}</span>
        </button>
      )}
    </div>
  );
};

export default BackButton;
