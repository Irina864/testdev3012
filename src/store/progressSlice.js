import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    currentStep: 0,
    totalSteps: 6
  },
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    }
  }
});

export const { nextStep, prevStep, setStep } = progressSlice.actions;
export default progressSlice.reducer;