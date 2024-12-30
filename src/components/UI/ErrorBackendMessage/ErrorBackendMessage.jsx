'use client';
import styles from './ErrorBackendMessage.module.scss';

function ErrorBackendMessage({ text }) {
  return <div className={styles.box}>{text}</div>;
}

export default ErrorBackendMessage;
