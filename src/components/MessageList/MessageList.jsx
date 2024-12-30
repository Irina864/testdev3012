import Message from "@/components/Message/Message";
import styles from "./MessageList.module.scss";

const MessageList = ({ messages }) => {
  return (
    <div className={styles.chatBody}>
      {messages.map((message, index) => (
        <div key={index}>
          {index === 0 || messages[index - 1].date !== message.date ? (
            <div className={styles.messageDate}>{message.date}</div>
          ) : null}
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default MessageList;
