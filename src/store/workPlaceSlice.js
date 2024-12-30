import { createSlice } from '@reduxjs/toolkit';

export const workPlaceSlice = createSlice({
  name: 'workPlace',
  initialState: { workCounts: [1], multiply: false },
  reducers: {
    addWorkPlace: (state) => {
      state.workCounts.push(state.workCounts.length + 1);
      state.multiply = state.workCounts.length > 1;
    },
    deleteWorkPlace: (state, action) => {
      const idToDelete = action.payload;
      if (state.workCounts.length > 1) {
        state.workCounts = state.workCounts.filter(
          (workPlace) => workPlace !== idToDelete
        );
      }
      state.multiply = state.workCounts.length > 1;
    },
  },
});

export const { addWorkPlace, deleteWorkPlace } = workPlaceSlice.actions;

export default workPlaceSlice.reducer;
