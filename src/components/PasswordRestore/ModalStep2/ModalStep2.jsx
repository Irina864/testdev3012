// // "use client";
// // import FormOtp from "@/components/UI/Form/FormOtp/FormOtp";
// // import { useEffect, useState } from "react";
// // import styles from "./ModalStep2.module.scss";

// // const ModalStep2 = ({ isOpen, onClose, onNext, onBack, email }) => {
// //   const [disabled, setDisabled] = useState(false);
// //   const [sendMoreTime, setSendMoreTime] = useState("Отправить снова");
// //   const [seconds, setSeconds] = useState(60);
// //   const [isActive, setIsActive] = useState(false);
// //   const [otp, setOtp] = useState("");
// //   const [errorOtp, setErrorOtp] = useState(false);

// //   useEffect(() => {
// //     if (isOpen) {
// //       setIsActive(true);
// //       setDisabled(true);
// //     }
// //   }, [isOpen]);

// //   useEffect(() => {
// //     let timer;
// //     if (isActive && seconds > 0) {
// //       timer = setInterval(() => {
// //         setSeconds((prevSeconds) => prevSeconds - 1);
// //       }, 1000);
// //     } else if (seconds === 0 && isActive) {
// //       setIsActive(false);
// //       setSendMoreTime("Отправить снова");
// //       setDisabled(false);
// //     }

// //     return () => clearInterval(timer);
// //   }, [isActive, seconds]);

// //   useEffect(() => {
// //     if (seconds > 0) {
// //       const minutes = Math.floor(seconds / 60);
// //       const remainingSeconds = seconds % 60;
// //       setSendMoreTime(
// //         `Отправить снова через ${minutes
// //           .toString()
// //           .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
// //       );
// //     }
// //   }, [seconds]);

// //   const startTimer = () => {
// //     setSeconds(60);
// //     setDisabled(true);
// //     setIsActive(true);
// //   };

// //   const handleResend = () => {
// //     if (!disabled) {
// //       startTimer();
// //       setErrorOtp(false);
// //     }
// //   };

// //   const handleOtpChange = (newOtp) => {
// //     setOtp(newOtp);
// //     setErrorOtp(false);
// //   };

// //   const handleNextStep = (e) => {
// //     e.preventDefault();
// //     if (otp === "правильный_код") {
// //       setErrorOtp(false);
// //       onNext();
// //     } else {
// //       setErrorOtp(true);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className={styles.modal_overlay}>
// //       <div className={styles.modal_info}>
// //         <div className={styles.modal_header}>
// //           <button
// //             className={styles.modal_backimgwrap}
// //             onClick={(e) => {
// //               e.preventDefault();
// //               onBack();
// //             }}
// //           >
// //             <img
// //               className={styles.modal_backimg}
// //               src="/images/modals/back.svg"
// //               alt="Back"
// //             />
// //           </button>
// //           <h2 className={styles.modal_title}>Восстановление пароля</h2>
// //         </div>
// //         <p className={styles.step_indicator}>Шаг 2 из 3</p>
// //         <form className={styles.modal_content} onSubmit={handleNextStep}>
// //           <h3 className={styles.otp_form_title}>Подтвердите Ваш Email</h3>
// //           <div className={styles.otp_form_text}>
// //             Введите код, отправленный на почту{" "}
// //             <div className={styles.otp_form_email}>{email}</div>
// //           </div>

// //           <div className={styles.code_input}>
// //             <FormOtp
// //               value={otp}
// //               onChange={handleOtpChange}
// //               inputName={"otp"}
// //               biggerErrorText={true}
// //             />
// //             {errorOtp && (
// //               <div className={styles.otp_error}>
// //                 Проверьте правильность ввода или отправьте новый код
// //               </div>
// //             )}
// //           </div>
// //           <div className={styles.btn_wrap_step_two}>
// //             <button
// //               className={`${styles.link} ${styles.underline}`}
// //               disabled={disabled}
// //               onClick={(e) => {
// //                 e.preventDefault();
// //                 handleResend();
// //               }}
// //             >
// //               {sendMoreTime}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ModalStep2;
// "use client";
// import FormOtp from "@/components/UI/Form/FormOtp/FormOtp";
// import { postRestorePasswordConfirm } from "@/store/API/restorePasswordSlice";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import classes from "../PasswordRecovery.module.scss";

// import styles from "./ModalStep2.module.scss";
// const ModalStep2 = ({
//   isOpen,
//   onClose,
//   onNext,
//   onBack,
//   email,
//   restorePasswordData,
// }) => {
//   console.log("Полученный email:", email);
//   const [disabled, setDisabled] = useState(false);
//   const [sendMoreTime, setSendMoreTime] = useState("Отправить снова");
//   const [seconds, setSeconds] = useState(60);
//   const [isActive, setIsActive] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [errorOtp, setErrorOtp] = useState(false);
//   const dispatch = useDispatch();

//   // Таймер для кнопки "Отправить снова"
//   useEffect(() => {
//     if (isOpen) {
//       setIsActive(true);
//       setDisabled(true);
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     let timer;
//     if (isActive && seconds > 0) {
//       timer = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds - 1);
//       }, 1000);
//     } else if (seconds === 0 && isActive) {
//       setIsActive(false);
//       setSendMoreTime("Отправить снова");
//       setDisabled(false);
//     }

//     return () => clearInterval(timer);
//   }, [isActive, seconds]);

