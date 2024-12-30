import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
   allChats: [],
   currentChat: {},
   inputValue: '',
   currentChatsList: [],
};

const UserChatsSlice = createSlice({
  name: 'userChats',
  initialState,
  reducers: {
    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setCurrentChatsList: (state, action) => {
      state.currentChatsList = action.payload;
    },
  },
});

export const { setAllChats, setCurrentChat, setInputValue, setCurrentChatsList } = UserChatsSlice.actions;

export default UserChatsSlice.reducer;
