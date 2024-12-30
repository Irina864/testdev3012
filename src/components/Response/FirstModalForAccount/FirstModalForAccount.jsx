import { useState } from "react";
import usePreventScroll from "../../../hooks/usePreventScroll";
import styles from "./FirstModalForAccount.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { postReaction } from "@/store/API/reactionSlice";
import { postChatMessage } from "@/store/API/chatsSlice";
import { useUserId } from "@/hooks/useUserId";
import { setIdForReaction } from "@/store/favPageSlice";

const FirstModalForAccount = ({ onSubmit, onClose }) => {
  const dispatch = useDispatch();
  usePreventScroll(true);
  const [coverLetter, setCoverLetter] = useState("");
  const vacansyId = useSelector(state => state.favPage.idForReaction);
  const reaction = useSelector(state => state.reaction.reaction);
  const employerId = useSelector((state) => state.vacancies.vacancy.employer.user);
  // console.log(employerId);
  // console.log(reaction);
  // console.log(vacansyId);
  const userData = useSelector((state) => {
    return state.accountUser.applicant;
  });
  console.log(userData.resume_ids[0]);
  const chat = useSelector(state => state.chats.chat);
  // console.log(chat);

  const handleCancel = (onClose) => {
    onClose;
    dispatch(setIdForReaction(null));
  }
  const handleSubmit = () => {
    // Комплектуем dataReaction для отправки реакции
    const dataReaction = {
    resume: userData.resume_ids[0],
    vacancy: vacansyId,
    letter:  coverLetter,
    reaction_to_resume: null,
    reaction_to_vacancy: 0,
    }
    dispatch(postReaction(dataReaction));
    // Комплектуем data для создания чата
    let dataChat ={
      // chat: id, // не обязательный параметр
      receiver: employerId,
      text: coverLetter,
    }
    dispatch(postChatMessage(dataChat));
    onSubmit(coverLetter);
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Сопроводительное письмо</h2>
        <p>
          Приложите сопроводительное письмо, чтобы сделать отклик более
          привлекательным
        </p>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder=""
        />
        <div className={styles.modal_buttons}>
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleSubmit}>Откликнуться</button>
        </div>
      </div>
    </div>
  );
};

export default FirstModalForAccount;