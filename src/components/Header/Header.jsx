"use client";
import {
  linkHrefApplicantChat,
  linkHrefEmployerChat,
  linkHrefResumes,
  linkHrefVacancies,
} from "@/Links";
import HeaderSelectModeButton from "@/components/UI/HeaderSelectModeButton/HeaderSelectModeButton";
import { useCookie } from "@/hooks/useCookie";
import { disableAutorization } from "@/store/authorizationSlice";
import { showModalLog } from "@/store/modalSlice";
import { switchToApplicant, switchToEmployer } from "@/store/modeSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import Filter from "../UI/Filter/Filter";
import HeaderButton from "../UI/HeaderButton/HeaderButton";
import ModalLogIn from "../modals/ModalLogIn/ModalLogIn";
import ModalSignUp from "../modals/ModalSignUp/ModalSignUp";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector(({ mode }) => mode);
  const modal = useSelector(({ modal }) => modal);
  const authorization = useSelector(({ authorization }) => authorization);
  const ACCESS_TOKEN = useCookie("access_token");

  const [filter, setFilter] = useState(false);
  const [vacancy, setVacancy] = useState(false);
  const [resume, setResume] = useState(false);
  const [button, setButton] = useState(false);
  const [enterButton, setEnterButton] = useState(false);
  const [headerClass, setHeaderClass] = useState(`${styles.header}`);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const pathname = usePathname();

  const activeIcon = {
    chat: pathname.includes("chat"),
  };
  useEffect(() => {
    pathname.includes("resumes")
      ? dispatch(switchToEmployer())
      : pathname.includes("employer")
      ? dispatch(switchToEmployer())
      : dispatch(switchToApplicant());
    const newHeaderClass = pathname.includes("employer/chat")
      ? `${styles.header} ${styles.employerChat}`
      : pathname.includes("createVacancy")
      ? `${styles.header} ${styles.createVacancy}`
      : pathname.includes("chat")
      ? `${styles.header} ${styles.chat}`
      : pathname.includes("resumes/filter")
      ? `${styles.header} ${styles.filter}`
      : pathname.includes("vacancies/filter")
      ? `${styles.header} ${styles.filter}`
      : pathname.includes("resumes")
      ? `${styles.header} ${styles.resumes}`
      : pathname.includes("vacancies")
      ? `${styles.header} ${styles.vacancies}`
      : `${styles.header}`;

    setHeaderClass(newHeaderClass);

    pathname.includes("vacancies") ? setVacancy(true) : setVacancy(false);
    pathname.includes("resumes") ? setResume(true) : setResume(false);

    pathname.includes("createVacancy") ||
    pathname.includes("chat") ||
    pathname.includes("favorites") ||
    pathname.includes("filter")
      ? setFilter(true)
      : setFilter(false);
    pathname.includes("createVacancy") || pathname.includes("createResume")
      ? setButton(false)
      : setButton(true);
  }, [pathname]);

  useEffect(() => {
    ACCESS_TOKEN ? setEnterButton(true) : setEnterButton(false);
  }, [ACCESS_TOKEN]);

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 580);
    };

    // Первоначальная проверка
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  return (
    <header
      className={`${headerClass} ${isBurgerOpen ? styles.header_menuOpen : ""}`}
    >
      <div className={styles.header__box}>
        <Link href={mode ? linkHrefVacancies : linkHrefResumes}>
          <div
            className={`${styles.header__logowrap} ${
              isBurgerOpen ? styles.header__logowrap_hidden : ""
            }`}
          >
            <img
              className={styles.header__logo}
              src="/images/header/logo.svg"
              alt="Logo"
            />
          </div>
        </Link>
        {/* HeaderSelectModeButton перемещен в мобильное меню */}
        <div className={styles.desktop_mode_switcher}>
          <HeaderSelectModeButton />
        </div>
        {!isBurgerOpen && (
          <Link
            href={mode ? linkHrefApplicantChat : linkHrefEmployerChat}
            className={styles.mobile_chat_icon}
          >
            <button
              className={
                activeIcon.chat
                  ? `${styles.btniconChat} ${styles.active}`
                  : `${styles.btniconChat}`
              }
            >
              <img
                className={styles.btn__item}
                src={
                  activeIcon.chat
                    ? "/images/header/chat_active.svg"
                    : "/images/header/chat.svg"
                }
                alt="Chat"
              />
            </button>
          </Link>
        )}

        <div
          className={`${styles.burger} ${
            isBurgerOpen ? styles.burger_active : ""
          }`}
          onClick={handleBurgerClick}
        >
          <div className={styles.span}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {!isMobile && filter && (
        <Filter forVacancy={vacancy} forResume={resume} />
      )}

      <div
        className={`${styles.header__btns} ${
          isBurgerOpen ? styles.header__btns_active : ""
        }`}
      >
        <div className={styles.mobile_mode_switcher}>
          <HeaderSelectModeButton
            isMobile={isMobile}
            renderAsText={isBurgerOpen}
          />
        </div>
        {button && (
          <HeaderButton selectedMode={mode} authorized={authorization} />
        )}
        {enterButton ? (
          <Icons selectedMode={mode} isMobile={isMobile} />
        ) : (
          <button
            className={styles.header__authorized}
            onClick={() => dispatch(showModalLog())}
          >
            Войти
          </button>
        )}

        {authorization && (
          <button
            className={styles.header__logout}
            onClick={() => {
              Cookies.remove("access_token");
              Cookies.remove("refresh_token");
              Cookies.remove("user_mode");
              dispatch(disableAutorization());
            }}
          >
            Выйти
          </button>
        )}
      </div>

      <ModalLogIn open={modal.isLogModalOpen} />
      <ModalSignUp open={modal.isSignModalOpen} />
    </header>
  );
};

export default Header;
