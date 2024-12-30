import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterParams: {
    // в параметры при поиске записать
    // - под position для вакансий
    // - под job_title для резюме
    profession: '',
    city: '',
    // в параметры при поиске записать
    // - под work_schedule для вакансий - если не работает, то schedule
    // - под schedule для резюме
    schedule: [],
    experience: {
      experience_from: '',
      experience_to: '',
      no_experience: false,
    },
    // в параметры при поиске записать
    // - под salary_from для вакансий
    // - под salary для резюме
    salary_from: '',
    work_format: [],
    education: '',
  },
  // searchPage: {
  //   position: '',
  //   job_title: '',
  //   city: '',
  //   work_schedule: [],
  //   experience: {
  //     experience_from: '',
  //     experience_to: '',
  //     no_experience: false,
  //   },
  // },
  // filterPage: {
  //   //для соискателя по мобилке
  //   salary_from: '', //отличается для работодателя, по сути также зп "от ...",  буду использовать  salary_from, но в параметрах для запроса по резюме нужно будет указать "salary"
  //   work_format: [],
  //   //для работодателя по мобилке
  //   education: '',
  //   // добавь, если параметров больше
  //   // для соискателя
  //   experience: {
  //     experience_from: '',
  //     experience_to: '',
  //     no_experience: false,
  //   },
  //   // для работодателя
  //   work_schedule: [],
  // },

  visibleMobileFilter: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilterState: (state, action) => {
      const { page, key, data } = action.payload;
      if (state[`${page}`][`${key}`] !== undefined) {
        state[`${page}`][`${key}`] = data;
      }
    },
    showMobileFilter: (state) => {
      state.visibleMobileFilter = true;
    },
    closeMobileFilter: (state) => {
      state.visibleMobileFilter = false;
    },
  },
});

export const { updateFilterState, showMobileFilter, closeMobileFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
