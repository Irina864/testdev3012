import { useUserId } from '@/hooks/useUserId';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getApplicantData,
  getEmployerData,
} from '@/store/API/accountUserSlice';
import { switchToApplicant, switchToEmployer } from '@/store/modeSlice';
import { switchToAutorization } from '@/store/authorizationSlice';
import { addAddress } from '@/store/addressSlice';
import Cookies from 'js-cookie';
import { useCookie } from '@/hooks/useCookie';
import { getResumeList } from '@/store/API/resumeSlice';
import { switchToFalseKeys } from '@/store/API/autorizationAndRegistrationSlice';

const UserMode = () => {
  const router = useRouter();
  const userData = useSelector((state) => {
    return state.accountUser;
  });
  const keys = useSelector((state) => {
    return state.autorizationAndRegistration.keys;
  });
  const dispatch = useDispatch();

  const [user_id, setUserId] = useState(useUserId('access_token'));

  useEffect(() => {
    if (keys) {
      if (useCookie('access_token')) {
        setUserId(useUserId('access_token'));
        dispatch(switchToFalseKeys());
      }
    }
  }, [keys]);

  // useEffect(() => {
  //   if (useCookie('user_mode') === 'applicant') {
  //     router.push('/vacancies');
  //   } else {
  //     router.push('/resumes');
  //   }
  // }, [useCookie('user_mode')]);

  useEffect(() => {
    if (userData.applicant.user.email) {
      Cookies.set('user_mode', 'applicant', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      dispatch(switchToApplicant());
      dispatch(switchToAutorization());
    }
    if (userData.employer.user.email) {
      Cookies.set('user_mode', 'employer', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      dispatch(switchToEmployer());
      dispatch(switchToAutorization());
      dispatch(getResumeList());
    }
  }, [userData.applicant.user.email, userData.employer.user.email, user_id]);

  useEffect(() => {
    if (userData.employer.legal_address) {
      dispatch(addAddress(userData.employer.legal_address));
    }
  }, [userData.employer.legal_address]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user_id) {
      return;
    }
    dispatch(getApplicantData(user_id));
    dispatch(getEmployerData(user_id));
    if (userData.applicant.user.email) {
      Cookies.set('user_mode', 'applicant', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      dispatch(switchToApplicant());
      dispatch(switchToAutorization());
    }
    if (userData.employer.user.email) {
      Cookies.set('user_mode', 'employer', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      dispatch(switchToEmployer());
      dispatch(switchToAutorization());
    }
  }, [user_id]);

  return null;
};

export default UserMode;
// импортирован в провайдер redux
