import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCards: [],
  currentId: null,
  currentIndex: 0,
  idForReaction: null,
  isRender: false,
};

const favPageSlice = createSlice({
  name: 'favPageSlice',
  initialState,
  reducers: {
   setAllCards: (state, action) => {
      state.allCards = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setIsRender: (state) => {
      state.isRender = !state.isRender;
    },
    setIdForReaction: (state, action) => {
      state.idForReaction = action.payload;
    },
  },
});

export const { setCurrentId, setAllCards, setCurrentIndex, setIsRender, setIdForReaction} = favPageSlice.actions;

export default favPageSlice.reducer;
