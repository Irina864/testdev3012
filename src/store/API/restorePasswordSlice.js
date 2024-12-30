import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { path } from './path';

export const postRestorePasswordInitiate = createAsyncThunk(
  'restorePassword/postRestorePasswordInitiate',
  async (user, thunkAPI) => {
    try {
      const response = await fetch(`${path}/restore-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseData = await response.json();
      console.log(response, responseData);
      return responseData;
    } catch (error) {
      console.error('Restore password error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postRestorePasswordConfirm = createAsyncThunk(
  'restorePassword/postRestorePasswordConfirm',
  async (user, thunkAPI) => {
    console.log(user);
    try {
      // Проверка наличия необходимых полей
      if (!user || !user.email || !user.otp) {
        return thunkAPI.rejectWithValue({
          message: 'Email and OTP are required',
        });
      }
      const response = await fetch(`${path}/restore-password/confirm/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          otp: user.otp,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Данные подтверждения:', responseData);
      return responseData;
    } catch (error) {
      console.error('Ошибка при подтверждении кода:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postRestorePasswordComplete = createAsyncThunk(
  'restorePassword/postRestorePasswordComplete',
  async (user, thunkAPI) => {
    try {
      const response = await fetch(`${path}/restore-password/complete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseData = await response.json();
      console.log(response, responseData);
      return responseData;
    } catch (error) {
      console.error('Restore password complete error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postRestorePasswordResendCode = createAsyncThunk(
  'restorePassword/postRestorePasswordResendCode',
  async (user, thunkAPI) => {
    try {
      const response = await fetch(`${path}/restore-password/resend-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseData = await response.json();
      console.log(response, responseData);
      return responseData;
    } catch (error) {
      console.error('Resend restore password code error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const restorePasswordSlice = createSlice({
  name: 'restorePassword',
  initialState: {
    restorePasswordData: {
      user: {
        email: null,
      },
      otp: null,
      new_password: null,
    },
    responseErrors: [],
    isLoading: false,
    status: null,
  },
  reducers: {
    updateRestorePasswordData: (state, action) => {
      const { nameKey, data } = action.payload;
      if (nameKey === 'email' && state.restorePasswordData.user) {
        state.restorePasswordData.user.email = data;
      } else if (state.restorePasswordData[`${nameKey}`] !== undefined) {
        state.restorePasswordData[`${nameKey}`] = data;
      }
    },
    resetRestorePasswordState: (state) => {
      state.restorePasswordData = {
        user: {
          email: null,
        },
        otp: null,
        new_password: null,
      };
      state.responseErrors = [];
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRestorePasswordInitiate.pending, (state) => {
      state.isLoading = true;
      state.responseErrors = [];
    });
    builder.addCase(postRestorePasswordInitiate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseErrors = [];
      state.status = 'initiated';

      if (action.payload.user && action.payload.user.email) {
        state.restorePasswordData.user.email = action.payload.user.email;
      }
    });
    builder.addCase(postRestorePasswordInitiate.rejected, (state, action) => {
      state.isLoading = false;
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.status = 'error';
      console.log('Restore password initiate error', action.payload);
    });

    // Confirm restore password
    builder.addCase(postRestorePasswordConfirm.pending, (state) => {
      state.isLoading = true;
      state.responseErrors = [];
    });
    builder.addCase(postRestorePasswordConfirm.fulfilled, (state, action) => {
      console.log('OTP подтвержден, обновляем состояние:', action.payload);
      state.isLoading = false;
      state.responseErrors = [];
      state.status = 'confirmed';
      state.restorePasswordData.otp = action.payload.otp;
    });
    builder.addCase(postRestorePasswordConfirm.rejected, (state, action) => {
      state.isLoading = false;
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.status = 'error';
      console.log('Restore password confirm error', action.payload);
    });

    // Complete restore password
    builder.addCase(postRestorePasswordComplete.pending, (state) => {
      state.isLoading = true;
      state.responseErrors = [];
    });
    builder.addCase(postRestorePasswordComplete.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseErrors = [];
      state.status = 'completed';
    });
    builder.addCase(postRestorePasswordComplete.rejected, (state, action) => {
      state.isLoading = false;
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.status = 'error';
      console.log('Restore password complete error', action.payload);
    });

    // Resend code
    builder.addCase(postRestorePasswordResendCode.pending, (state) => {
      state.isLoading = true;
      state.responseErrors = [];
    });
    builder.addCase(
      postRestorePasswordResendCode.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.responseErrors = [];
        state.status = 'code_resent';
      }
    );
    builder.addCase(postRestorePasswordResendCode.rejected, (state, action) => {
      state.isLoading = false;
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.status = 'error';
      console.log('Resend restore password code error', action.payload);
    });
  },
});

export const { updateRestorePasswordData, resetRestorePasswordState } =
  restorePasswordSlice.actions;

export default restorePasswordSlice.reducer;
