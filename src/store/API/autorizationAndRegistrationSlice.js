import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useUnformateTaxNumber } from '@/hooks/useUnformateTaxNumber';
import { path } from './path';

export const postApplicantData = createAsyncThunk(
  'autorizationAndRegistration/postApplicantData',
  async (applicantData, thunkAPI) => {
    try {
      // const response = await fetch('/api/registration/applicant/', {
      const response = await fetch(`${path}/registration/applicant/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicantData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseApplicantData = await response.json();
      console.log(response, responseApplicantData);
      return responseApplicantData;
    } catch (error) {
      console.error('Registration error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postEmployerData = createAsyncThunk(
  'autorizationAndRegistration/postEmployerData',
  async (data, thunkAPI) => {
    try {
      const unformattedTaxNumber = useUnformateTaxNumber(data.tux_number);
      console.log(data, unformattedTaxNumber);
      const response = await fetch(`${path}/registration/employer/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(employerData),
        body: JSON.stringify({
          company_name: data.company_name,
          tux_number: unformattedTaxNumber,
          email: data.email,
          password: data.password,
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseEmplyerData = await response.json();
      console.log(response, responseEmplyerData);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postVerifyData = createAsyncThunk(
  'autorizationAndRegistration/postVerifyData',
  async (verifyData, thunkAPI) => {
    try {
      const response = await fetch(`${path}/registration/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyData),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseVerifyData = await response.json();
      console.log(response, responseVerifyData);
      return responseVerifyData;
    } catch (error) {
      console.error('Registration error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postResendEmailData = createAsyncThunk(
  'autorizationAndRegistration/postResendEmailData',
  async (emailData, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resend-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailData }),
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
      console.error('Registration error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

//! authorization
export const postAutorizationData = createAsyncThunk(
  'autorizationAndRegistration/postAutorizationData',
  async (autorizationData, thunkAPI) => {
    try {
      const response = await fetch(`${path}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autorizationData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseAutorizationData = await response.json();
      document.cookie = `access_token=${responseAutorizationData.access}; path=/; secure; samesite=strict; max-age=86400`; // 1 дней
      document.cookie = `refresh_token=${responseAutorizationData.refresh}; path=/; secure; samesite=strict; max-age=172800`; // 2 день
      console.log(response, responseAutorizationData);
      return responseAutorizationData;
    } catch (error) {
      console.error('Registration error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postAutorizationRefreshData = createAsyncThunk(
  'autorizationAndRegistration/postAutorizationRefreshData',
  async (autorizationData, thunkAPI) => {
    try {
      const response = await fetch(`${path}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autorizationData),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseAutorizationData = await response.json();
      console.log(response, responseAutorizationData);
      document.cookie = `access_token=${responseAutorizationData.access}; path=/; secure; samesite=strict; max-age=86400`; // 1 дней
      document.cookie = `refresh_token=${responseAutorizationData.refresh}; path=/; secure; samesite=strict; max-age=172800`; // 2 день
      return responseAutorizationData;
    } catch (error) {
      console.error('Registration error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const autorizationAndRegistrationSlice = createSlice({
  name: 'autorizationAndRegistration',
  initialState: {
    registrationData: {
      mode: {
        mode: null,
      },
      applicant: {
        email: null,
        first_name: null,
        last_name: null,
        password: null,
      },
      employer: {
        email: null,
        company_name: null,
        tux_number: null,
        password: null,
      },
      verify: {
        email: null,
        otp: null,
      },
      verified: '',
    },
    autorizationData: {
      email: null,
      password: null,
    },
    keys: false,
    responseErrors: [],
    isLoading: false,
  },
  reducers: {
    updateRegistrationData: (state, action) => {
      const { nameKey, data } = action.payload;
      if (state.registrationData[`${nameKey}`] !== undefined) {
        state.registrationData[`${nameKey}`] = data;
      }
    },
    updateAuthorizationData: (state, action) => {
      const { nameKey, data } = action.payload;
      if (state[`${nameKey}`] !== undefined) {
        state[`${nameKey}`] = data;
      }
    },
    switchToFalseKeys: (state, action) => {
      state.keys = false;
    },
  },
  extraReducers: (builder) => {
    //! post applicant
    builder.addCase(postApplicantData.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log('Post applicant registration data');
    });
    builder.addCase(postApplicantData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log(
        'Fetch error to post applicant registration data',
        action.payload
      );
    });
    //! post employer
    builder.addCase(postEmployerData.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log('Post employer registration data');
    });
    builder.addCase(postEmployerData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log(
        'Fetch error to post employer registration data',
        action.payload
      );
    });
    //! post verify
    // builder.addCase(postVerifyData.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    builder.addCase(postVerifyData.fulfilled, (state, action) => {
      state.responseErrors = [];
      // state.isLoading = false;
      // state.registrationData.employer = action.payload;
      console.log('Post verify');
      state.registrationData.verified = action.payload.message;
    });
    builder.addCase(postVerifyData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      // state.isLoading = false;
      console.log(
        'Fetch error to post verify registration data',
        action.payload
      );
    });
    //! post resend code
    builder.addCase(postResendEmailData.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log('Post postResendEmailData');
    });
    builder.addCase(postResendEmailData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log('Fetch error to post postResendEmailData', action.payload);
    });
    //! post authorization
    builder.addCase(postAutorizationData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.keys = true;
      console.log('Post autorization');
    });
    builder.addCase(postAutorizationData.rejected, (state, action) => {
      state.responseErrors = [];

      state.responseErrors.push(action.payload);
      console.log('Fetch error to post autorization data', action.payload);
      state.autorizationData.verified = false;
    });
    //! post authorization refresh
    builder.addCase(postAutorizationRefreshData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.keys = true;
      console.log('Post autorization');
    });
    builder.addCase(postAutorizationRefreshData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log('Fetch error to post autorization data', action.payload);
    });
  },
});

export const {
  updateAuthorizationData,
  updateRegistrationData,
  switchToFalseKeys,
} = autorizationAndRegistrationSlice.actions;

export default autorizationAndRegistrationSlice.reducer;