//   useEffect(() => {
//     if (seconds > 0) {
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       setSendMoreTime(
//         `Отправить снова через ${minutes
//           .toString()
//           .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
//       );
//     }
//   }, [seconds]);

//   const startTimer = () => {
//     setSeconds(60);
//     setDisabled(true);
//     setIsActive(true);
//   };

//   const handleResend = () => {
//     if (!disabled) {
//       startTimer();
//       setErrorOtp(false);
//     }
//   };

//   // const handleOtpChange = (newOtp) => {
//   //   setOtp(newOtp);
//   //   setErrorOtp(false);

//   //   if (newOtp.length === 4) {
//   //     if (newOtp === "правильный_код") {
//   //       setErrorOtp(false);
//   //       onNext(); // Переход на следующий шаг
//   //     } else {
//   //       setErrorOtp(true);
//   //     }
//   //   }
//   // };
//   const handleOtpChange = (e) => {
//     const newOtp = e.target.value;
//     setOtp(newOtp);

//     if (newOtp.length === 4) {
//       dispatch(
//         postRestorePasswordConfirm({
//           email: restorePasswordData.email,
//           otp: newOtp,
//         })
//       ).then((response) => {
//         if (response.meta.requestStatus === "fulfilled") {
//           onNext();
//         } else {
//           setErrorOtp(true);
//         }
//       });
//     }
//   };
//   if (!isOpen) return null;

//   return (
//     <div className={classes.modal_overlay}>
//       <div className={classes.modal_info}>
//         <div className={classes.modal_header}>
//           <button
//             className={classes.modal_backimgwrap}
//             onClick={(e) => {
//               e.preventDefault();
//               onBack();
//             }}
//           >
//             <img
//               className={classes.modal_backimg}
//               src="/images/modals/back.svg"
//               alt="Back"
//             />
//           </button>
//           <h2 className={classes.modal_title}>Восстановление пароля</h2>
//         </div>
//         <p className={styles.step_indicator}>Шаг 2 из 3</p>
//         <form className={styles.modal_content}>
//           <h3 className={styles.otp_form_title}>Подтвердите Ваш Email</h3>
//           <div className={styles.otp_form_text}>
//             Введите код, отправленный на почту{" "}
//             <div className={styles.otp_form_email}>{email}</div>
//           </div>

//           <div className={styles.code_input}>
//             <FormOtp
//               value={otp}
//               onChange={handleOtpChange}
//               inputName={"otp"}
//               biggerErrorText={true}
//               maxLength={4}
//             />
//             {errorOtp && (
//               <div className={styles.otp_error}>
//                 Проверьте правильность ввода или отправьте новый код
//               </div>
//             )}
//           </div>
//           <div className={styles.btn_wrap_step_two}>
//             <button
//               className={`${styles.link} ${styles.underline}`}
//               disabled={disabled}
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleResend();
//               }}
//             >
//               {sendMoreTime}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalStep2;
'use client';
import FormOtp from '@/components/UI/Form/FormOtp/FormOtp';
import {
  postRestorePasswordConfirm,
  postRestorePasswordResendCode,
} from '@/store/API/restorePasswordSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../PasswordRecovery.module.scss';

import styles from './ModalStep2.module.scss';
const ModalStep2 = ({
  isOpen,
  onClose,
  onBack,
  onResend,
  email,
  isLoading,
  errors,
  restorePasswordData,
  onCodeChange,
}) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [sendMoreTime, setSendMoreTime] = useState('Отправить снова');
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [otp, setOtp] = useState('');
  const [errorOtp, setErrorOtp] = useState(false);
  const responseStatus = useSelector(
    ({ restorePassword }) => restorePassword.status
  );

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
      setDisabled(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      setSendMoreTime('Отправить снова');
      setDisabled(false);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds > 0) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      setSendMoreTime(
        `Отправить снова через ${minutes
          .toString()
          .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
      );
    }
  }, [seconds]);

  const startTimer = () => {
    setSeconds(60);
    setDisabled(true);
    setIsActive(true);
    onResend();
    // console.log(email);
    // dispatch(
    //   postRestorePasswordResendCode({
    //     email: email,
    //   })
    // );
  };

  const handleOtpChange = (e) => {
    const newOtp = e.target.value;
    setOtp(newOtp);
    console.log(newOtp);

    if (newOtp.length === 4) {
      console.log(newOtp, email);

      dispatch(
        postRestorePasswordConfirm({
          email: email,
          otp: Number(newOtp),
        })
      );
    }
  };

  useEffect(() => {
    console.log(responseStatus);
    if (!responseStatus === 'confirmed' && responseStatus === 'error') {
      setErrorOtp(true);
    }
  }, [responseStatus]);

  if (!isOpen) return null;

  return (
    <div className={classes.modal_overlay}>
      <div className={classes.modal_info}>
        <div className={classes.modal_header}>
          <button
            className={classes.modal_backimgwrap}
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            <img
              className={classes.modal_backimg}
              src="/images/modals/back.svg"
              alt="Back"
            />
          </button>
          <h2 className={classes.modal_title}>Восстановление пароля</h2>
        </div>
        <p className={styles.step_indicator}>Шаг 2 из 3</p>
        <form className={styles.modal_content}>
          <h3 className={styles.otp_form_title}>Подтвердите Ваш Email</h3>
          <div className={styles.otp_form_text}>
            Введите код, отправленный на почту{' '}
            <div className={styles.otp_form_email}>{email}</div>
          </div>

          <div className={styles.code_input}>
            <FormOtp
              value={otp}
              onChange={handleOtpChange}
              inputName={'otp'}
              biggerErrorText={true}
              maxLength={4}
            />
            {errorOtp && (
              <div className={styles.otp_error}>
                Проверьте правильность ввода или отправьте новый код
              </div>
            )}
            {/* {errors && errors.length > 0 && (
              <div className={styles.otp_error}>
                {errors.map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </div>
            )} */}
          </div>
          <div className={styles.btn_wrap_step_two}>
            <button
              className={`${styles.link} ${styles.underline}`}
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault();
                startTimer();
              }}
            >
              {sendMoreTime}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalStep2;
