import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allResumes: [],
  currentResume: {},
  isLoading: true,
  currentId: null,
  isRender: false,
  idVacancyForReaction: null,
  letter: '',
};

const applicantCardSlice = createSlice({
  name: 'resumeCard',
  initialState,
  reducers: {
    setAllResumes: (state, action) => {
      state.allResumes = action.payload;
    },
    setCurrentResume: (state, action) => {
      state.currentResume = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setIdVacancyForReaction: (state, action) => {
      state.idVacancyForReaction = action.payload;
    },
    setLetter: (state, action) => {
      state.letter = action.payload;
    },
    setIsRender: (state) => {
      state.isRender = !state.isRender;
    },
  },
});

export const { setAllResumes, setCurrentResume, setIsLoading, setCurrentId, setIsRender, setIdVacancyForReaction, setLetter } = applicantCardSlice.actions;

export default applicantCardSlice.reducer;
