'use client';

import {
  linkHrefApplicantAccount,
  linkHrefCreateVacancy,
  linkHrefEmployerAccount,
} from '@/Links';
import { disableAutorization } from '@/store/authorizationSlice';
import { toggleIsBurgerMenuOpen } from '@/store/headerSlice';
import { setPage } from '@/store/pageSliceAccount';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import styles from './BurgerMenu.module.scss';
import { switchToFalseKeys } from '@/store/API/autorizationAndRegistrationSlice';

const BurgerMenu = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const isEmployerAuthorizate =
    pathname.includes('employer') || pathname.includes('resumes');
  const employerMenuItems = [
    'О компании',
    'Вакансии компании',
    // 'Уведомления',
    'Безопасность',
    'Поддержка',
    '',
    'Выйти',
  ];
  const applicantMenuItems = [
    'О себе',
    // 'Уведомления',
    'Безопасность',
    'Поддержка',
    '',
    'Выйти',
  ];

  let currentMenuItems = isEmployerAuthorizate
    ? employerMenuItems
    : applicantMenuItems;

  const hendleNavigate = (item) => {
    // Для перехода на нужную страницу назначаем шаг или отменяем авторизацию
    let step = 0;
    if (item === 'Выйти') {
      router.push('/vacancies');
      Cookies.remove('user_mode');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      dispatch(disableAutorization());
      dispatch(switchToFalseKeys());
    }
    if (isEmployerAuthorizate) {
      if (item === 'Вакансии компании') step = 1;
      // if (item === "Уведомления") step = 2;
      if (item === 'Безопасность') step = 3;
      if (item === 'Поддержка') step = 4;
    } else {
      if (item === 'О себе') step = 0;
      // if (item === "Уведомления") step = 1;
      if (item === 'Безопасность') step = 2;
      if (item === 'Поддержка') step = 3;
    }

    dispatch(setPage(step));
    dispatch(toggleIsBurgerMenuOpen(false));
  };

  return (
    <ul className={styles.container}>
      {currentMenuItems.map((item, index) => {
        // Находим индекс элемента массива без значения для отрисовки разделительной черты
        const intervalItem = currentMenuItems.length - 2;
        // По условию назначаем путь для ссылки (работодатель/соискатель)
        let createURL = (item) => {
          if (item === 'Выйти') return '/';
          if (item === 'Новая вакансия') return linkHrefCreateVacancy;
          else {
            if (isEmployerAuthorizate) return linkHrefEmployerAccount;
            else return linkHrefApplicantAccount;
          }
        };
        const linkPath = createURL(item);

        return (
          <Link
            key={index}
            href={linkPath}
            className={
              index === intervalItem
                ? `${styles.container__item} ${styles.container__item_hidden}`
                : `${styles.container__item}`
            }
            onClick={() => hendleNavigate(item)}
          >
            {item}
          </Link>
        );
      })}
    </ul>
  );
};

export default BurgerMenu;
