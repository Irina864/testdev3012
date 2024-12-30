import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    languages: [{ language: '', level: '' }],
    courses: [{ institute: '', faculty: '', speciality: '', year: '', certificate: null }],
    portfolios: [{ link: '', description: '', file: null }],
};


const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        addLanguage(state) {
            state.languages.push({ language: '', level: '' });
        },
        deleteLanguage(state, action) {
            state.languages.splice(action.payload, 1);
        },
        addCourse(state) {
            state.courses.push({ institute: '', faculty: '', speciality: '', year: '', certificate: null, id: Date.now() });
        },
        deleteCourse(state, action) {
            state.courses = state.courses.filter((course) => course.id !== action.payload);
        },
        addPortfolio(state) {
            state.portfolios.push({ url: '', file: null, description: '', id: Date.now() });
        },
        deletePortfolio(state, action) {
            state.portfolios = state.portfolios.filter((portfolio) => portfolio.id !== action.payload);
        },
        updateLanguage(state, action) {
            state.languages[action.payload.index][action.payload.key] = action.payload.value;
        },
        updateCourse(state, action) {
            state.courses[action.payload.index][action.payload.key] = action.payload.value;
        },
        updatePortfolio(state, action) {
            state.portfolios[action.payload.index][action.payload.key] = action.payload.value;
        },
    },
});


export const {
    addLanguage,
    deleteLanguage,
    addCourse,
    deleteCourse,
    addPortfolio,
    deletePortfolio,
    updateLanguage,
    updateCourse,
    updatePortfolio,
} = formDataSlice.actions;


export default formDataSlice.reducer;






