import { useCookie } from "@/hooks/useCookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { path } from "./path";

const ACCESS_TOKEN = useCookie("access_token");

//! get reactions - возвращает массив всех реакций пользователя
export const getReactionList = createAsyncThunk(
  "reaction/getReactionList",
  async (thunkAPI) => {
    try {
      const response = await fetch(`${path}/reaction/`, {
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

//! post reaction отправляет отклик с сообщением!!!

// const data = {
//   resume: integer
//   vacancy: integer
//   letter:  string,
//   reaction_to_resume: integer
//   reaction_to_vacancy: integer,
//   }
// reaction_to_...
// 0 - 'Вы откликнулись'
// 1 - 'Вам отказали'
// 2 - 'Вас пригласили'
export const postReaction = createAsyncThunk(
  "reaction/postReaction",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${path}/reaction/`, {
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

//! patch reaction
export const patchReaction = createAsyncThunk(
  "reaction/patchReaction",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/reaction/${id}/`, {
        method: "PATCH",
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

      console.log("Patch Reaction");
      return;
    } catch (error) {
      console.error("Get data error:", error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! get reaction by id
export const getReactionById = createAsyncThunk(
  "reaction/getReactionById",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/reaction/${id}/`, {
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

const reactionsSlice = createSlice({
  name: "reaction",
  initialState: {
    reaction: {
      id: null,
      resume: null,
      vacancy: null,
      letter: '',
      reaction_to_resume: null,
      reaction_to_vacancy: null,
    },
    reactionList: [],
    responseErrors: [],
    // isLoading: true,
  },
  reducers: {
    updateReaction: (state, action) => {
      state.reaction = action.payload;
    },
    updateReactionList: (state, action) => {
      state.reactionList = action.payload;
    },
  },
  extraReducers: (builder) => {
    //! get reaction
    builder.addCase(getReactionList.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.reactionList = action.payload;
      console.log("Get Reaction");
    });
    builder.addCase(getReactionList.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log("Fetch error to get Reaction", action.payload);
    });
    //! post reaction
    builder.addCase(postReaction.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log("Post Reaction");
    });
    builder.addCase(postReaction.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log("Fetch error to post Reaction", action.payload);
    });
    //! patch reaction
    builder.addCase(patchReaction.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log("Patch Reaction");
    });
    builder.addCase(patchReaction.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log("Fetch error to patch Reaction", action.payload);
    });
    //! get reaction by id
    builder.addCase(getReactionById.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.reaction = action.payload;
      console.log("Get Reaction By Id");
    });
    builder.addCase(getReactionById.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log("Fetch error to get Reaction By Id", action.payload);
    });
  },
});

export const { updateReaction, updateReactionList } = reactionsSlice.actions;

export default reactionsSlice.reducer;
