import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'addresses',
  initialState: { addresses: [], lastDeletedAddress: '' },
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    deleteAddress: (state, action) => {
      const { item, index } = action.payload;
      state.lastDeletedAddress = item;
      state.addresses.splice(index, 1);
    },
    deleteLastDeletedAddress: (state) => {
      state.lastDeletedAddress = '';
    },
  },
});

export const { addAddress, deleteAddress, deleteLastDeletedAddress } =
  addressSlice.actions;

export default addressSlice.reducer;

// const addressSlice = createSlice({
//   name: 'addresses',
//   initialState: [],
//   reducers: {
//     addAddress: (state, action) => {
//       state.push(action.payload);
//     },
//     deleteAddress: (state, action) => {
//       state.splice(action.payload, 1);
//     },
//   },
// });
