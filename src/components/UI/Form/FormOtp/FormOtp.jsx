"use client";
import ErrorMessage from "@/components/UI/ErrorMessage/ErrorMessage";
import { regexSalary } from "@/regex";
import { useState } from "react";
import styles from "./FormOtp.module.scss";

function FormOtp({ value, inputName, onChange, className }) {
  const [inputValue, setInputValue] = useState(value || "");
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    let newValue = e.target.value.trim();
    const trimmedValue = newValue.trim();
    if (trimmedValue === "") {
      newValue = newValue.trim();
    }
    if (!regexSalary.test(newValue)) {
      newValue = "";
    }
    if (newValue.length > 4) {
      newValue = newValue.slice(0, 4);
    }

    setInputValue(newValue);

    if (typeof onChange === "function") {
      onChange({
        target: {
          name: inputName,
          value: newValue,
        },
      });
    }
  };

  return (
    <div className={styles.box}>
      <input
        type="number"
        //  type="text"
        className={`${styles.input} ${className} ${styles.number_input} ${
          errors && styles.error_border
        }`}
        name={inputName}
        value={inputValue}
        maxLength={4}
        max={9999}
        placeholder="----"
        onChange={handleInputChange}
      />
      {errors.length > 0 && (
        <div className={styles.errors_wrap}>
          {errors.map((item, index) => (
            <ErrorMessage noimg={true} text={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FormOtp;
