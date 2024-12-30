"use client";
import MessageList from "@/components/MessageList/MessageList";
import MessageInput from "@/components/UI/MessageInput/MessageInput";
import UserStatus from "@/components/UserStatus/UserStatus";
import { useEffect, useState } from "react";
import styles from "./ChatWindow.module.scss";
import { useSelector } from "react-redux";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (formData) => {
    const message = formData.get("message");
    const files = formData.getAll("file");

    const userMessage = {
      text: message,
      time: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      sender: "me",
      date: new Date().toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      }),
      avatar: "/images/chats/user.svg",
      files,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botMessage = {
        text: "Это ответ от бота!",
        time: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        sender: "other",
        date: new Date().toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
        }),
        avatar: "/images/chats/company.svg",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <div className={styles.chatContainer}>
      <UserStatus />
      <hr />
      <MessageList messages={messages} />
      <hr />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
