import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isPublished: false,
  },
  reducers: {
    publishForm: (state) => {
      state.isPublished = true;
    },
  },
});

export const { publishForm } = formSlice.actions;
export default formSlice.reducer;