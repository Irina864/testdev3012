import { useCookie } from '@/hooks/useCookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { path } from './path';

//!ниже правильная функция С учетом параметров
// export const getVacanciesList = createAsyncThunk(
//   'vacancy/getVacancyListForApplicant',
//   async (params, thunkAPI) => {
//     try {
//       const query = new URLSearchParams(params).toString();
//       const response = await fetch(`${path}/vacancies/applicant/?${query}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }

//       const vacancyListForApplicant = await response.json();
//       console.log(response, vacancyListForApplicant);
//       return vacancyListForApplicant;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );
//! get
//!ниже неправильная функция БЕЗ учетом параметров
// export const getVacanciesListForApplicant = createAsyncThunk(
//   'vacancy/getVacancyListForApplicant',
//   async (_, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/vacancies/applicant/`, {
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }

//       const vacancyListForApplicant = await response.json();
//       console.log(response, vacancyListForApplicant);
//       return vacancyListForApplicant;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );
//!ниже правильная функция С учетом параметров
export const getVacanciesListForApplicant = createAsyncThunk(
  'vacancy/getVacancyListForApplicant',
  async (params, thunkAPI) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${path}/vacancies/applicant/?${query}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(useCookie('access_token')
            ? { Authorization: `Bearer ${useCookie('access_token')}` }
            : {}),
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const vacancyListForApplicant = await response.json();
      console.log(response, vacancyListForApplicant);
      return vacancyListForApplicant;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getVacancyForApplicant = createAsyncThunk(
  'vacancy/getVacancyForApplicant',
  async (vacancy_id, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/vacancies/applicant/${vacancy_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(useCookie('access_token')
              ? { Authorization: `Bearer ${useCookie('access_token')}` }
              : {}),
          },
        }
      );
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const vacancyForApplicant = await response.json();
      console.log(response, vacancyForApplicant);
      setIsLoading(false);
      return vacancyForApplicant;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getVacanciesListForEmployer = createAsyncThunk(
  'vacancy/getVacanciesListForEmployer',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${path}/vacancies/employer/`, {
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

      const vacancyListForEmployer = await response.json();
      console.log(response, vacancyListForEmployer);
      return vacancyListForEmployer;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const getVacancyForEmployer = createAsyncThunk(
  'vacancy/getVacancyForEmployer',
  async (id_vacancy, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/vacancies/employer/${id_vacancy}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useCookie('access_token')}`,
          },
        }
      );
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const vacancyForEmployer = await response.json();
      console.log(response, vacancyForEmployer);
      return vacancyForEmployer;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! post
