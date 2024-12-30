// "use client";
// import {
//   linkHrefApplicantChat,
//   linkHrefApplicantFav,
//   linkHrefEmployerChat,
// } from "@/Links";
// import { toggleIsBurgerMenuOpen } from "@/store/headerSlice";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import BurgerMenu from "../Header/BurgerMenu/BurgerMenu";
// import styles from "./Icons.module.scss";

// const Icons = ({ selectedMode, isMobile = false }) => {
//   const dispatch = useDispatch();
//   const isBurgerMenuOpen = useSelector(
//     (state) => state.header.isBurgerMenuOpen
//   );

//   const [activeIcon, setActiveIcon] = useState({
//     fav: false,
//     chat: false,
//     account: false,
//   });

//   const pathname = usePathname();
//   useEffect(() => {
//     setActiveIcon({
//       fav: pathname.includes("favorites"),
//       chat: pathname.includes("chat"),
//       account: pathname.includes("account"),
//     });
//   }, [pathname]);

//   const hendleToggleBurgerMenu = () => {
//     dispatch(toggleIsBurgerMenuOpen());
//   };

//   return (
//     <div className={styles.iconbox}>
//       {selectedMode ? (
//         <Link href={linkHrefApplicantFav} className={styles.link}>
//           <div className={styles.iconWithText}>
//             <button
//               className={
//                 activeIcon.fav
//                   ? `${styles.btnicon} ${styles.fav} ${styles.active}`
//                   : `${styles.btnicon} ${styles.fav}`
//               }
//             >
//               <img
//                 className={styles.btn__item}
//                 src={
//                   activeIcon.fav
//                     ? "/images/header/fav_active.svg"
//                     : "/images/header/fav.svg"
//                 }
//                 alt="Favorites"
//               />
//             </button>
//             {isMobile && <span className={styles.text}>Избранное</span>}
//           </div>
//         </Link>
//       ) : null}
//       <Link
//         href={
//           selectedMode ? ` ${linkHrefApplicantChat}` : `${linkHrefEmployerChat}`
//         }
//         className={styles.link}
//       >
//         <div className={styles.iconWithText}>
//           <button
//             className={
//               activeIcon.chat
//                 ? `${styles.btnicon} ${styles.active}`
//                 : `${styles.btnicon}`
//             }
//           >
//             <img
//               className={styles.btn__item}
//               src={
//                 activeIcon.chat
//                   ? "/images/header/chat_active.svg"
//                   : "/images/header/chat.svg"
//               }
//               alt="Chat"
//             />
//           </button>
//           {isMobile && <span className={styles.text}>Чат</span>}
//         </div>
//       </Link>
//       {/* <Link href={selectedMode ? '/applicant/account' : '/employer/account'} className={styles.link}> */}

//       <div className={styles.iconWithText}>
//         <button
//           className={
//             activeIcon.account
//               ? `${styles.btnicon} ${styles.active}`
//               : `${styles.btnicon}`
//           }
//         >
//           <img
//             className={styles.btn__item}
//             src={
//               activeIcon.account
//                 ? "/images/header/account_active.svg"
//                 : "/images/header/account.svg"
//             }
//             alt="Account"
//             onClick={hendleToggleBurgerMenu}
//           />
//         </button>
//         {isMobile && <span className={styles.text}>Личный кабинет</span>}
//       </div>
//       {isBurgerMenuOpen ? <BurgerMenu /> : ""}
//     </div>
//     // </Link>
//   );
// };

// export default Icons;
"use client";

import {
  linkHrefApplicantAccount,
  linkHrefApplicantChat,
  linkHrefApplicantFav,
  linkHrefEmployerAccount,
  linkHrefEmployerChat,
} from "@/Links";
import { toggleIsBurgerMenuOpen } from "@/store/headerSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerMenu from "../Header/BurgerMenu/BurgerMenu";
import styles from "./Icons.module.scss";

const Icons = ({ selectedMode, isMobile = false }) => {
  const dispatch = useDispatch();
  const isBurgerMenuOpen = useSelector(
    (state) => state.header.isBurgerMenuOpen
  );

  const pathname = usePathname();

  const isEmployerPage = pathname.includes("employer");

  const [activeIcon, setActiveIcon] = useState({
    fav: false,
    chat: false,
    account: false,
  });

  useEffect(() => {
    setActiveIcon({
      fav: pathname.includes("favorites"),
      chat: pathname.includes("chat"),
      account: pathname.includes("account"),
    });
  }, [pathname]);

  const handleAccountClick = () => {
    if (isMobile) {
      const accountPath = isEmployerPage
        ? linkHrefEmployerAccount
        : linkHrefApplicantAccount;

      window.location.href = accountPath;
    } else {
      dispatch(toggleIsBurgerMenuOpen());
    }
  };

  return (
    <div className={styles.iconbox}>
      {selectedMode && (
        <Link href={linkHrefApplicantFav} className={styles.link}>
          <div className={styles.iconWithText}>
            <button
              className={
                activeIcon.fav
                  ? `${styles.btnicon} ${styles.fav} ${styles.active}`
                  : `${styles.btnicon} ${styles.fav}`
              }
            >
              <img
                className={styles.btn__item}
                src={
                  activeIcon.fav
                    ? "/images/header/fav_active.svg"
                    : "/images/header/fav.svg"
                }
                alt="Favorites"
              />
            </button>
            {isMobile && <span className={styles.text}>Избранное</span>}
          </div>
        </Link>
      )}
      <Link
        href={selectedMode ? linkHrefApplicantChat : linkHrefEmployerChat}
        className={styles.link}
      >
        <div className={styles.iconWithText}>
          <button
            className={
              activeIcon.chat
                ? `${styles.btnicon} ${styles.active}`
                : `${styles.btnicon}`
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
          {isMobile && <span className={styles.text}>Чат</span>}
        </div>
      </Link>
      <div className={styles.iconWithText}>
        <button
          className={
            activeIcon.account
              ? `${styles.btnicon} ${styles.active}`
              : `${styles.btnicon}`
          }
          onClick={handleAccountClick}
        >
          <img
            className={styles.btn__item}
            src={
              activeIcon.account
                ? "/images/header/account_active.svg"
                : "/images/header/account.svg"
            }
            alt="Account"
          />
        </button>
        {isMobile && <span className={styles.text}>Личный кабинет</span>}
      </div>
      {isBurgerMenuOpen && <BurgerMenu />}
    </div>
  );
};

export default Icons;
