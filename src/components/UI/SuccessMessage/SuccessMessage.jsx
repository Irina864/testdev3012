import styles from "./SuccessMessage.module.scss";

const SuccessMessage = ({ messages, center, biggerText }) => {
  return (
    <div
      className={`${styles.successbox} ${center && styles.center} ${
        biggerText && styles.biggerText
      }`}
    >
      {messages.map((message, index) => (
        <div key={index} className={styles.successtext}>
          <img
            className={styles.successimg}
            src="/images/modals/success.svg"
            alt="success"
          />
          {message}
        </div>
      ))}
    </div>
  );
};

export default SuccessMessage;
