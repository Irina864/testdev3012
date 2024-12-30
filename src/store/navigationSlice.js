import {
  linkHrefApplicantChat,
  linkHrefCreateVacancy,
  linkHrefVacanciesFilter,
} from '@/Links';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backPage: {
    link: '/',
    title: '',
    currentPageTitle: '',
  },
  backToChat: {
    link: linkHrefApplicantChat,
    title: 'Чат и отклики',
    currentPageTitle: 'О компании/Вакансии компании',
  },
  backToSearch: {
    link: linkHrefCreateVacancy,
    title: 'Поиск вакансий',
    currentPageTitle: 'О компании/Вакансии компании',
  },
  backToFiler: {
    link: linkHrefVacanciesFilter,
    title: 'Фильтр вакансий',
    currentPageTitle: 'О компании/Вакансии компании',
  },
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    updateNavToBackPage: (state, action) => {
      const { key, data } = action.payload;
      if (state[`${key}`] !== undefined) {
        state[`${key}`] = data;
      }
    },
  },
});

export const { updateNavToBackPage } = navigationSlice.actions;

export default navigationSlice.reducer;
