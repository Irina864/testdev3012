import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  languages: [{ language: '', language_level: '' }],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    addLanguage(state) {
      state.languages.push({ language: '', language_level: '' });
    },
    deleteLanguage(state, action) {
      state.languages.splice(action.payload, 1);
    },
    updateLanguage(state, action) {
      state.languages[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    setLanguage(state, action) {
      state.languages = action.payload;
    },
  },
});

export const { addLanguage, deleteLanguage, setLanguage, updateLanguage } =
  languageSlice.actions;

export default languageSlice.reducer;
