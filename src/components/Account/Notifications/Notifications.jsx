'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Notifications.module.scss';
import FormCheckbox from '@/components/UI/Form/FormCheckbox/FormCheckbox';
import { updatePageApplicant } from '@/store/accountApplicantDataSlice';
import { updatePageEmployer } from '@/store/accountEmployerDataSlice'

const Notifications = () => {
  const page = useSelector((state) => state.page);
  const mode = useSelector(({ mode }) => mode); 
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  
  const notifications = [
    "Приглашения на вакансию",
    "Новое сообщение в чате"
  ]
  const hendleChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    //добавляет сохранение данных в разные слайсы в зависимости от пользователя(employer/applicant)
    if(mode) dispatch(updatePageApplicant(1, isChecked)); 
    else dispatch(updatePageEmployer(2, isChecked)) 
    
  }

  return <div className={styles.container}>
    <label className={styles.container__lable}>Уведомления на Email</label>
    <FormCheckbox array={notifications} onChange={hendleChange}/>
  </div>;
};

export default Notifications;
