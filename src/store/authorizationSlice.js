import { createSlice } from '@reduxjs/toolkit';

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: false,
  reducers: {
    toggleAuthorization: (state) => {
      return !state;
    },
    switchToAutorization: (state) => {
      if (state === false) {
        return true;
      }
      return state;
    },
    disableAutorization: (state) => {
      if (state === true) {
        return false;
      }
      return state;
    },
  },
});

export const {
  toggleAuthorization,
  disableAutorization,
  switchToAutorization,
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
