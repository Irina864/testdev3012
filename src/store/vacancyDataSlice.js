import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние с данными для всех страниц
const initialState = {
  page0: {
    profession: '',
    salaryMin: '',
    salaryMax: '',
    city: '',
    checkedAddress: '',
    remoteWork: [],
    experienceMin: '',
    experienceMax: '',
    noExperience: [],
    format: [],
    schedule: [],
  },
  page1: {
    avatarFile: '',
    nameApplicant: '',
    surnameApplicant: '',
    sex: '',
    birthDate: '',
    showOnlyYear: '',
    city: '',
    remoteWork: '',
    email: '',
    phone: '',
  },
  page2: {
    levelEducation: '',
    languages: [],
  },
  page3: {
    companyName: '',
    taxNumber: '',
    companyAddress: '',
    website: '',
    email: '',
    phone: '',
    description: '',
    companyLogo: null,
  },
};

const vacancyDataSlice = createSlice({
  name: 'vacancyData',
  initialState,
  reducers: {
    updatePage: (state, action) => {
      const { pageIndex, data } = action.payload;
      if (state[`page${pageIndex}`] !== undefined) {
        state[`page${pageIndex}`] = data;
      }
    },
  },
});

export const { updatePage } = vacancyDataSlice.actions;

export default vacancyDataSlice.reducer;