export const postVacancy = createAsyncThunk(
  'vacancy/postVacancy',
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${path}/vacancies/employer/`, {
        method: 'POST',
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

      const vacancyData = await response.json();
      console.log(response, vacancyData);
      return vacancyData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const postVacancyToApplicantFavorite = createAsyncThunk(
  'vacancy/postVacancyToApplicantFavorite',
  async (vacancy_id, thunkAPI) => {
    console.log(vacancy_id, 'post');
    try {
      const response = await fetch(
        `${path}/vacancies/${vacancy_id}/favorite/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useCookie('access_token')}`,
          },
          // body: JSON.stringify(data),
        }
      );
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const favVacancy = await response.json();
      console.log(response, favVacancy);
      return favVacancy;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! patch
export const patchVacancy = createAsyncThunk(
  'vacancy/patchVacancy',
  async ({ id_vacancy, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/vacancies/${id_vacancy}/`, {
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

      const vacancyData = await response.json();
      console.log(response, vacancyData);
      return vacancyData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! put
export const putVacancy = createAsyncThunk(
  'vacancy/putVacancy',
  async ({ id_vacancy, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/vacancies/${id_vacancy}/`, {
        method: 'PUT',
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

      const vacancyData = await response.json();
      console.log(response, vacancyData);
      return vacancyData;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

//! delete
export const deleteAllVacancies = createAsyncThunk(
  'vacancy/deleteAllVacancies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${path}/vacancies/employer/delete_all/`, {
        method: 'DELETE',
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

      console.log('Vacancies was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const deleteVacancy = createAsyncThunk(
  'vacancy/deleteVacancy',
  async (id_vacancy, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/vacancies/employer/${id_vacancy}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useCookie('access_token')}`,
          },
        }
      );
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      console.log('Vacancy was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const deleteVacancyFromApplicantFavorite = createAsyncThunk(
  'vacancy/deleteVacancyFromApplicantFavorite',
  async (id_vacancy, thunkAPI) => {
    console.log(id_vacancy, 'del');
    try {
      console.log(id_vacancy, 'del');
      const response = await fetch(
        `${path}/vacancies/${id_vacancy}/favorite/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useCookie('access_token')}`,
          },
        }
      );
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      console.log('Vacancy was deleted from fav');
      return response.meta;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const initialState = {
  vacancy: {
    id: null,
    language: [{ language: '', language_level: '' }],
    position: null,
    description: null,
    qualification_requirements: null,
    responsibilities: null,
    work_schedule: [],
    work_format: [],
    address: null,
    city: null,
    conditions: null,
    education_level: null, //integer
    experience_from: null, //integer
    experience_to: null, //integer
    is_active: true,
    is_archieved: false,
    salary_from: null, //integer
    salary_to: null, //integer
    remote_is_available: false,
    no_experience: false,
    created_at: null,
    is_moderated: false,
    is_favorited: false,
    employer: { user: null, company_name: null, logo: null },
  },
  vacanciesList: [],
  responseErrors: [],
  isLoading: true,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    cleanForm: (state, action) => {
      if (state.vacancy.id) {
        state.vacancy = {
          id: null,
          language: [{ language: '', language_level: '' }],
          position: null,
          description: null,
          qualification_requirements: null,
          responsibilities: null,
          work_schedule: [],
          work_format: [],
          address: null,
          city: null,
          conditions: null,
          education_level: null, //integer
          experience_from: null, //integer
          experience_to: null, //integer
          is_active: true,
          is_archieved: false,
          salary_from: null, //integer
          salary_to: null, //integer
          remote_is_available: false,
          no_experience: false,
          created_at: null,
          is_moderated: false,
          is_favorited: false,
          employer: { company_name: null, logo: null },
        };
      }
    },
    updateVacancyKey: (state, action) => {
      const { key, data } = action.payload;
      if (state.vacancy[`${key}`] !== undefined) {
        state.vacancy[`${key}`] = data;
      }
    },
    updateVacancy: (state, action) => {
      const { key, data } = action.payload;
      if (state[`${key}`] !== undefined) {
        state[`${key}`] = data;
      }
    },
    addLanguage(state) {
      state.vacancy.language.push({ language: '', language_level: '' });
    },
    deleteLanguage(state, action) {
      state.vacancy.language.splice(action.payload, 1);
    },
    updateLanguage(state, action) {
      state.vacancy.language[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    setLanguage(state, action) {
      state.vacancy.language = action.payload;
    },
    setIsLoading(state, action) {
      state.vacancy.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    //!get
    builder.addCase(getVacanciesListForApplicant.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getVacanciesListForApplicant.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacanciesList = action.payload;
    });
    builder.addCase(getVacanciesListForApplicant.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(getVacancyForApplicant.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getVacancyForApplicant.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacancy = action.payload;
    });
    builder.addCase(getVacancyForApplicant.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(getVacanciesListForEmployer.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getVacanciesListForEmployer.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacanciesList = action.payload;
    });
    builder.addCase(getVacanciesListForEmployer.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(getVacancyForEmployer.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getVacancyForEmployer.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacancy = action.payload;
    });
    builder.addCase(getVacancyForEmployer.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //! post
    builder.addCase(postVacancy.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log('Post postVacancy registration data');
    });
    builder.addCase(postVacancy.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log('Fetch error to postVacancy', action.payload);
    });
    builder.addCase(
      postVacancyToApplicantFavorite.fulfilled,
      (state, action) => {
        state.vacanciesList.forEach((item, index) => {
          if (action.meta.arg === item.id) {
            item.is_favorited = true;
          }
        });
        console.log(
          action.meta.arg,
          state.vacancy.id,
          state.vacancy.is_favorited
        );
        if (action.meta.arg === state.vacancy.id) {
          state.vacancy.is_favorited = true;
        }
        console.log('Post postVacancyToApplicantFavorite registration data');
      }
    );
    builder.addCase(
      postVacancyToApplicantFavorite.rejected,
      (state, action) => {
        console.log(
          'Fetch error to postVacancyToApplicantFavorite',
          action.payload
        );
      }
    );
    //!patch
    builder.addCase(patchVacancy.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchVacancy.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacancy = action.payload;
    });
    builder.addCase(patchVacancy.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //! put
    builder.addCase(putVacancy.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putVacancy.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacancy = action.payload;
    });
    builder.addCase(putVacancy.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putVacancy');
    });
    //!Delete
    builder.addCase(deleteAllVacancies.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(deleteAllVacancies.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacanciesList = action.payload;
    });
    builder.addCase(deleteAllVacancies.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(deleteVacancy.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(deleteVacancy.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.vacancy = action.payload;
    });
    builder.addCase(deleteVacancy.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(
      deleteVacancyFromApplicantFavorite.pending,
      (state, action) => {
        //    state.isLoading = true;
      }
    );
    builder.addCase(
      deleteVacancyFromApplicantFavorite.fulfilled,
      (state, action) => {
        state.isLoading = false;
        console.log(
          action.meta.arg,
          state.vacancy.id,
          state.vacancy.is_favorited
        );
        if (action.meta.arg === state.vacancy.id) {
          state.vacancy.is_favorited = false;
        }
        state.vacanciesList.forEach((item, index) => {
          if (action.meta.arg === item.id) {
            item.is_favorited = false;
          }
        });
      }
    );
    builder.addCase(
      deleteVacancyFromApplicantFavorite.rejected,
      (state, action) => {
        state.isLoading = false;
        console.log('Fail to get user data');
      }
    );
  },
});

export const {
  updateVacancy,
  updateVacancyKey,
  addLanguage,
  setLanguage,
  updateLanguage,
  deleteLanguage,
  setIsLoading,
  cleanForm,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
