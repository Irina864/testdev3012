import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ noimg, text, center, biggerText }) => {
  return (
    <>
      {text !== '' ? (
        <div
          className={`${styles.errorbox} ${styles.errorMessage} ${
            center && styles.center
          } ${biggerText && styles.biggerText}`}
        >
          {noimg ? null : (
            <img
              className={styles.errorimg}
              src="/images/form/state-error.svg"
              alt="error"
            />
          )}
          <div
            className={`${styles.errortext} ${center && styles.center} ${
              biggerText && styles.biggerText
            }`}
          >
            {text}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorMessage;
{
  /* <div className={`${styles.errorbox} ${styles.errorMessage}`}>
      {noimg ? null : (
        <img
          className={styles.errorimg}
          src="/images/form/state-error.svg"
          alt="error"
        />
      )}
      <div className={styles.errortext}>{text}</div>
    </div> */
}
