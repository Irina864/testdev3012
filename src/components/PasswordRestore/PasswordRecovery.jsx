// // import { useState } from "react";
// // import ModalStep1 from "./ModalStep1/ModalStep1";
// // import ModalStep2 from "./ModalStep2/ModalStep2";
// // import ModalStep3 from "./ModalStep3/ModalStep3";
// // import ModalStep4 from "./ModalStep4/ModalStep4";
// // const PasswordRecovery = ({ isOpen, onClose }) => {
// //   const [step, setStep] = useState(1);
// //   const [email, setEmail] = useState("");

// //   const handleEmailSubmit = (enteredEmail) => {
// //     setEmail(enteredEmail);
// //     setStep(2);
// //   };

// //   const handleCodeVerification = () => {
// //     setStep(3);
// //   };

// //   const handlePasswordSave = (newPassword) => {
// //     console.log("Новый пароль сохранен для email:", email);

// //     setStep(4);
// //   };

// //   const handleLogin = () => {
// //     console.log("Переход к входу");
// //     onClose();
// //   };

// //   const handleSkip = () => {
// //     onClose();
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <>
// //       {step === 1 && (
// //         <ModalStep1
// //           isOpen={true}
// //           onClose={onClose}
// //           onNext={handleEmailSubmit}
// //         />
// //       )}

// //       {step === 2 && (
// //         <ModalStep2
// //           isOpen={true}
// //           onClose={onClose}
// //           onNext={handleCodeVerification}
// //           onBack={() => setStep(1)}
// //           email={email}
// //         />
// //       )}

// //       {step === 3 && (
// //         <ModalStep3
// //           isOpen={true}
// //           onClose={onClose}
// //           onSave={handlePasswordSave}
// //           onBack={() => setStep(2)}
// //         />
// //       )}

// //       {step === 4 && (
// //         <ModalStep4 isOpen={true} onLogin={handleLogin} onSkip={handleSkip} />
// //       )}
// //     </>
// //   );
// // };

// // export default PasswordRecovery;
// import {
//   postRestorePasswordComplete,
//   postRestorePasswordConfirm,
//   postRestorePasswordInitiate,
//   postRestorePasswordResendCode,
//   resetRestorePasswordState,
//   updateRestorePasswordData,
// } from "@/store/API/restorePasswordSlice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import ModalStep1 from "./ModalStep1/ModalStep1";
// import ModalStep2 from "./ModalStep2/ModalStep2";
// import ModalStep3 from "./ModalStep3/ModalStep3";
// import ModalStep4 from "./ModalStep4/ModalStep4";

// const PasswordRecovery = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const { restorePasswordData, responseErrors, isLoading, status } =
//     useSelector((state) => state.restorePassword);

//   const [step, setStep] = useState(1);

//   const handleEmailSubmit = (enteredEmail) => {
//     dispatch(postRestorePasswordInitiate({ email: enteredEmail }));
//     dispatch(
//       updateRestorePasswordData({
//         nameKey: "email",
//         data: enteredEmail,
//       })
//     );
//   };

//   const handleCodeVerification = (otp) => {
//     if (restorePasswordData.user.email && otp) {
//       dispatch(
//         postRestorePasswordConfirm({
//           email: restorePasswordData.user.email,
//           otp,
//         })
//       );
//     }
//   };

//   const handlePasswordSave = (newPassword) => {
//     dispatch(
//       postRestorePasswordComplete({
//         email: restorePasswordData.user.email,
//         otp: restorePasswordData.otp,
//         new_password: newPassword,
//       })
//     );
//   };

//   const handleResendCode = () => {
//     dispatch(postRestorePasswordResendCode(restorePasswordData.user.email));
//   };
//   const handleCodeChange = (e) => {
//     const newOtp = e.target.value;
//     setOtp(newOtp);

//     if (newOtp.length === 4) {
//       dispatch(
//         postRestorePasswordConfirm({
//           email: restorePasswordData.user.email,
//           otp: newOtp,
//         })
//       );
//     }
//   };

//   useEffect(() => {
//     switch (status) {
//       case "initiated":
//         setStep(2);
//         break;
//       case "confirmed":
//         setStep(3);
//         break;
//       case "completed":
//         setStep(4);
//         break;
//       default:
//         setStep(1);
//     }
//   }, [status]);

