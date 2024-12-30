'use client';

import { setIdVacancyForReaction, setLetter } from '@/store/applicantCardSlice';
import usePreventScroll from '../../../hooks/usePreventScroll';
import styles from './SecondEmployerModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { postReaction } from '@/store/API/reactionSlice';
import { useState } from 'react';
import { postChatMessage } from '@/store/API/chatsSlice';

const SecondEmployerModal = ({
  onClose,
  onPrev,
  onNext,
  message,
  setMessage,
}) => {
  const dispatch = useDispatch();
  usePreventScroll(true);
  const resumeId = useSelector((state) => state.resume.resume.id);
  // console.log(resumeId);
  const vacancyId = useSelector(
    (state) => state.resumeCard.idVacancyForReaction
  );
  // console.log(vacancyId);
  const [letter, setLetter] = useState('');
  const userData = useSelector((state) => {
    return state.accountUser.employer;
  });
  // console.log(userData);
  const hendlePrev = () => {
    setIdVacancyForReaction(null);
    onPrev();
  };

  const hendleMessage = (e) => {
    setMessage(e.target.value);
    setLetter(e.target.value);
  };
  const handleSubmit = () => {
    // Комплектуем dataReaction для отправки реакции
    const dataReaction = {
      resume: resumeId,
      vacancy: vacancyId,
      letter: letter,
      reaction_to_resume: 2,
      reaction_to_vacancy: null,
    };
    console.log(dataReaction);
    dispatch(postReaction(dataReaction));

    // Комплектуем dataChat для создания чата
    // let dataChat ={
    //   // chat: id, // не обязательный параметр
    //   receiver: applicantId,
    //   text: letter,
    // }
    // dispatch(postChatMessage(dataChat));
    onNext();
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Пригласить</h2>
        <p>
          Добавьте сообщение, чтобы сделать ваше приглашение более
          привлекательным
        </p>
        <textarea
          value={message}
          onChange={(e) => {
            hendleMessage(e);
          }}
          placeholder=""
        />
        <div className={styles.modal_buttons}>
          <button onClick={hendlePrev} className={styles.button}>
            Отмена
          </button>
          <button onClick={handleSubmit} className={styles.button}>
            Пригласить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondEmployerModal;
