import { useState } from 'react';
import styles from './FormRadio.module.scss';

function FormRadio({
  label,
  nameRadio,
  value,
  idRadio,
  onChange,
  selectedValue,
  forModalSign,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.radio}>
        <input
          onChange={onChange}
          className={styles.input}
          name={nameRadio}
          type="radio"
          checked={String(selectedValue) === String(value)}
          value={value}
          id={idRadio}
        />
        <label
          className={`${styles.label} ${forModalSign && styles.modal}`}
          htmlFor={idRadio}
        ></label>
      </div>
      <label
        className={`${styles.label} ${forModalSign && styles.modal}`}
        htmlFor={idRadio}
      >
        {label}
      </label>
    </div>
  );
}

export default FormRadio;
