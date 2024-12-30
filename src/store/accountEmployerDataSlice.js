import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние с данными для всех страниц
const initialState = {
  page0: {
    // companyName: '',
    // taxNumber: '',
    // companyAddress: '',
    // website: '',
    // email: '',
    // phone: '',
    // description: '',
    companyName: 'Example company',
    taxNumber: '11 22 334455 (25)',
    companyAddress: 'Example 56-65',
    website: 'https://text.ru',
    email: 'mailcompany@gmail.com',
    phone: '+7 (789) 111 22 33',
    description:
      'Example company. Example company. Example company. Example company',
    companyLogo: null,
  },
  page1: {
    vacancies: [],
  },
  page2: {
    notifications: true,
  },
  page3: {
    password: '',
  },
  page4: {
    message: '',
    file: '',
  },
};

const accountEmployerData = createSlice({
  name: 'accountEmployerData',
  initialState,
  reducers: {
    updatePageEmployer: (state, action) => {
      const { pageIndex, data } = action.payload;
      if (state[`page${pageIndex}`] !== undefined) {
        state[`page${pageIndex}`] = data;
      }
    },
  },
});

export const { updatePageEmployer } = accountEmployerData.actions;

export default accountEmployerData.reducer;
