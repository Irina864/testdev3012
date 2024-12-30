"use client";
import ErrorMessage from "@/components/UI/ErrorMessage/ErrorMessage";
import {
  errorEmailFormat,
  errorEmpty,
  errorMaxSymbols,
  errorMinSymbols,
  errorPhoneFormat,
  errorSymbol,
  errorTaxNumberFormat,
  errorUrlFormat,
} from "@/error";
import { useUserId } from "@/hooks/useUserId";
import {
  regexEmail,
  regexPhone,
  regexProfessionEducationWork,
  regexTaxNum,
  regexUrl,
} from "@/regex";
import {
  getEmployerData,
  patchEmployerData,
  updateAccountUser,
} from "@/store/API/accountUserSlice";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePreventScroll from "../../hooks/usePreventScroll";
import FormAddress from "../UI/Form/FormAddress/FormAddress";
import FormAvatar from "../UI/Form/FormAvatar/FormAvatar";
import FormInput from "../UI/Form/FormInput/FormInput";
import FormText from "../UI/Form/FormText/FormText";
import styles from "./ModalFillCompanyInfo.module.scss";

const ModalFillCompanyInfo = ({ open, handleNext }) => {
  usePreventScroll(open);
  const dispatch = useDispatch();

  const accountUserData = useSelector((state) => state.accountUser.employer);
  useEffect(() => {
    dispatch(getEmployerData(useUserId("access_token")));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    company_name: accountUserData.company_name || null,
    tux_number: accountUserData.tux_number || null,
    logo: accountUserData.logo || null,
    legal_address: accountUserData.legal_address || null,
    url: accountUserData.url || null,
    description: accountUserData.description || null,
    user: {
      email: accountUserData.user.email || null,
      phone: accountUserData.user.phone || null,
    },
  });

  useEffect(() => {
    if (accountUserData || formData.user.email === "") {
      setFormData({
        company_name: accountUserData.company_name,
        tux_number: accountUserData.tux_number,
        logo: accountUserData.logo,
        legal_address: accountUserData.legal_address,
        url: accountUserData.url,
        description: accountUserData.description,
        user: {
          email: accountUserData.user.email,
          phone: accountUserData.user.phone,
        },
      });
    }
  }, [accountUserData, formData.user.email]);

  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({
    tux_number: "",
    email: "",
    phone: "",
    company_name: "",
    legal_address: "",
    url: "",
    description: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "companyName") {
      let updatedValue = value
        .replace(/\s{2,}/g, "  ")
        .replace(/^\s+|\s+$/g, " ");
      if (updatedValue.length > 0) {
        value = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    if (name === "email") {
      value = value.trim();
    }
    if (name === "description") {
      value = value.replace(/\s{2,}/g, " ");
      if (value.startsWith(" ")) {
        value = value.slice(1);
      }
      if (value.length > 0) {
        value = value[0].toUpperCase() + value.slice(1);
      }
    }

    setFormData((prevData) => {
      if (name === "email" || name === "phone") {
        return {
          ...prevData,
          user: {
            ...prevData.user,
            [name]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleLogoChange = (imageData) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        logo: imageData,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {
      company_name: !formData.company_name
        ? errorEmpty
        : !regexProfessionEducationWork.test(formData.company_name)
        ? errorSymbol
        : formData.company_name.startsWith("-") ||
          formData.company_name.endsWith("-")
        ? errorSymbol + ": дефис в начале или конце"
        : formData.company_name.length > 100
        ? errorMaxSymbols(100)
        : "",
      tux_number: !formData.tux_number
        ? errorEmpty
        : !regexTaxNum.test(formData.tux_number)
        ? errorTaxNumberFormat
        : formData.tux_number.length < 12
        ? errorMinSymbols(10)
        : "",
      legal_address:
        !formData.legal_address || formData.legal_address === ""
          ? errorEmpty
          : "",
      url: !formData.url
        ? ""
        : !regexUrl.test(formData.url)
        ? errorUrlFormat
        : "",
      email: !formData.user.email
        ? errorEmpty
        : formData.user.email.includes("--")
        ? errorSymbol + ": подряд два дефиса"
        : formData.user.email.includes("——")
        ? errorSymbol + ": подряд два тире"
        : formData.user.email.includes("––")
        ? errorSymbol + ": подряд два тире"
        : formData.user.email.includes("__")
        ? errorSymbol + ": подряд два __"
        : formData.user.email.includes("..")
        ? errorSymbol + ": подряд две точки"
        : !regexEmail.test(formData.user.email)
        ? errorEmailFormat
        : formData.user.email.length < 6
        ? errorMinSymbols(6)
        : formData.user.email.length > 254
        ? errorMaxSymbols(254)
        : "",
      phone: !formData.user.phone
        ? errorEmpty
        : formData.user.phone.length < 18
        ? errorMinSymbols(11)
        : formData.user.phone.length > 18
        ? errorMaxSymbols(11)
        : !regexPhone.test(formData.user.phone)
        ? errorPhoneFormat
        : "",
      description: !formData.description
        ? errorEmpty
        : formData.description.length < 50
        ? errorMinSymbols(50)
        : formData.description.length > 1000
        ? errorMaxSymbols(1000)
        : "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).some((error) => error !== "");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (validateForm()) {
      return;
    } else {
      dispatch(
        patchEmployerData({
          user_id: useUserId("access_token"),
          data: formData,
          logo: formData.logo,
        })
      );
      // if (typeof formData.logo === 'object') {
      //   dispatch(
      //     patchEmployerLogo({
      //       user_id: useUserId('access_token'),
      //       data: formData.logo,
      //     })
      //   );
      // }
      dispatch(
        updateAccountUser({
          user: "employer",
          data: formData,
        })
      );
    }

    handleNext();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form
          onSubmit={handleFormSubmit}
          className={styles.formModal}
          noValidate
        >
          <div className={styles.infoContainer}>
            <Link href="/" passHref>
              <img src="/images/chats/back.svg" alt="back" />
            </Link>
            <h1 className={styles.infoTitle}>Информация о компании</h1>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.logoContainer}>
              <FormAvatar
                id="applicantPhoto"
                nameFile="applicantPhoto"
                accept=".jpg, .jpeg, .png, .bmp"
                onImageChange={handleLogoChange}
                employerAvatar={true}
                storeImage={formData.logo}
              />
            </div>
            <div className={styles.formFields}>
              <div className={styles.formGroup}>
                <FormInput
                  className={`${styles.formInput} ${
                    showErrors && errors.company_name ? styles.errorBorder : ""
                  }`}
                  value={formData.company_name}
                  onChange={handleChange}
                  id="company_name"
                  label="Название компании"
                  type="text"
                  inputName="company_name"
                />
                {showErrors && errors.company_name && (
                  <ErrorMessage
                    text={
                      errors.company_name === errorEmpty
                        ? ""
                        : errors.company_name
                    }
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <FormInput
                  id="tux_number"
                  label="Налоговый номер компании"
                  inputName="tux_number"
                  value={formData.tux_number}
                  disabled={true}
                  onChange={handleChange}
                  className={`${styles.formInput} ${
                    showErrors && errors.tux_number ? styles.errorBorder : ""
                  }`}
                />
                {showErrors && errors.tux_number && (
                  <ErrorMessage
                    text={
                      errors.tux_number === errorEmpty ? "" : errors.tux_number
                    }
                  />
                )}
              </div>
              <div className={styles.addressForm}>
                <div className={styles.formGroup}>
                  <FormAddress
                    id="legal_address"
                    onChange={(value) => {
                      setFormData((prevData) => {
                        return {
                          ...prevData,
                          legal_address: value,
                        };
                      });
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        legal_address: "",
                      }));
                    }}
                    selectedInfo={formData.legal_address}
                    className={
                      showErrors && errors.legal_address
                        ? styles.errorBorder
                        : ""
                    }
                  />
                </div>

                {showErrors && errors.legal_address && (
                  <ErrorMessage
                    text={
                      errors.legal_address === errorEmpty
                        ? ""
                        : errors.legal_address
                    }
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <FormInput
                  className={`${styles.formInput} ${
                    showErrors && errors.url ? styles.errorBorder : ""
                  }`}
                  value={formData.url}
                  onChange={handleChange}
                  id="url"
                  label="Сайт компании"
                  type="url"
                  inputName="url"
                />
                {showErrors && errors.url && (
                  <ErrorMessage
                    text={errors.url === errorEmpty ? "" : errors.url}
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <FormInput
                  className={`${styles.formInput} ${
                    showErrors && errors.email ? styles.errorBorder : ""
                  }`}
                  type="email"
                  value={formData.user.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  id="email"
                  label="Email"
                  inputName="email"
                  disabled={true}
                />
                {showErrors && errors.email && (
                  <ErrorMessage
                    text={errors.email === errorEmpty ? "" : errors.email}
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <FormInput
                  id="phone"
                  label="Номер телефона"
                  type="tel"
                  inputName="phone"
                  placeholder="+7 (777) 777 77 77"
                  value={formData.user.phone}
                  onChange={handleChange}
                  className={`${styles.formInput} ${
                    errors.phone ? styles.errorBorder : ""
                  }`}
                />
                {showErrors && errors.phone && (
                  <ErrorMessage
                    text={errors.phone === errorEmpty ? "" : errors.phone}
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <FormText
                  className={`${styles.formInputDescription}  ${
                    showErrors && errors.description ? styles.errorBorder : ""
                  }`}
                  onChange={handleChange}
                  rows={7}
                  name="description"
                  value={formData.description}
                  id="description"
                  label="Описание компании"
                  inputName="description"
                />
                {showErrors && errors.description && (
                  <ErrorMessage
                    text={
                      errors.description === errorEmpty
                        ? ""
                        : errors.description
                    }
                    noimg={true}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/" passHref>
              <button type="button" className={styles.backButton}>
                Назад
              </button>
            </Link>
            <button type="submit" className={styles.nextButton}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFillCompanyInfo;
