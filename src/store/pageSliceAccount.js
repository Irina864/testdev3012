import { createSlice } from '@reduxjs/toolkit';

const initialState = 0; 

const pageSlice = createSlice({
    name: 'pageSave',
    initialState,
    reducers: {
        setPage: (state, action) => {
    return action.payload; 
    },
},
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;