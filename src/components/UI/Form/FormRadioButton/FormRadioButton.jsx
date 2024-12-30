import styles from './FormRadioButton.module.scss';

function FormRadioButton({
  label,
  nameRadio,
  valueFirst,
  valueSecond,
  idFirst,
  idSecond,
  labelFirst,
  labelSecond,
  onChange,
  selectedValue,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      if (event.target.id === idFirst && !event.shiftKey) {
        document.getElementById(idSecond).focus();
        event.preventDefault();
      }
    }
  };

  return (
    <div className={styles.container}>
      {label && (
        <div className={styles.container__title} id={`${nameRadio}-group`}>
          {label}
        </div>
      )}
      <div
        className={styles.box}
        role="group"
        aria-labelledby={`${nameRadio}-group`}
      >
        <label className={styles.radioWrapper}>
          <input
            className={styles.input}
            name={nameRadio}
            type="radio"
            value={valueFirst}
            id={idFirst}
            checked={selectedValue === valueFirst}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
          <span className={styles.label}>{labelFirst}</span>
        </label>
        <label className={styles.radioWrapper}>
          <input
            className={styles.input}
            name={nameRadio}
            type="radio"
            value={valueSecond}
            id={idSecond}
            checked={selectedValue === valueSecond}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
          <span className={styles.label}>{labelSecond}</span>
        </label>
      </div>
    </div>
  );
}

export default FormRadioButton;
