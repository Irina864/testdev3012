import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const nominatimUrl = 'https://nominatim.openstreetmap.org/search';

export const getCityandRegionData = createAsyncThunk(
  'citiesAndRegions/getCityandRegionData',
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
        `${nominatimUrl}?q=${encodeURIComponent(
          query
        )}&format=json&countrycodes=ru&limit=100&layer=address&featureType=state,city,settlement`,
        {
          method: 'GET',
          headers: {
            'Accept-Language': 'ru',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Raw data from API:', data);
        return data;
        // const filteredData = data.map((item, index) => {
        //   console.log('Processing item:', item);
        //   let type;
        //   if (item.type === 'state' || item.type === 'administrative') {
        //     type = 'region';
        //   } else if (item.type === 'city' || item.type === 'town') {
        //     type = 'city';
        //   } else if (item.type === 'village') {
        //     type = 'village';
        //   } else {
        //     type = 'settlement';
        //   }
        //   return {
        //     id: index,
        //     name: item.name,
        //     type: type,
        //   };
        // });

        // console.log('Filtered data:', filteredData);

        // if (filteredData.length === 0) {
        //   console.log('No results found after filtering');
        //   return { message: 'Не найдено подходящих результатов', data: [] };
        // }

        // return filteredData;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error in API call:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  userText: '',
  isLoading: false,
  error: null,
};

const cityAndRegionSlice = createSlice({
  name: 'citiesAndRegions',
  initialState,
  reducers: {
    updateUserText: (state, action) => {
      state.userText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityandRegionData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCityandRegionData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else {
          state.data = [];
          state.error = action.payload.message;
        }
      })
      .addCase(getCityandRegionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateUserText } = cityAndRegionSlice.actions;

export default cityAndRegionSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const nominatimUrl = 'https://nominatim.openstreetmap.org/search';

// export const getCityandRegionData = createAsyncThunk(
//   'citiesAndRegions/getCityandRegionData',
//   async (query, thunkAPI) => {
//     try {
//       const response = await fetch(
//         `${nominatimUrl}?q=${encodeURIComponent(
//           query
//         )}&format=json&countrycodes=ru&limit=50&layer=address`,
//         {
//           method: 'GET',
//           headers: {
//             'Accept-Language': 'ru',
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Raw data from API:', data);

//         const filteredData = data
//           .filter(
//             (item) =>
//               item.type === 'city' ||
//               item.type === 'state' ||
//               item.type === 'town' ||
//               item.type === 'village' ||
//               item.type === 'administrative' ||
//               item.type === 'hamlet' ||
//               item.type === 'suburb'
//           )
//           .map((item) => {
//             console.log('Processing item:', item);
//             return {
//               name: item.display_name.split(',')[0],
//               region: item.address.state || item.address.region || '',
//               type: item.type === 'state' ? 'region' : 'city',
//               lat: item.lat,
//               lon: item.lon,
//             };
//           });

//         console.log('Filtered data:', filteredData);

//         if (filteredData.length === 0) {
//           console.log('No results found after filtering');
//           return { message: 'Не найдено подходящих результатов', data: [] };
//         }

//         return filteredData;
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('Error in API call:', error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   data: [],
//   userText: '',
//   isLoading: false,
//   error: null,
// };

// const cityAndRegionSlice = createSlice({
//   name: 'citiesAndRegions',
//   initialState,
//   reducers: {
//     updateUserText: (state, action) => {
//       state.userText = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCityandRegionData.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getCityandRegionData.fulfilled, (state, action) => {
//         state.isLoading = false;
//         if (Array.isArray(action.payload)) {
//           state.data = action.payload;
//         } else {
//           state.data = [];
//           state.error = action.payload.message;
//         }
//       })
//       .addCase(getCityandRegionData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { updateUserText } = cityAndRegionSlice.actions;

// export default cityAndRegionSlice.reducer;

// второй вариант
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const nominatimUrl = 'https://nominatim.openstreetmap.org/search';

// export const getCityandRegionData = createAsyncThunk(
//   'citiesAndRegions/getCityandRegionData',
//   async (query, thunkAPI) => {
//     try {
//       // Разбиваем запрос на части для структурированного поиска
//       const [cityOrRegion, country = 'Россия'] = query.split(',').map(item => item.trim());

//       const params = new URLSearchParams({
//         format: 'json',
//         countrycodes: 'ru',
//         limit: '50',
//         'accept-language': 'ru',
//         city: cityOrRegion,
//         state: cityOrRegion,
//         country: country
//       });

//       const response = await fetch(`${nominatimUrl}?${params}`, {
//         method: 'GET',
//         headers: {
//           'Accept-Language': 'ru',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Raw data from API:', data);

//         const filteredData = data.map(item => {
//           console.log('Processing item:', item);
//           let type;
//           if (item.type === 'state' || item.type === 'administrative' || item.class === 'boundary' && item.type === 'administrative') {
//             type = 'region';
//           } else if (item.type === 'city' || item.type === 'town') {
//             type = 'city';
//           } else {
//             type = 'settlement';
//           }
//           return {
//             name: item.display_name.split(',')[0],
//             region: item.address.state || item.address.region || '',
//             type: type,
//             lat: item.lat,
//             lon: item.lon
//           };
//         });

//         console.log('Filtered data:', filteredData);

//         if (filteredData.length === 0) {
//           console.log('No results found after filtering');
//           return { message: 'Не найдено подходящих результатов', data: [] };
//         }

//         return filteredData;
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('Error in API call:', error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   data: [],
//   userText: '',
//   isLoading: false,
//   error: null,
// };

// const cityAndRegionSlice = createSlice({
//   name: 'citiesAndRegions',
//   initialState,
//   reducers: {
//     updateUserText: (state, action) => {
//       state.userText = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCityandRegionData.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getCityandRegionData.fulfilled, (state, action) => {
//         state.isLoading = false;
//         if (Array.isArray(action.payload)) {
//           state.data = action.payload;
//         } else {
//           state.data = [];
//           state.error = action.payload.message;
//         }
//       })
//       .addCase(getCityandRegionData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { updateUserText } = cityAndRegionSlice.actions;

// export default cityAndRegionSlice.reducer;
