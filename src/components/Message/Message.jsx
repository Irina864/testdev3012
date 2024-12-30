import styles from "./Message.module.scss";

const Message = ({ message }) => {
  const isUserMessage = message.sender === "me";

  return (
    <div
      className={`${styles.message} ${
        isUserMessage ? styles.myMessage : styles.otherMessage
      }`}
    >
      <img src={message.avatar} alt="avatar" className={styles.avatar} />
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.files && message.files.length > 0 && (
          <div className={styles.attachedFiles}>
            <img
              src="/images/chats/attach.svg"
              alt="Attached_file"
              className={styles.icon}
            />
            {message.files.map((file, fileIndex) => (
              <p key={fileIndex} className={styles.fileName}>
                {file.name}
              </p>
            ))}
          </div>
        )}
        <div className={styles.timeContainer}>
          <span className={styles.messageTime}>{message.time}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
