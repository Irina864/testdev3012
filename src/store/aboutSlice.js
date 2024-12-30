import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  about: '',
};

const aboutSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAbout: (state, action) => {
      state.about = action.payload;
    },
  },
});

export const { updateAbout } = aboutSlice.actions;

export default aboutSlice.reducer;
