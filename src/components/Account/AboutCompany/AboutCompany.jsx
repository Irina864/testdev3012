'use client';
import styles from '@/components/Account/AboutCompany/AboutCompany.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import FormAddress from '@/components/UI/Form/FormAddress/FormAddress';
import FormAvatar from '@/components/UI/Form/FormAvatar/FormAvatar';
import FormInput from '@/components/UI/Form/FormInput/FormInput';
import Notification from '@/components/UI/Notification/Notification';
import {
  errorEmailFormat,
  errorEmpty,
  errorMaxSymbols,
  errorMinSymbols,
  errorPhoneFormat,
  errorSymbol,
  errorTaxNumberFormat,
  errorUrlFormat,
} from '@/error';
import { useUserId } from '@/hooks/useUserId';
import {
  regexEmail,
  regexPhone,
  regexProfessionEducationWork,
  regexTaxNum,
  regexUrl,
} from '@/regex';
import {
  getEmployerData,
  patchEmployerData,
  updateAccountUser,
} from '@/store/API/accountUserSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormText from '@/components/UI/Form/FormText/FormText';
import { linkHrefEmployerAccount } from '@/Links';
import { updateNavToBackPage } from '@/store/navigationSlice';
import {
  useDivideIntoInputText,
  useDivideIntoParagraphs,
} from '@/hooks/useDivideIntoParagraphs';

