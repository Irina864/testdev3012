import { createSlice } from '@reduxjs/toolkit';

export const educationPlaceSlice = createSlice({
  name: 'educationPlace',
  initialState: { institutes: [1], multiply: false },
  reducers: {
    addEducationPlace: (state) => {
      state.institutes.push(state.institutes.length + 1);
      state.multiply = state.institutes.length > 1;
    },
    deleteEducationPlace: (state, action) => {
      const idToDelete = action.payload;
      if (state.institutes.length > 1) {
        state.institutes = state.institutes.filter(
          (institute) => institute !== idToDelete
        );
      }
      if (state.institutes.length === 0) {
        state.institutes.push(1);
      }
      state.multiply = state.institutes.length > 1;
    },
  },
});

export const { addEducationPlace, deleteEducationPlace } =
  educationPlaceSlice.actions;

export default educationPlaceSlice.reducer;
