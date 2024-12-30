import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        isBurgerMenuOpen:false
    },
    reducers: {
        toggleIsBurgerMenuOpen: (state) => {
            state.isBurgerMenuOpen = !state.isBurgerMenuOpen;
        },
    },
});

export const { toggleIsBurgerMenuOpen } = headerSlice.actions;

export default headerSlice.reducer;
