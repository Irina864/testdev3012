"use client";

import styles from "./SearchAndMenu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setAllChats,
  setCurrentChat,
  setCurrentChatsList,
  setInputValue,
} from "@/store/chatsSlice";
import ChatSkeleton from "@/components/UI/ChatSkeleton/ChatSkeleton";
// import { getVacanciesList } from "@/store/API/vacanciesSlice";
import { useUserId } from "@/hooks/useUserId";
import { getApplicantData } from "@/store/API/accountUserSlice";
// import { getResumeList } from "@/store/API/resumeSlice";
import {
  deleteChatMessage,
  getAllMessagesFromChat,
  getChat,
  getChatMessages,
} from "@/store/API/chatsSlice";
import { getReactionById, getReactionList } from "@/store/API/reactionSlice";
import ChatCard from "@/components/UI/ChatCard/ChatCard";

const SearchAndMenu = () => {
  const dispatch = useDispatch();
  // usePreventScroll();
  // Создаём стэйт загрузки для отображения/скрытия скелетонов
  const [isLoad, setIsLoad] = useState(true);
  // const isLoading = useSelector((state) => state.chats.isLoading);
  const dataChatsFromBack = useSelector((state) => state.chats.chats);
  console.log(dataChatsFromBack);

  useEffect(() => {
    dispatch(getChat());
    dispatch(getReactionList());
    // dispatch(getChatMessages(16));
    // dispatch(deleteChatMessage(16, 24));
    // getAllMessagesFromChat(id);
  }, []);

  // назначаем нужное количество отображаемых скелетонов
  const n = 5;
  const chatsData = dataChatsFromBack.length > 0 ? dataChatsFromBack : [];

  // useEffect(() => {
  //   dispatch(setCurrentChatsList(chatsData));
  //   dispatch(setAllChats(chatsData));
  //   setIsLoad(false);
  // }, [chatsData]);

  useEffect(() => {
    dispatch(setCurrentChatsList(dataChatsFromBack));
    dispatch(setAllChats(dataChatsFromBack));
    setIsLoad(false);
  }, [dataChatsFromBack]);

  const currentChatsList = useSelector(
    (state) => state.userChats.currentChatsList
  );
  const currentChat = useSelector((state) => state.userChats.currentChat);
  const inputValue = useSelector((state) => state.userChats.inputValue);

  const hendleSearch = (inputValue) => {
    let newChatsList = chatsData.filter(
      (el) =>
        el.applicant?.toLowerCase().includes(inputValue.toLowerCase()) ||
        el.employer?.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(newChatsList);
    dispatch(setCurrentChatsList(newChatsList));
    // dispatch(setAllChats(newChatsList));
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__input}>
        {/* type="search" || type="text"*/}
        <input
          className={styles.input}
          placeholder="Поиск"
          onChange={(e) => dispatch(setInputValue(e.target.value))}
        />
        <p
          className={styles.btn}
          type="submit"
          onClick={() => hendleSearch(inputValue)}
        >
          search
        </p>
      </form>
      <div className={styles.container__chats}>
        {currentChatsList.length === 0 ? (
          isLoad ? (
            [...Array(n)].map((item, index) => <ChatSkeleton key={index} />)
          ) : (
            <p className={styles.container__chats__message}>
              У Вас нет начатых диалогов
            </p>
          )
        ) : (
          currentChatsList.map((chat) => {
            // const id = chat.id;
            // const firstMemberId = chat.members[0];
            // const secondMemberId = chat.members[1];
            // const reactionsFirstMember = dispatch(getReactionById(firstMemberId));
            // const reactionsSecondMember = getReactionById(secondMemberId);
            // console.log(reactionsFirstMember, reactionsSecondMember);
            // const chatMessages = getAllMessagesFromChat(id);
            // console.log(chatMessages);
            return <ChatCard chat={chat} key={chat.id} />
          })
        )}
      </div>
    </div>
  );
};

export default SearchAndMenu;
