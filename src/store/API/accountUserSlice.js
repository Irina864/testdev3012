import { useCookie } from '@/hooks/useCookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { path } from './path';
import { useFormateTaxNumber } from '@/hooks/useFormateTaxNumber';
import { useUnformateTaxNumber } from '@/hooks/useUnformateTaxNumber';
import { useFormatePhone } from '@/hooks/useFormatePhone';
import { useUnformatePhone } from '@/hooks/useUnformatePhone';
import Cookies from 'js-cookie';

//! get
export const getApplicantData = createAsyncThunk(
  'accountUser/getApplicantData',
  async (user_id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/applicant/${user_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const applicantData = await response.json();
      Cookies.remove('user_mode');
      Cookies.set('user_mode', 'applicant', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      console.log(response, applicantData);
      return applicantData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getEmployerData = createAsyncThunk(
  'accountUser/getEmployerData',
  async (user_id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/employer/${user_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const employerData = await response.json();
      if (employerData.tux_number) {
        employerData.tux_number = useFormateTaxNumber(employerData.tux_number);
      }
      if (employerData.user.phone) {
        employerData.user.phone = useFormatePhone(employerData.user.phone);
      }
      console.log(response, employerData);
      Cookies.remove('user_mode');
      Cookies.set('user_mode', 'employer', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
      return employerData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! patch
export const patchApplicantData = createAsyncThunk(
  'accountUser/patchApplicantData',
  async ({ user_id, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/applicant/${user_id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(data),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const applicantData = await response.json();
      console.log(response, applicantData);
      return applicantData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const patchEmployerData = createAsyncThunk(
  'accountUser/patchEmployerData',
  async ({ user_id, data, logo }, thunkAPI) => {
    try {
      const unformattedTaxNumber = useUnformateTaxNumber(data.tux_number);
      const unformattedPhone = useUnformatePhone(data.user.phone);
      const sendData =
        logo === null
          ? {
              company_name: data.company_name,
              tux_number: unformattedTaxNumber,
              legal_address: data.legal_address,
              logo: logo,
              url: data.url,
              description: data.description,
              user: {
                email: data.user.email,
                phone: data.user.phone,
                // phone: unformattedPhone,
              },
            }
          : {
              company_name: data.company_name,
              tux_number: unformattedTaxNumber,
              legal_address: data.legal_address,
              url: data.url,
              description: data.description,
              user: {
                email: data.user.email,
                phone: data.user.phone,
                // phone: unformattedPhone,
              },
            };
      console.log(sendData);
      // First request with JSON data
      const jsonResponse = await fetch(`${path}/employer/${user_id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(sendData),
      });

      if (!jsonResponse.ok) {
        const errorText = await jsonResponse.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      let employerData = await jsonResponse.json();
      console.log('Data updated:', employerData);

      // Second request with logo if provided
      if (logo) {
        const logoFormData = new FormData();
        logoFormData.append('logo', logo);

        const logoResponse = await fetch(`${path}/employer/${user_id}/`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${useCookie('access_token')}`,
          },
          body: logoFormData,
        });

        if (!logoResponse.ok) {
          const errorText = await logoResponse.text();
          const errorObject = JSON.parse(errorText);
          console.log('Logo upload error:', errorObject);
          return thunkAPI.rejectWithValue(errorObject);
        }

        employerData = await logoResponse.json();
        console.log('Logo uploaded:', employerData);
      }

      if (employerData.tux_number) {
        employerData.tux_number = useFormateTaxNumber(employerData.tux_number);
      }
      if (employerData.user.phone) {
        employerData.user.phone = useFormatePhone(employerData.user.phone);
      }

      return employerData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
// export const patchEmployerData = createAsyncThunk(
//   'accountUser/patchEmployerData',
//   async ({ user_id, data }, thunkAPI) => {
//     try {
//       const unformattedTaxNumber = useUnformateTaxNumber(data.tux_number);
//       const sendData =
//         data.logo === null
//           ? {
//               company_name: data.company_name,
//               tux_number: unformattedTaxNumber,
//               legal_address: data.legal_address,
//               logo: data.logo,
//               url: data.url,
//               description: data.description,
//               user: {
//                 email: data.user.email,
//                 phone: data.user.phone,
//               },
//             }
//           : {
//               company_name: data.company_name,
//               tux_number: unformattedTaxNumber,
//               legal_address: data.legal_address,
//               url: data.url,
//               description: data.description,
//               user: {
//                 email: data.user.email,
//                 phone: data.user.phone,
//               },
//             };
//       const response = await fetch(`${path}/employer/${user_id}/`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//         body: JSON.stringify(sendData),
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }
//       const employerData = await response.json();
//       if (employerData.tux_number) {
//         employerData.tux_number = useFormateTaxNumber(employerData.tux_number);
//       }
//       if (employerData.user.phone) {
//         employerData.user.phone = useFormatePhone(employerData.user.phone);
//       }
//       console.log(response, employerData);
//       return employerData;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );
export const patchEmployerLogo = createAsyncThunk(
  'accountUser/patchEmployerLogo',
  async ({ user_id, data }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('logo', data);
      const response = await fetch(`${path}/employer/${user_id}/`, {
        method: 'PATCH',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: formData,
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const employerData = await response.json();
      if (employerData.tux_number) {
        employerData.tux_number = useFormateTaxNumber(employerData.tux_number);
      }
      if (employerData.user.phone) {
        employerData.user.phone = useFormatePhone(employerData.user.phone);
      }
      console.log(response, employerData);
      return employerData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! delete
export const deleteApplicantData = createAsyncThunk(
  'accountUser/deleteApplicantData',
  async ({ user_id, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/applicant/${user_id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(data),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      console.log('User was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const deleteEmployerData = createAsyncThunk(
  'accountUser/deleteEmployerData',
  async (user_id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/employer/${user_id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(data),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      console.log('User was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const initialState = {
  applicant: {
    first_name: null,
    last_name: null,
    user: {
      email: null,
      phone: null,
    },
    resume_ids: [],
  },
  employer: {
    company_name: null,
    tux_number: null,
    logo: null,
    legal_address: null,
    url: null,
    description: null,
    user: {
      email: null,
      phone: null,
    },
    vacancy_ids: [],
  },
  isLoading: false,
  responseErrors: [],
};

const accountUserSlice = createSlice({
  name: 'accountUser',
  initialState,
  reducers: {
    updateAccountUser: (state, action) => {
      const { user, data } = action.payload;
      if (state[`${user}`] !== undefined) {
        state[`${user}`] = data;
      }
    },
  },
  extraReducers: (builder) => {
    //!get
    builder.addCase(getApplicantData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getApplicantData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.applicant = action.payload;
    });
    builder.addCase(getApplicantData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(getEmployerData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getEmployerData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.employer = action.payload;
    });
    builder.addCase(getEmployerData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //!patch
    builder.addCase(patchApplicantData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(patchApplicantData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.applicant = action.payload;
    });
    builder.addCase(patchApplicantData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(patchEmployerData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(patchEmployerData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.employer = action.payload;
    });
    builder.addCase(patchEmployerData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(patchEmployerLogo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(patchEmployerLogo.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.employer = action.payload;
    });
    builder.addCase(patchEmployerLogo.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //!Delete
    builder.addCase(deleteApplicantData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteApplicantData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.applicant = action.payload;
    });
    builder.addCase(deleteApplicantData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(deleteEmployerData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEmployerData.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.employer = action.payload;
    });
    builder.addCase(deleteEmployerData.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
  },
});

export const { updateAccountUser } = accountUserSlice.actions;

export default accountUserSlice.reducer;
