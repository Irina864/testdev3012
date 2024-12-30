import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isSignModalOpen: false,
  isLogModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isOpen = true;
    },
    hideModal: (state) => {
      state.isOpen = false;
    },
    showModalLog: (state) => {
      state.isLogModalOpen = true;
    },
    hideModalLog: (state) => {
      state.isLogModalOpen = false;
    },
    showModalSign: (state) => {
      state.isSignModalOpen = true;
    },
    hideModalSign: (state) => {
      state.isSignModalOpen = false;
    },
  },
});

export const {
  showModal,
  hideModal,
  showModalLog,
  hideModalLog,
  showModalSign,
  hideModalSign,
} = modalSlice.actions;
export default modalSlice.reducer;
