'use client';

import React from 'react';
import styles from "./FormButtonSend.module.scss";

function FormButtonSend({value, handleClick}) {
   return <div className={styles.formBtn}>
      <button
      type="button"
      className={styles.btn}
      value={value}
      onClick={handleClick}
      >{value}</button>
   </div>
}

export default FormButtonSend;