import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: 0,
    reducers: {
        turnPageBack: (state) => {
            return state === 0 ? state : state - 1;
        },
        turnPageNext: (state) => {
            return state + 1;
        },
    },
});

export const { turnPageBack, turnPageNext } = pageSlice.actions;

export default pageSlice.reducer;
