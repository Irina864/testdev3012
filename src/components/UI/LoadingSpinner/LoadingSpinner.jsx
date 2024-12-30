import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.box}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingSpinner;
