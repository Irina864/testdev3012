import styles from './FormCheckbox.module.scss';

function FormCheckbox({
  label,
  array,
  nameCheckbox,
  id,
  onChange,
  disabled,
  selectedValues,
}) {
  const isChecked = (item, index) => {
    const value = array.length > 1 ? (index + 1).toString() : item;
    return selectedValues && selectedValues.map(String).includes(value);
  };

  return (
    <div className={styles.box}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <div className={styles.container}>
        {array.map((item, index) => {
          const value = array.length > 1 ? index + 1 : item;
          return (
            <div key={`${id}-${index}`} className={styles.checkbox}>
              <div className={styles.customCheckbox}>
                <input
                  id={`${id}-${index}`}
                  className={styles.input_checkbox}
                  type="checkbox"
                  name={nameCheckbox}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  checked={isChecked(item, index)}
                />
                <label
                  htmlFor={`${id}-${index}`}
                  className={styles.customCheckboxLabel}
                ></label>
              </div>
              <label
                htmlFor={`${id}-${index}`}
                className={
                  disabled
                    ? `${styles.labelItem} ${styles.disabled}`
                    : styles.labelItem
                }
              >
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FormCheckbox;
