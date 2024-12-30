'use client';
import styles from './FormText.module.scss';
import { useState } from 'react';

function FormText({
  id,
  label,
  inputName,
  rows,
  min,
  max,
  placeholder,
  disabled,
  onChange,
  className,
  onBlur,
  onFocus,
  value,
}) {
  const [inputValue, setInputValue] = useState(value || '');

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    const trimmedValue = newValue.trim();
    if (newValue.length > 0) {
      newValue = newValue.replace(/\s{2,}/g, ' ');
      newValue = newValue[0].toUpperCase() + newValue.slice(1);
    }
    setInputValue(newValue);
    setIsClean(trimmedValue !== '' && isCleanedInput);

    if (typeof onChange === 'function') {
      onChange({
        target: {
          name: inputName,
          value: newValue,
        },
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const newValue =
        value.slice(0, cursorPosition) + '\n' + value.slice(cursorPosition);

      if (typeof onChange === 'function') {
        onChange({
          target: {
            name: inputName,
            value: newValue,
          },
        });
      }
    }
  };

  return (
    <div className={styles.box}>
      {label ? (
        <label
          htmlFor={id}
          className={
            disabled ? `${styles.label} ${styles.disabled}` : styles.label
          }
        >
          {label}
        </label>
      ) : null}

      <textarea
        className={`${styles.input} ${className}`}
        id={id}
        name={inputName}
        maxLength={max}
        minLength={min}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default FormText;

// function FormText({
//   id,
//   label,
//   inputName,
//   rows,
//   min,
//   max,
//   placeholder,
//   disabled,
//   onChange,
//   className,
//   onBlur,
//   onFocus,
//   value,
// }) {
//   const [inputValue, setInputValue] = useState(value || '');

//   const handleInputChange = (e) => {
//     let newValue = e.target.value;
//     const trimmedValue = newValue.trim();
//     if (newValue.length > 0) {
//       newValue = newValue.replace(/\s{2,}/g, ' ');
//       newValue = newValue[0].toUpperCase() + newValue.slice(1);
//     }
//     setInputValue(newValue);
//     setIsClean(trimmedValue !== '' && isCleanedInput);

//     if (typeof onChange === 'function') {
//       onChange({
//         target: {
//           name: inputName,
//           value: newValue,
//         },
//       });
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       const cursorPosition = e.target.selectionStart;
//       const newValue =
//         inputValue.slice(0, cursorPosition) +
//         '\n' +
//         inputValue.slice(cursorPosition);

//       if (typeof onChange === 'function') {
//         onChange({
//           target: {
//             name: inputName,
//             value: newValue,
//           },
//         });
//       }
//     }
//   };

//   return (
//     <div className={styles.box}>
//       {label ? (
//         <label
//           htmlFor={id}
//           className={
//             disabled ? `${styles.label} ${styles.disabled}` : styles.label
//           }
//         >
//           {label}
//         </label>
//       ) : null}

//       <textarea
//         className={`${styles.input} ${className}`}
//         id={id}
//         name={inputName}
//         maxLength={max}
//         minLength={min}
//         rows={rows}
//         disabled={disabled}
//         placeholder={placeholder}
//         onChange={handleInputChange}
//         value={inputValue}
//         onBlur={onBlur}
//         onFocus={onFocus}
//         onKeyDown={handleKeyDown}
//       />
//     </div>
//   );
// }

// export default FormText;
