import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние с данными для всех страниц
const initialState = {
  page0: {
    // name: '',
    // surname: '',
    // email: '',
    // phone: '',
    name: 'Анастасия',
    surname: 'Алексеева',
    email: 'example@gmail.com',
    phone: '+7 (777) 777 77 77',
  },
  page1: {
    notifications: false,
  },
  page2: {
    password: '',
  },
  page3: {
    message: '',
    file: {},
  },
};

const accountApplicantData = createSlice({
  name: 'accountApplicantData',
  initialState,
  reducers: {
    updatePageApplicant: (state, action) => {
      const { pageIndex, data } = action.payload;
      if (state[`page${pageIndex}`] !== undefined) {
        state[`page${pageIndex}`] = data;
      }
    },
  },
});

export const { updatePageApplicant } = accountApplicantData.actions;

export default accountApplicantData.reducer;
