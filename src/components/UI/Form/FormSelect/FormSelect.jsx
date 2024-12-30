import { usePathname } from 'next/navigation';
import styles from './FormSelect.module.scss';
import { useState, useEffect, useRef } from 'react';

function FormSelect({
  id,
  label,
  array,
  valueName,
  disabled,
  disabledTime,
  onChange,
  className,
  bottom,
  value,
  isNumber,
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const selectWrapperRef = useRef(null);
  const [selectClass, setSelectClass] = useState(`${styles.select}`);

  useEffect(() => {
    const newSelectClass = pathname.includes('createVacancy')
      ? `${styles.select__wrapper_vacancy}`
      : `${styles.select__wrapper}`;

    setSelectClass(newSelectClass);
  }, [pathname]);

  const handleChange = (selectedItem, index) => {
    console.log(selectedItem);
    setIsOpen(false);
    if (isNumber) {
      onChange(index + 1);
    } else {
      onChange(selectedItem);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectWrapperRef.current &&
        !selectWrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectWrapperRef]);

  const handleSelectClick = () => {
    if (!disabled && !disabledTime) {
      setIsOpen(!isOpen);
    }
  };

  // Determine the displayed value
  const displayedValue = isNumber
    ? value > 0
      ? array[value - 1]
      : label
    : value || label;

  return (
    <div
      ref={selectWrapperRef}
      className={selectClass}
      onClick={handleSelectClick}
    >
      <div
        className={
          disabled
            ? `${styles.select} ${className} ${styles.disabled}`
            : isOpen
            ? `${styles.select} ${className} ${styles.active}`
            : `${styles.select} ${className}`
        }
        disabled={disabled || disabledTime}
        id={id}
      >
        {displayedValue}
      </div>
      {isOpen ? (
        <div
          className={
            bottom
              ? `${styles.menu__wrap} ${styles.bottom}`
              : `${styles.menu__wrap}`
          }
        >
          <div className={styles.menu}>
            {array.map((item, index) => (
              <div
                key={index}
                id={index}
                className={styles.option}
                onClick={() => handleChange(item, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={
          isOpen
            ? `${styles.select__arrow} ${styles.open}`
            : `${styles.select__arrow}`
        }
      ></div>
    </div>
  );
}

export default FormSelect;
