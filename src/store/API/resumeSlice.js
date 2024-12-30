import { useCookie } from '@/hooks/useCookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { path } from './path';

//! PHOTO
export const patchResumePhoto = createAsyncThunk(
  'resume/patchResumePhoto',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('photo', data);
      const response = await fetch(`${path}/resume/resume/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

//! get
export const getResumeDetailById = createAsyncThunk(
  'resume/getResumeDetailById',
  async (id_resume, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/detail/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const getResumeList = createAsyncThunk(
  'resume/getResumeList',
  async (params, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${path}/resume/list/?${queryParams}`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

//! post
export const postResumeEducation = createAsyncThunk(
  'resume/postResumeEducation',
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/education/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(useCookie('access_token')
            ? { Authorization: `Bearer ${useCookie('access_token')}` }
            : {}),
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postResumeExperience = createAsyncThunk(
  'resume/postResumeExperience',
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/experience/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postResumeLanguage = createAsyncThunk(
  'resume/postResumeLanguage',
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/language/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

// export const postResumePortfolio = createAsyncThunk(
//   'resume/postResumePortfolio',
//   async (data, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/resume/portfolio/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//         body: JSON.stringify(data),
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }

//       const responseJson = await response.json();
//       console.log(response, responseJson);
//       return responseJson;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );
export const postResumePortfolio = createAsyncThunk(
  'resume/postResumePortfolio',
  async ({ data, file }, thunkAPI) => {
    try {
      // Первый запрос для отправки данных
      const response = await fetch(`${path}/resume/portfolio/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Response status for data:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response for data:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson = await response.json();
      console.log('Response data:', responseJson);

      // Если файл есть, отправляем его во втором запросе
      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('portfolio_file', file);

        const fileResponse = await fetch(
          `${path}/resume/portfolio/${responseJson.id}/`, // Предполагаем, что id возвращается в первом ответе
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${useCookie('access_token')}`,
            },
            body: fileFormData,
          }
        );

        console.log('Response status for file:', fileResponse.status);

        if (!fileResponse.ok) {
          const errorText = await fileResponse.text();
          const errorObject = JSON.parse(errorText);
          console.log('Error response for file:', errorObject);
          return thunkAPI.rejectWithValue(errorObject);
        }

        const finalResponse = await fileResponse.json();
        console.log('File uploaded:', finalResponse);
        return finalResponse;
      }

      return responseJson;
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const postResume = createAsyncThunk(
  'resume/postResume',
  async ({ data, photo }, thunkAPI) => {
    const sendData =
      data.photo === null
        ? {
            job_title: data.job_title,
            salary: data.salary,
            schedule: data.schedule,
            work_format: data.work_format,
            photo: data.photo,
            sex: data.sex,
            birth_date: data.birth_date,
            only_year: data.only_year,
            city: data.city,
            remote_is_available: data.remote_is_available,
          }
        : {
            job_title: data.job_title,
            salary: data.salary,
            schedule: data.schedule,
            work_format: data.work_format,
            sex: data.sex,
            birth_date: data.birth_date,
            only_year: data.only_year,
            city: data.city,
            remote_is_available: data.remote_is_available,
          };
    try {
      const jsonResponse = await fetch(`${path}/resume/resume/`, {
        method: 'POST',
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

      const resumeData = await jsonResponse.json();
      console.log('Resume created:', resumeData);

      if (photo !== null) {
        const photoFormData = new FormData();
        photoFormData.append('photo', photo); // Исправлено с formData на photo

        const photoResponse = await fetch(
          `${path}/resume/resume/${resumeData.id}/`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${useCookie('access_token')}`,
            },
            body: photoFormData,
          }
        );

        if (!photoResponse.ok) {
          const errorText = await photoResponse.text();
          const errorObject = JSON.parse(errorText);
          console.log('Photo upload error:', errorObject);
          return thunkAPI.rejectWithValue(errorObject);
        }

        const finalResponse = await photoResponse.json();
        console.log('Photo uploaded:', finalResponse);
        return finalResponse;
      }

      return resumeData;
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const postResumeTraining = createAsyncThunk(
  'resume/postResumeTraining',
  async ({ data, file }, thunkAPI) => {
    try {
      // Первый запрос для отправки данных
      const response = await fetch(`${path}/resume/training/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Response status for data:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response for data:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson = await response.json();
      console.log('Response data:', responseJson);

      // Если файл есть, отправляем его во втором запросе
      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('certificate', file);

        const fileResponse = await fetch(
          `${path}/resume/training/${responseJson.id}/`, // Предположим, что id возвращается в первом ответе
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${useCookie('access_token')}`,
            },
            body: fileFormData,
          }
        );

        console.log('Response status for file:', fileResponse.status);

        if (!fileResponse.ok) {
          const errorText = await fileResponse.text();
          const errorObject = JSON.parse(errorText);
          console.log('Error response for file:', errorObject);
          return thunkAPI.rejectWithValue(errorObject);
        }

        const finalResponse = await fileResponse.json();
        console.log('File uploaded:', finalResponse);
        return finalResponse;
      }

      return responseJson;
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

// export const postResumeTraining = createAsyncThunk(
//   'resume/postResumeTraining',
//   async (data, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/resume/training/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//         body: JSON.stringify(data),
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }

//       const responseJson = await response.json();
//       console.log(response, responseJson);
//       return responseJson;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );

//! patch
export const patchResumeDetailById = createAsyncThunk(
  'resume/patchResumeDetailById',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/detail/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const patchResumeEducation = createAsyncThunk(
  'resume/patchResumeEducation',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/education/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const patchResumeExperience = createAsyncThunk(
  'resume/patchResumeExperience',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/experience/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const patchResumeLanguage = createAsyncThunk(
  'resume/patchResumeLanguage',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/language/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
// export const patchResumePortfolio = createAsyncThunk(
//   'resume/patchResumePortfolio',
//   async ({ id_resume, data }, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/resume/portfolio/${id_resume}/`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//         body: JSON.stringify(data),
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }

//       const responseJson = await response.json();
//       console.log(response, responseJson);
//       return responseJson;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );
export const patchResumePortfolio = createAsyncThunk(
  'resume/patchResumePortfolio',
  async ({ id_resume, data, file }, thunkAPI) => {
    const sendData =
      data.portfolio_file === null
        ? {
            portfolio_description: data.portfolio_description,
            portfolio_link: data.portfolio_link,
            portfolio_file: data.portfolio_file,
            resume: data.id,
          }
        : {
            portfolio_description: data.portfolio_description,
            portfolio_link: data.portfolio_link,
            resume: data.id,
          };
    try {
      // Первый запрос для обновления данных
      const response = await fetch(`${path}/resume/portfolio/${id_resume}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(sendData),
      });

      console.log('Response status for data:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response for data:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson = await response.json();
      console.log('Response data:', responseJson);

      // Если файл есть, отправляем его во втором запросе
      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('portfolio_file', file);

        const fileResponse = await fetch(
          `${path}/resume/portfolio/${id_resume}/`, // Используем тот же URL
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${useCookie('access_token')}`,
            },
            body: fileFormData,
          }
        );

        console.log('Response status for file:', fileResponse.status);

        if (!fileResponse.ok) {
          const errorText = await fileResponse.text();
          const errorObject = JSON.parse(errorText);
          console.log('Error response for file:', errorObject);
          return thunkAPI.rejectWithValue(errorObject);
        }

        const finalResponse = await fileResponse.json();
        console.log('File uploaded:', finalResponse);
        return finalResponse;
      }

      return responseJson;
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const patchResume = createAsyncThunk(
  'resume/patchResume',
  async ({ id_resume, data, photo }, thunkAPI) => {
    const sendData = data;
    try {
      // First request with JSON data
      const jsonResponse = await fetch(`${path}/resume/resume/${id_resume}/`, {
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

      let responseJson = await jsonResponse.json();
      console.log('Resume updated:', responseJson);

      // Second request with photo if provided
      if (photo) {
        const photoFormData = new FormData();
        photoFormData.append('photo', photo);

        const photoResponse = await fetch(
          `${path}/resume/resume/${id_resume}/`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${useCookie('access_token')}`,
            },
            body: photoFormData,
          }
        );

        if (!photoResponse.ok) {
          const errorText = await photoResponse.text();
          const errorObject = JSON.parse(errorText);
          console.log('Photo upload error:', errorObject);
          return thunkAPI.rejectWithValue(errorObject);
        }

        responseJson = await photoResponse.json();
        console.log('Photo uploaded:', responseJson);
      }

      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
// export const patchResume = createAsyncThunk(
//   'resume/patchResume',
//   async ({ id_resume, data }, thunkAPI) => {
//     console.log(data, id_resume);
//     try {
//       const response = await fetch(`${path}/resume/resume/${id_resume}/`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//         body: JSON.stringify(data),
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }

//       const responseJson = await response.json();
//       console.log(response, responseJson);
//       return responseJson;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );
// export const patchResumeTraining = createAsyncThunk(
//   'resume/patchResumeTraining',
//   async ({ id_resume, data, file }, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/resume/training/${id_resume}/`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${useCookie('access_token')}`,
//         },
//         body: JSON.stringify(data),
//       });
//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         const errorObject = JSON.parse(errorText);
//         console.log('Error response:', errorObject);
//         return thunkAPI.rejectWithValue(errorObject);
//       }

//       const responseJson = await response.json();
//       console.log(response, responseJson);
//       return responseJson;
//     } catch (error) {
//       console.error('Get data error:', error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );
export const patchResumeTraining = createAsyncThunk(
  'resume/patchResumeTraining',
  async ({ id_resume, data, file }, thunkAPI) => {
    const sendData =
      file === null
        ? {
            institute_name: data.institute_name,
            faculty: data.faculty,
            profession: data.profession,
            training_end_year: data.training_end_year,
            certificate: file,
            resume: data.id,
          }
        : {
            institute_name: data.institute_name,
            faculty: data.faculty,
            profession: data.profession,
            training_end_year: data.training_end_year,
            resume: data.id,
          };
    try {
      // Первый запрос для обновления данных
      const response = await fetch(`${path}/resume/training/${id_resume}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('access_token')}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Response status for data:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response for data:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson = await response.json();
      console.log('Response data:', responseJson);

      // Если файл есть, отправляем его во втором запросе
      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('certificate', file);

        const fileResponse = await fetch(
          `${path}/resume/training/${id_resume}/`, // Используем тот же URL
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${useCookie('access_token')}`,
            },
            body: fileFormData,
          }
        );

        console.log('Response status for file:', fileResponse.status);

        if (!fileResponse.ok) {
          const errorText = await fileResponse.text();
          const errorObject = JSON.parse(errorText);
          console.log('Error response for file:', errorObject);
          return thunkAPI.rejectWithValue(errorObject);
        }

        const finalResponse = await fileResponse.json();
        console.log('File uploaded:', finalResponse);
        return finalResponse;
      }

      return responseJson;
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
//! put

export const putResumeDetailById = createAsyncThunk(
  'resume/putResumeDetailById',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/detail/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const putResumeEducation = createAsyncThunk(
  'resume/putResumeEducation',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/education/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const putResumeExperience = createAsyncThunk(
  'resume/putResumeExperience',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/experience/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const putResumeLanguage = createAsyncThunk(
  'resume/putResumeLanguage',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/language/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const putResumePortfolio = createAsyncThunk(
  'resume/putResumePortfolio',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/portfolio/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const putResume = createAsyncThunk(
  'resume/putResume',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/resume/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const putResumeTrainiing = createAsyncThunk(
  'resume/putResumeTrainiing',
  async ({ id_resume, data }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/training/${id_resume}/`, {
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

      const responseJson = await response.json();
      console.log(response, responseJson);
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

//! delete

export const deleteResumeEducation = createAsyncThunk(
  'resume/deleteResumeEducation',
  async (id_education, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/resume/education/delete/${id_education}/`,
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

      console.log('deleteResumeEducation was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const deleteResumeExperience = createAsyncThunk(
  'resume/deleteResumeExperience',
  async (id_experience, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/resume/experience/delete/${id_experience}/`,
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

      console.log('deleteResumeExperience was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const deleteResumeLanguage = createAsyncThunk(
  'resume/deleteResumeLanguage',
  async (id_language, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/resume/language/delete/${id_language}/`,
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

      console.log('deleteResumeLanguage was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const deleteResumePortfolio = createAsyncThunk(
  'resume/deleteResumePortfolio',
  async (id_portfolio, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/resume/portfolio/delete/${id_portfolio}/`,
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

      console.log('deleteResumePortfolio was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const deleteResumeTraining = createAsyncThunk(
  'resume/deleteResumeTraining',
  async (id_training, thunkAPI) => {
    try {
      const response = await fetch(
        `${path}/resume/training/delete/${id_training}/`,
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

      console.log('deleteResumeTraining was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resume: {
      id: null, //integer
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      experience: [
        {
          id: null, //integer
          responsibility: null,
          achievements: null,
          start_month: null, //integer
          start_year: null, //integer
          end_month: null, //integer
          end_year: null, //integer
          to_date: false, //boolean
          company_name: null,
          profession: null,
          resume: null, //integer
        },
      ],
      education: [
        {
          id: null, //integer
          education_level: null, //integer
          institute_name: null,
          faculty: null,
          profession: null,
          education_end_year: null, //integer
          resume: null,
        },
      ],
      language: [
        {
          id: null, //integer
          language: null, //integer
          language_level: null, //integer
          resume: null, //integer
          vacancy: null, //integer
        },
      ],
      training: [
        {
          id: null, //integer
          institute_name: null,
          faculty: null,
          profession: null,
          training_end_year: null, //integer
          certificate: null,
          resume: null, //integer
        },
      ],
      portfolio: [
        {
          id: null, //integer
          portfolio_description: '',

          portfolio_link: null,
          portfolio_file: null,
          resume: null, //integer
        },
      ],
      job_title: null,
      salary: null, //integer
      schedule: null,
      work_format: null,
      sex: null, //MALE FEMALE
      city: null,
      remote_is_available: false, //boolean
      birth_date: null, //integer
      only_year: false, //boolean
      photo: null,
      no_experience: false, //boolean
      about_self: null,
      date_of_creation: null,
    },
    resumeList: {
      count: null,
      next: null,
      previous: null,
      results: [],
    },
    responseErrors: [],
    isLoading: false,
  },
  reducers: {
    updateResumeKey: (state, action) => {
      const { key, data } = action.payload;
      if (state.resume[`${key}`] !== undefined) {
        state.resume[`${key}`] = data;
      }
    },
    updateResume: (state, action) => {
      const { key, data } = action.payload;
      if (state[`${key}`] !== undefined) {
        state[`${key}`] = data;
      }
    },
    addLanguage(state) {
      state.resume.language.push({
        id: null, //integer
        language: null, //integer
        language_level: null, //integer
        resume: null, //integer
        vacancy: null, //integer
      });
    },
    deleteLanguage(state, action) {
      state.resume.language.splice(action.payload, 1);
    },
    updateLanguage(state, action) {
      state.resume.language[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    setLanguage(state, action) {
      state.resume.language = action.payload;
    },
    addExperience(state, action) {
      state.resume.experience.push({
        id: null,
        responsibility: null,
        achievements: null,
        start_month: null,
        start_year: null,
        end_month: null,
        end_year: null,
        to_date: false,
        company_name: null,
        profession: null,
        resume: null,
      });
    },
    deleteExperience(state, action) {
      state.resume.experience.splice(action.payload, 1);
    },
    updateExperience(state, action) {
      const { index, key, value } = action.payload;
      if (!Array.isArray(state.resume.experience)) {
        state.resume.experience = [];
      }
      if (!state.resume.experience[index]) {
        state.resume.experience[index] = {};
      }
      state.resume.experience[index][key] = value;
    },
    setExperience(state, action) {
      state.resume.experience = action.payload;
    },
    addEducation(state) {
      state.resume.education.push({
        id: null, //integer
        education_level: null, //integer
        institute_name: null,
        faculty: null,
        profession: null,
        education_end_year: null, //integer
        resume: null,
      });
    },
    deleteEducation(state, action) {
      state.resume.education.splice(action.payload, 1);
    },
    updateEducation(state, action) {
      const { index, key, value } = action.payload;
      state.resume.education[index][key] = value;
    },
    addCourse(state) {
      state.resume.training.push({
        id: null, //integer
        institute_name: null,
        faculty: null,
        profession: null,
        training_end_year: null, //integer
        certificate: null,
        resume: null, //integer
      });
    },
    deleteCourse(state, action) {
      state.resume.training.splice(action.payload, 1);
    },
    updateCourse(state, action) {
      state.resume.training[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    addPortfolio(state) {
      state.resume.portfolio.push({
        id: null, //integer
        portfolio_description: '',

        portfolio_link: null,
        portfolio_file: null,
        resume: null, //integer
      });
    },
    deletePortfolio(state, action) {
      state.resume.portfolio.splice(action.payload, 1);
    },
    updatePortfolio(state, action) {
      state.resume.portfolio[action.payload.index][action.payload.key] =
        action.payload.value;
    },
  },
  extraReducers: (builder) => {
    //! PHOTO
    //patchResumePhoto
    builder.addCase(patchResumePhoto.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(patchResumePhoto.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume = action.payload;
    });
    builder.addCase(patchResumePhoto.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResumePhoto');
    });

    //!get
    //getResumeDetailById
    builder.addCase(getResumeDetailById.pending, (state, action) => {
         state.isLoading = true;
    });
    builder.addCase(getResumeDetailById.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.resume = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getResumeDetailById.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //getResumeList
    builder.addCase(getResumeList.pending, (state, action) => {
         state.isLoading = true;
    });
    builder.addCase(getResumeList.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.resumeList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getResumeList.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //! post
    //postResumeEducation
    builder.addCase(postResumeEducation.fulfilled, (state, action) => {
      state.responseErrors = [];
      console.log('Post postResumeEducation data');
    });
    builder.addCase(postResumeEducation.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      console.log('Fetch error to postResumeEducation', action.payload);
    });
    //postResumeExperience
    builder.addCase(postResumeExperience.fulfilled, (state, action) => {
      console.log('Post postResumeExperience data');
    });
    builder.addCase(postResumeExperience.rejected, (state, action) => {
      console.log('Fetch error to postResumeExperience', action.payload);
    });
    //postResumeLanguage
    builder.addCase(postResumeLanguage.fulfilled, (state, action) => {
      console.log('Post postResumeLanguage data');
    });
    builder.addCase(postResumeLanguage.rejected, (state, action) => {
      console.log('Fetch error to postResumeLanguage', action.payload);
    });
    //postResumePortfolio
    builder.addCase(postResumePortfolio.fulfilled, (state, action) => {
      console.log('Post postResumePortfolio data');
    });
    builder.addCase(postResumePortfolio.rejected, (state, action) => {
      console.log('Fetch error to postResumePortfolio', action.payload);
    });
    //postResume
    builder.addCase(postResume.fulfilled, (state, action) => {
      console.log('Post postResume data');
      if (action.payload) {
        state.resume = {
          ...state.resume,
          id: action.payload.id,
        };
      }
    });
    builder.addCase(postResume.rejected, (state, action) => {
      console.log('Fetch error to postResume', action.payload);
    });
    //postResumeTraining
    builder.addCase(postResumeTraining.fulfilled, (state, action) => {
      console.log('Post postResumeTraining data');
    });
    builder.addCase(postResumeTraining.rejected, (state, action) => {
      console.log('Fetch error to postResumeTraining', action.payload);
    });
    //!patch
    //patchResumeDetailById
    builder.addCase(patchResumeDetailById.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchResumeDetailById.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.resume = action.payload;
    });
    builder.addCase(patchResumeDetailById.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResumeDetailById');
    });
    //patchResumeEducation
    builder.addCase(patchResumeEducation.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchResumeEducation.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.education = action.payload;
    });
    builder.addCase(patchResumeEducation.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResumeEducation');
    });
    //patchResumeExperience
    builder.addCase(patchResumeExperience.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchResumeExperience.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.experience = action.payload;
    });
    builder.addCase(patchResumeExperience.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResumeExperience');
    });
    //patchResumeLanguage
    builder.addCase(patchResumeLanguage.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchResumeLanguage.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.language = action.payload;
    });
    builder.addCase(patchResumeLanguage.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResumeLanguage');
    });
    //patchResumePortfolio
    builder.addCase(patchResumePortfolio.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchResumePortfolio.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.portfolio = action.payload;
    });
    builder.addCase(patchResumePortfolio.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResumePortfolio');
    });
    //patchResume
    builder.addCase(patchResume.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchResume.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume = action.payload;
    });
    builder.addCase(patchResume.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResume');
    });
    //patchResumeTraining
    builder.addCase(patchResumeTraining.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(patchResumeTraining.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
    });
    builder.addCase(patchResumeTraining.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to patchResumeTraining');
    });
    //!put
    //putResumeDetailById
    builder.addCase(putResumeDetailById.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putResumeDetailById.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      state.resume = action.payload;
    });
    builder.addCase(putResumeDetailById.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putResumeDetailById');
    });
    //putResumeEducation
    builder.addCase(putResumeEducation.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putResumeEducation.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.education = action.payload;
    });
    builder.addCase(putResumeEducation.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putResumeEducation');
    });
    //putResumeExperience
    builder.addCase(putResumeExperience.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putResumeExperience.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.experience = action.payload;
    });
    builder.addCase(putResumeExperience.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putResumeExperience');
    });
    //putResumeLanguage
    builder.addCase(putResumeLanguage.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putResumeLanguage.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.language = action.payload;
    });
    builder.addCase(putResumeLanguage.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putResumeLanguage');
    });
    //putResumePortfolio
    builder.addCase(putResumePortfolio.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putResumePortfolio.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.portfolio = action.payload;
    });
    builder.addCase(putResumePortfolio.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putResumePortfolio');
    });
    //putResume
    builder.addCase(putResume.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putResume.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
    });
    builder.addCase(putResume.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putResume');
    });
    //putResumeTrainiing
    builder.addCase(putResumeTrainiing.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(putResumeTrainiing.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
    });
    builder.addCase(putResumeTrainiing.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to putResumeTrainiing');
    });
    //!Delete
    //deleteResumeEducation
    builder.addCase(deleteResumeEducation.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(deleteResumeEducation.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.education = action.payload;
    });
    builder.addCase(deleteResumeEducation.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //deleteResumeExperience
    builder.addCase(deleteResumeExperience.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(deleteResumeExperience.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.experience = action.payload;
    });
    builder.addCase(deleteResumeExperience.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //deleteResumeLanguage
    builder.addCase(deleteResumeLanguage.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(deleteResumeLanguage.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.language = action.payload;
    });
    builder.addCase(deleteResumeLanguage.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //deleteResumePortfolio
    builder.addCase(deleteResumePortfolio.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(deleteResumePortfolio.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.portfolio = action.payload;
    });
    builder.addCase(deleteResumePortfolio.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //deleteResumeTraining
    builder.addCase(deleteResumeTraining.pending, (state, action) => {
      //    state.isLoading = true;
    });
    builder.addCase(deleteResumeTraining.fulfilled, (state, action) => {
      state.responseErrors = [];
      state.isLoading = false;
      // state.resume.training = action.payload;
    });
    builder.addCase(deleteResumeTraining.rejected, (state, action) => {
      state.responseErrors = [];
      state.responseErrors.push(action.payload);
      state.isLoading = false;
      console.log('Fail to get user data');
    });
  },
});

export const {
  updateResume,
  updateResumeKey,
  addLanguage,
  setLanguage,
  updateLanguage,
  deleteLanguage,
  addExperience,
  setExperience,
  updateExperience,
  deleteExperience,
  addCourse,
  updateCourse,
  deleteCourse,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
  addEducation,
  updateEducation,
  deleteEducation,
} = resumeSlice.actions;

export default resumeSlice.reducer;
