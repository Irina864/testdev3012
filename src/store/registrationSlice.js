import { createSlice } from '@reduxjs/toolkit';
// в бэкенгд файл пенесено
// Начальное состояние с данными для всех страниц
const initialState = {
  mode: {
    mode: null,
  },
  applicant: {
    email: null,
    first_name: null,
    last_name: null,
    password: null,
  },
  employer: {
    email: null,
    company_name: null,
    tux_number: null,
    password: null,
  },
  verify: {
    email: null,
    otp: null,
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateRegistration: (state, action) => {
      const { nameKey, data } = action.payload;
      if (state[`${nameKey}`] !== undefined) {
        state[`${nameKey}`] = data;
      }
    },
  },
});

export const { updateRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