const AboutCompany = () => {
  const dispatch = useDispatch();
  const accountUserData = useSelector((state) => state.accountUser.employer);
  // useEffect(() => {
  //   dispatch(getEmployerData(useUserId('access_token')));
  // }, [dispatch]);
  const [showNotification, setShowNotification] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({
    tux_number: '',
    email: '',
    phone: '',
    company_name: '',
    legal_address: '',
    url: '',
    description: '',
  });
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    company_name: accountUserData.company_name || null,
    tux_number: accountUserData.tux_number || null,
    logo: accountUserData.logo || null,
    legal_address: accountUserData.legal_address || null,
    url: accountUserData.url || null,
    description: useDivideIntoInputText(accountUserData.description) || null,
    user: {
      email: accountUserData.user.email || null,
      phone: accountUserData.user.phone || null,
    },
  });

  useEffect(() => {
    if (accountUserData || formData.user.email === '') {
      setFormData({
        company_name: accountUserData.company_name,
        tux_number: accountUserData.tux_number,
        logo: accountUserData.logo,
        legal_address: accountUserData.legal_address,
        url: accountUserData.url,
        description: useDivideIntoInputText(accountUserData.description),
        user: {
          email: accountUserData.user.email,
          phone: accountUserData.user.phone,
        },
      });
    }
  }, [accountUserData, formData.user.email]);

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    if (name === 'email') {
      value = value.trim();
    }
    if (name === 'company_name') {
      let updatedValue = value
        .replace(/\s{2,}/g, '  ')
        .replace(/^\s+|\s+$/g, ' ');
      if (updatedValue.length > 0) {
        value = updatedValue[0].toUpperCase() + updatedValue.slice(1);
      }
    }
    if (name === 'description') {
      value = value.replace(/\s{2,}/g, ' ');
      if (value.startsWith(' ')) {
        value = value.slice(1);
      }
      if (value.length > 0) {
        value = value[0].toUpperCase() + value.slice(1);
      }
    }
    setFormData((prevData) => {
      if (name === 'email' || name === 'phone') {
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
        : formData.company_name.startsWith('-') ||
          formData.company_name.endsWith('-')
        ? errorSymbol + ': дефис в начале или конце'
        : formData.company_name.length > 100
        ? errorMaxSymbols(100)
        : '',
      tux_number: !formData.tux_number
        ? errorEmpty
        : !regexTaxNum.test(formData.tux_number)
        ? errorTaxNumberFormat
        : formData.tux_number.length < 12
        ? errorMinSymbols(10)
        : '',
      legal_address:
        !formData.legal_address || formData.legal_address === ''
          ? errorEmpty
          : '',
      url: !formData.url
        ? ''
        : !regexUrl.test(formData.url)
        ? errorUrlFormat
        : '',
      email: !formData.user.email
        ? errorEmpty
        : formData.user.email.includes('--')
        ? errorSymbol + ': подряд два дефиса'
        : formData.user.email.includes('——')
        ? errorSymbol + ': подряд два тире'
        : formData.user.email.includes('––')
        ? errorSymbol + ': подряд два тире'
        : formData.user.email.includes('__')
        ? errorSymbol + ': подряд два __'
        : formData.user.email.includes('..')
        ? errorSymbol + ': подряд две точки'
        : !regexEmail.test(formData.user.email)
        ? errorEmailFormat
        : formData.user.email.length < 6
        ? errorMinSymbols(6)
        : formData.user.email.length > 254
        ? errorMaxSymbols(254)
        : '',
      phone: !formData.user.phone
        ? errorEmpty
        : formData.user.phone.length < 18
        ? errorMinSymbols(11)
        : formData.user.phone.length > 18
        ? errorMaxSymbols(11)
        : !regexPhone.test(formData.user.phone)
        ? errorPhoneFormat
        : '',
      description: !formData.description
        ? errorEmpty
        : formData.description.length < 50
        ? errorMinSymbols(50)
        : formData.description.length > 1000
        ? errorMaxSymbols(1000)
        : '',
    };

    setErrors(newErrors);

    return Object.values(newErrors).some((error) => error !== '');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (!validateForm()) {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSaving(false);
      setShowNotification(true);
      dispatch(
        patchEmployerData({
          user_id: useUserId('access_token'),
          data: {
            company_name: formData.company_name,
            tux_number: formData.tux_number,
            logo: formData.logo,
            legal_address: formData.legal_address,
            url: formData.url,
            description: useDivideIntoParagraphs(formData.description.trim()),
            user: {
              email: formData.user.email,
              phone: formData.user.phone,
            },
          },
          logo: formData.logo,
        })
      );
      // if (typeof formData.logo === 'object' && formData.logo !== null) {
      //   dispatch(
      //     patchEmployerLogo({
      //       user_id: useUserId('access_token'),
      //       data: formData.logo,
      //     })
      //   );
      // }
      dispatch(
        updateAccountUser({
          user: 'employer',
          data: formData,
        })
      );
    }
  };

  useEffect(() => {
    console.log(formData, typeof formData.logo);
  }, [formData]);

  return (
    <div className={styles.modalContent}>
      {showNotification && (
        <div className={styles.notification}>
          <Notification
            text="Изменения сохранены"
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
      <div
        role="form"
        // onSubmit={handleFormSubmit}
        className={styles.formModal}
        noValidate
      >
        <div className={styles.formContainer}>
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <FormInput
                className={`${styles.formInput} ${
                  showErrors && errors.company_name ? styles.errorBorder : ''
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
                      ? ''
                      : errors.company_name
                  }
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <FormInput
                className={`${styles.formInput} ${
                  showErrors && errors.url ? styles.errorBorder : ''
                }`}
                id="tux_number"
                label="Налоговый номер компании"
                type="text"
                disabled={true}
                inputName="tux_number"
                value={formData.tux_number}
                onChange={handleChange}
              />

              {showErrors && errors.tux_number && (
                <ErrorMessage
                  text={
                    errors.tux_number === errorEmpty ? '' : errors.tux_number
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
                      legal_address: '',
                    }));
                  }}
                  selectedInfo={formData.legal_address}
                  className={
                    showErrors && errors.legal_address ? styles.errorBorder : ''
                  }
                />
              </div>
              {showErrors && errors.legal_address && (
                <ErrorMessage
                  text={
                    errors.legal_address === errorEmpty
                      ? ''
                      : errors.legal_address
                  }
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <FormInput
                className={`${styles.formInput} ${
                  showErrors && errors.url ? styles.errorBorder : ''
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
                  text={errors.url === errorEmpty ? '' : errors.url}
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <FormInput
                className={`${styles.formInput} ${
                  showErrors && errors.email ? styles.errorBorder : ''
                }`}
                type="email"
                value={formData.user.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                id="email"
                label="Email"
                disabled={true}
                inputName="email"
              />
              {showErrors && errors.email && (
                <ErrorMessage
                  text={errors.email === errorEmpty ? '' : errors.email}
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
                  errors.phone ? styles.errorBorder : ''
                }`}
              />
              {showErrors && errors.phone && (
                <ErrorMessage
                  text={errors.phone === errorEmpty ? '' : errors.phone}
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <FormText
                className={`${styles.formInputDescription}  ${
                  showErrors && errors.description ? styles.errorBorder : ''
                }`}
                onChange={handleChange}
                rows={7}
                name="description"
                value={useDivideIntoInputText(formData.description)}
                // value={formData.description}
                id="description"
                label="Описание компании"
                inputName="description"
              />
              {showErrors && errors.description && (
                <ErrorMessage
                  text={
                    errors.description === errorEmpty ? '' : errors.description
                  }
                  noimg={true}
                />
              )}
            </div>
          </div>
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
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.nextButton}
            onClick={handleFormSubmit}
            disabled={isSaving}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
