import { createSlice } from '@reduxjs/toolkit';

//! mode===true - applicant
//! mode===false - employer

export const modeSlice = createSlice({
  name: 'mode',
  initialState: true,
  reducers: {
    toggleMode: (state) => {
      return !state;
    },
    switchToApplicant: (state) => {
      if (state === false) {
        return true;
      }
      return state;
    },
    switchToEmployer: (state) => {
      if (state === true) {
        return false;
      }
      return state;
    },
  },
});

export const { toggleMode, switchToApplicant, switchToEmployer } =
  modeSlice.actions;

export default modeSlice.reducer;
