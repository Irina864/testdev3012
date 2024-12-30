"use client";
import ErrorMessage from "@/components/UI/ErrorMessage/ErrorMessage";
import SuccessMessage from "@/components/UI/SuccessMessage/SuccessMessage";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { useState } from "react";
import styles from "./FormPassword.module.scss";

function FormPassword({
  value,
  id,
  label,
  inputName,
  placeholder,
  onChange,
  onError,
  className,
  forModalSign,
  biggerErrorText,
  forEnter,
  disabled, // Новый пропс disabled
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [hiddenInput, setHiddenInput] = useState("");
  const [successMessages, setSuccessMessages] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleHiddenChange = (e) => {
    const value = e.target.value.trim();
    setHiddenInput("*".repeat(value.length));
  };

  const handleInputChange = (e) => {
    let newValue = e.target.value.trim();
    setHiddenInput(newValue);
    const trimmedValue = newValue.trim();
    if (trimmedValue === "") {
      newValue = newValue.trim();
    }

    setInputValue(newValue);
    validatePassword(newValue);

    if (typeof onChange === "function") {
      onChange({
        target: {
          name: inputName,
          value: newValue,
        },
      });
    }
  };

  const validatePassword = (password) => {
    const validationErrors = [];
    const success = [];
    if (password.length >= 8) {
      success.push("Минимум 8 символов");
    } else {
      validationErrors.push("Пароль должен содержать минимум 8 символов");
    }
    if (!/^[A-Za-z\d!@#$%^&*]+$/.test(password)) {
      validationErrors.push("Допустима только латиница");
    }
    if (/\s/.test(password)) {
      validationErrors.push("Пароль не может содержать пробелы");
    }
    if (/\d/.test(password) || /[!@#$%^&*]/.test(password)) {
      success.push("Содержит цифру или символ");
    } else {
      validationErrors.push(
        "Пароль должен содержать хотя бы одну цифру или специальный символ"
      );
    }

    setErrors(validationErrors);
    setSuccessMessages(success);
    onError(validationErrors);
    return validationErrors.length === 0;
  };

  return (
    <div className={styles.box}>
      <label
        htmlFor={id}
        className={`${styles.label} ${forModalSign && styles.labelModal}`}
      >
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <div className={styles.container}>
          <input
            id={id}
            minLength={8}
            maxLength={50}
            type={showPassword ? "text" : "password"}
            value={inputValue}
            onChange={(e) => {
              handleInputChange(e);
              handleHiddenChange(e);
            }}
            placeholder={placeholder}
            className={`${styles.input} ${
              errors.length > 0 ? styles.errorBorder : ""
            } ${className} ${forModalSign && styles.inputModal}`}
            disabled={disabled} // Передаем пропс disabled
          />

          {inputValue.length > 0 && (
            <div className={styles.icon_wrap}>
              <img
                src={
                  showPassword
                    ? "/images/form/visibility_on.svg"
                    : "/images/form/visibility_off.svg"
                }
                alt="toggle visibility"
                className={styles.icon}
                onClick={togglePasswordVisibility}
              />
              {!forEnter && (
                <Tooltip
                  text={
                    <ul>
                      <li>Минимум 8 символов</li>
                      <li>Содержит цифру или символ</li>
                    </ul>
                  }
                  size="large"
                  tooltipStyle={styles.customTooltip}
                  textStyle={styles.customTextTooltip}
                  imgStyle={styles.customImgTooltip}
                  forRightArrowTooltip={true}
                  biggerText={true}
                />
              )}
            </div>
          )}
        </div>
        {errors.length > 0 && inputValue.length > 0 && (
          <div className={styles.errors_wrap}>
            {errors.map((item, index) => (
              <ErrorMessage
                text={item}
                key={index}
                biggerText={biggerErrorText}
              />
            ))}
          </div>
        )}
        {!forEnter && successMessages.length > 0 && errors.length === 0 && (
          <div className={styles.success_wrap}>
            <SuccessMessage messages={successMessages} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormPassword;
