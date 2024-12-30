'use client'

import { useDispatch, useSelector } from 'react-redux';
import styles from './ChatSkeleton.module.scss';
import { useEffect } from 'react';

const ChatSkeleton = () => {
  const mode = useSelector(({ mode }) => mode); 
  const dispatch = useDispatch();

  return (
   <div className={styles.card}>
      <div className={styles.card__logo}></div>
      <div className={styles.card__data}>
         <div className={styles.card__data__title}>
            <div className={styles.card__data__title__left}></div>
            <div className={styles.card__data__title__right}></div>
         </div>
         <div className={styles.card__data__content}></div>
         <div className={styles.card__data__footer}></div>
      </div>
   </div>
  )
};

export default ChatSkeleton;