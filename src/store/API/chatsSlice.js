import { useCookie } from "@/hooks/useCookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { path } from "./path";

const ACCESS_TOKEN = useCookie("access_token");

// ! get chat
export const getChat = createAsyncThunk("chat/getChat", async (thunkAPI) => {
  try {
    const response = await fetch(`${path}/chat/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useCookie("access_token")}`,
      },
    });
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      const errorObject = JSON.parse(errorText);
      console.log("Error response:", errorObject);
      return thunkAPI.rejectWithValue(errorObject);
    }

    const responseJson = await response.json();
    console.log(response, responseJson);
    return responseJson;
  } catch (error) {
    console.error("Get data error:", error);
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

//! post message
export const postChatMessage = createAsyncThunk(
  "resume/postChatMessage",
  async (data, thunkAPI) => {
    //   data: {
    //       chat:	null,
    //       receiver*: '',
    //       text:	'',
    //       }
    try {
      const response = await fetch(`${path}/chat/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("access_token")}`,
        },
        body: JSON.stringify(data),
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log("Error response:", errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error("Get data error:", error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

// ! delete message
export const deleteChatMessage = createAsyncThunk(
  "chat/deleteChatMessage",
  async (chat_id, message_id, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/chat/${chat_id}/message/${message_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("access_token")}`,
          },
        }
      );
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log("Error response:", errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      console.log("Chat Message was deleted");
      return;
    } catch (error) {
      console.error("Get data error:", error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! get messages
export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (chat_id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/chat/${chat_id}/messages/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("access_token")}`,
        },
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log("Error response:", errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error("Get data error:", error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

// ! Запрос на получение всех сообщений чата по id, НЕсохраняющий данные в стор
export const getAllMessagesFromChat = createAsyncThunk(
  "chat/getAllMessagesFromChat ",
  async (chat_id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/chat/${chat_id}/messages/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("access_token")}`,
        },
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log("Error response:", errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error("Get data error:", error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const chatsAndMessagesSlice = createSlice({
  name: "chatsAndMessages",
  initialState: {
    chats: [],
    chatMessages: [],
    isLoading: true,
  },
  reducers: {
    updateChat: (state, action) => {
      state.chats = action.payload;
    },
    updateChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
  },
  extraReducers: (builder) => {
    //! get chat
    builder.addCase(getChat.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.chats = action.payload;
      state.isLoading = false;
      console.log("Get Chat");
    });
    builder.addCase(getChat.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log("Fetch error to getChat", action.payload);
    });
    //! post Chat Message
    builder.addCase(postChatMessage.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log("Post Chat Message");
    });
    builder.addCase(postChatMessage.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log("Fetch error to post Chat Message", action.payload);
    });
    //! delete Chat Message
    // builder.addCase(deleteChatMessage.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    builder.addCase(deleteChatMessage.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log("delete Chat Message");
    });
    builder.addCase(deleteChatMessage.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log("Fetch error to delete Chat Message", action.payload);
    });
    //! get Chat Messages
    builder.addCase(getChatMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.chatMessages = action.payload;
      state.isLoading = false;
      console.log("Get Chat Messages");
    });
    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log("Fetch error to get Chat Messages", action.payload);
    });
  },
});

export const { updateChat, updateChatMessages } = chatsAndMessagesSlice.actions;

export default chatsAndMessagesSlice.reducer;
