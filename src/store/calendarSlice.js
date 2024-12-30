import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    showCalendar: false,
    date: null,
    dateObject: { day: null, month: null, year: null },
    dateStringDoc: '',
  },
  reducers: {
    showCalendar: (state) => {
      state.showCalendar = true;
    },
    hideCalendar: (state) => {
      state.showCalendar = false;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setDay: (state, action) => {
      state.dateObject.day = action.payload;
    },
    setMonth: (state, action) => {
      state.dateObject.month = action.payload;
    },
    setYear: (state, action) => {
      state.dateObject.year = action.payload;
    },
    setDateStringDoc: (state, action) => {
      state.dateStringDoc = action.payload;
    },
  },
});

export const {
  showCalendar,
  hideCalendar,
  setDate,
  setDay,
  setMonth,
  setYear,
  setDateStringDoc,
} = calendarSlice.actions;

export default calendarSlice.reducer;
