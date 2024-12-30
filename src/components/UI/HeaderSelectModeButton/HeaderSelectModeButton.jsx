import { useCookie } from '@/hooks/useCookie';
import { switchToFalseKeys } from '@/store/API/autorizationAndRegistrationSlice';
import { disableAutorization } from '@/store/authorizationSlice';
import { switchToApplicant, switchToEmployer } from '@/store/modeSlice';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HeaderSelectModeButton.module.scss';
import { showModalLog } from '@/store/modalSlice';
import ErrorSupport from '../ErrorSupport/ErrorSupport';
import LoginNotification from '../LoginNotification/LoginNotification';

function HeaderSelectModeButton({
  className,
  isMobile = false,
  renderAsText = false,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const modal = useSelector(({ modal }) => modal);
  const [mode, setMode] = useState('Соискатель');
  const [isOpen, setIsOpen] = useState(false);
  const selectWrapperRef = useRef(null);
  const modeCurrent = useCookie('user_mode');
  const modes = [
    {
      value: 'applicant',
      label: 'Соискатель',
    },
    {
      value: 'employer',
      label: 'Работодатель',
    },
  ];
  useEffect(() => {
    const shouldSetModeToFirst =
      modeCurrent === modes[0].value ||
      pathname.includes('vacancies') ||
      pathname.includes('applicant');
    const shouldSetModeToSecond =
      modeCurrent === modes[1].value ||
      pathname.includes('resumes') ||
      pathname.includes('employer');

    if (shouldSetModeToFirst) {
      setMode(modes[0].label);
    } else if (shouldSetModeToSecond) {
      setMode(modes[1].label);
    }
  }, [modeCurrent, pathname]);

  const handleChange = (selectedItem, index) => {
    console.log(selectedItem);
    if (selectedItem === 'Работодатель') {
      dispatch(showModalLog());
    }
    setIsOpen(false);
    setMode(selectedItem);
    if (selectedItem === modes[0].label) {
      dispatch(disableAutorization);
      dispatch(switchToApplicant);
      router.push('/vacancies');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('user_mode');
      dispatch(switchToFalseKeys());
    }
    if (selectedItem === modes[1].label) {
      dispatch(disableAutorization);
      dispatch(switchToEmployer);
      router.push('/resumes');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('user_mode');
      dispatch(switchToFalseKeys());
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
  if (renderAsText && isMobile) {
    return (
      <div
        className={styles.mobile_mode_text}
        onClick={() => {
          // Переключение между режимами при клике
          const newMode =
            mode === modes[0].label ? modes[1].label : modes[0].label;
          handleChange(newMode);
        }}
      >
        {mode}
      </div>
    );
  }
  return (
    <>
      <div
        ref={selectWrapperRef}
        onClick={() => setIsOpen(!isOpen)}
        className={
          isOpen
            ? `${styles.select__wrapper} ${className} ${styles.active} ${
                isMobile ? styles.mobile : ''
              }`
            : `${styles.select__wrapper} ${className} ${
                isMobile ? styles.mobile : ''
              }`
        }
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.select} ${className}`}
        >
          {mode}
        </div>
        {isOpen ? (
          <div className={`${styles.menu__wrap}`}>
            <div className={styles.menu}>
              {modes.map((item, index) => (
                <div
                  key={index}
                  id={index}
                  className={`${styles.option}
               ${item.label === mode && styles.optionActive}
                `}
                  onClick={() => {
                    handleChange(item.label, index);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className={
            isOpen
              ? `${styles.select__arrow} ${styles.open}`
              : `${styles.select__arrow}`
          }
        ></div>
      </div>
      <div className={styles.notification}>
        <LoginNotification
          open={mode === 'Работодатель' && modal.isLogModalOpen}
          title="Для просмотра резюме работодателю необходимо авторизоваться "
        />
      </div>
    </>
  );
}

export default HeaderSelectModeButton;