//   const handleClose = () => {
//     dispatch(resetRestorePasswordState());
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {step === 1 && (
//         <ModalStep1
//           isOpen={true}
//           onClose={handleClose}
//           onNext={handleEmailSubmit}
//           isLoading={isLoading}
//           errors={responseErrors}
//         />
//       )}

//       {step === 2 && (
//         <ModalStep2
//           isOpen={true}
//           onClose={handleClose}
//           onNext={handleCodeVerification}
//           onBack={() => setStep(1)}
//           onCodeChange={handleCodeChange}
//           onResend={handleResendCode}
//           email={restorePasswordData.user.email}
//           isLoading={isLoading}
//           errors={responseErrors}
//           restorePasswordData={restorePasswordData}
//         />
//       )}

//       {step === 3 && (
//         <ModalStep3
//           isOpen={true}
//           onClose={handleClose}
//           onSave={handlePasswordSave}
//           onBack={() => setStep(2)}
//           isLoading={isLoading}
//           errors={responseErrors}
//         />
//       )}

//       {step === 4 && (
//         <ModalStep4 isOpen={true} onLogin={handleClose} onSkip={handleClose} />
//       )}
//     </>
//   );
// };

// export default PasswordRecovery;
import {
  postRestorePasswordComplete,
  postRestorePasswordConfirm,
  postRestorePasswordInitiate,
  postRestorePasswordResendCode,
  resetRestorePasswordState,
  updateRestorePasswordData,
} from '@/store/API/restorePasswordSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalStep1 from './ModalStep1/ModalStep1';
import ModalStep2 from './ModalStep2/ModalStep2';
import ModalStep3 from './ModalStep3/ModalStep3';
import ModalStep4 from './ModalStep4/ModalStep4';
import { showModalLog } from '@/store/modalSlice';

const PasswordRecovery = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { restorePasswordData, responseErrors, isLoading, status } =
    useSelector((state) => state.restorePassword);

  const [step, setStep] = useState(1);

  const handleEmailSubmit = (enteredEmail) => {
    dispatch(postRestorePasswordInitiate({ email: enteredEmail }));
    dispatch(
      updateRestorePasswordData({
        nameKey: 'email',
        data: enteredEmail,
      })
    );
  };

  const handlePasswordSave = (newPassword) => {
    console.log(newPassword, restorePasswordData.user.email);
    dispatch(
      postRestorePasswordComplete({
        email: restorePasswordData.user.email,
        new_password: newPassword,
      })
    );
  };

  const handleResendCode = () => {
    console.log(restorePasswordData.user.email);
    dispatch(postRestorePasswordResendCode(restorePasswordData.user.email));
  };

  // Убираем handleCodeVerification, так как она интегрирована в ModalStep2

  useEffect(() => {
    switch (status) {
      case 'initiated':
        setStep(2);
        break;
      case 'confirmed':
        setStep(3);
        break;
      case 'completed':
        setStep(4);
        break;
      default:
        if (step > 1) {
          setStep(step); // Сохраняем текущий шаг, если нет изменений в статусе
        }
    }
  }, [status]);

  const handleClose = () => {
    dispatch(resetRestorePasswordState());
    dispatch(showModalLog());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {step === 1 && (
        <ModalStep1
          isOpen={true}
          onClose={handleClose}
          onNext={handleEmailSubmit}
          isLoading={isLoading}
          errors={responseErrors}
        />
      )}

      {step === 2 && (
        <ModalStep2
          isOpen={true}
          onClose={handleClose}
          onBack={() => setStep(1)}
          onResend={handleResendCode}
          email={restorePasswordData.user.email}
          isLoading={isLoading}
          errors={responseErrors}
          restorePasswordData={restorePasswordData}
          onCodeChange={(otp) => {
            if (otp.length === 4) {
              dispatch(
                postRestorePasswordConfirm({
                  email: restorePasswordData.user.email,
                  otp,
                })
              ).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                  setStep(3); // Переход на следующий шаг при успешном подтверждении
                } else {
                  // Обработка ошибки в ModalStep2
                }
              });
            }
          }}
        />
      )}

      {step === 3 && (
        <ModalStep3
          isOpen={true}
          onClose={handleClose}
          onSave={handlePasswordSave}
          onBack={() => setStep(2)}
          isLoading={isLoading}
          errors={responseErrors}
        />
      )}

      {step === 4 && (
        <ModalStep4 isOpen={true} onLogin={handleClose} onSkip={handleClose} />
      )}
    </>
  );
};

export default PasswordRecovery;
