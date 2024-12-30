import { useCookie } from "@/hooks/useCookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { path } from "./path";
import { useFormatePhone } from "@/hooks/useFormatePhone";

const ACCESS_TOKEN = useCookie("access_token");

//Отправка всех данных, указанных в резюме
// export const postApplicantDetail = createAsyncThunk(
//   "resumeApi/postApplicantDetail",
//   async (user_id, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/resume/detail/${user_id}/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(applicantDetail),
//       });
//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log("Error response:", errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const applicantDetail = await response.json();
//       console.log(response, applicantDetail);
//       return applicantDetail;
//     } catch (error) {
//       console.error("Get detail error:", error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );

// Отправка 1 обЪекта с образованием в резюме
// export const postApplicantEducation = createAsyncThunk(
//   "resumeApi/education",
//   async (applicantEducation, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/resume/education/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           applicantEducation,
//           // education_level: '',
//           // institute_name: '',
//           // faculty: '',
//           // profession:	'',
//           // education_end_year: null,
//           // resume: null,
//         }),
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log("Error response:", errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const responseApplicantEducation = await response.json();
//       console.log(response, responseApplicantEducation);
//       return responseApplicantEducation;
//     } catch (error) {
//       console.error("Registration error:", error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );

//  Отправка 1 объекта с  опытом в резюме
// export const postApplicantExperience = createAsyncThunk(
//   "resumeApi/experience",
//   async (applicantExperience, thunkAPI) => {
//     try {
//       const response = await fetch(`${path}/resume/experience /`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           applicantExperience,
//           // responsibility: applicantExperience.responsibilities,
//           // achievements: applicantExperience.achievements,
//           // start_month: applicantExperience.startMonth,
//           // start_year: applicantExperience.startYear,
//           // end_month: applicantExperience.endMonth,
//           // end_year: applicantExperience.endYear,
//           // to_date: applicantExperience.presenttime,
//           // company_name: applicantExperience.company_name,
//           // profession: applicantExperience.profession,
//           // resume: resumeId,
//         }),
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log("Error response:", errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const responseApplicantExperience = await response.json();
//       console.log(response, responseApplicantExperience);
//       return responseApplicantExperience;
//     } catch (error) {
//       console.error("Registration error:", error);
//       return thunkAPI.rejectWithValue({ message: error.message });
//     }
//   }
// );

//  Отправка 1 объекта "резюме" в резюме (возвращает id резюме?)
export const postApplicantResume = createAsyncThunk(
  "resumeApi/resume",
  async (applicantResume, thunkAPI) => {
    try {
      const response = await fetch(`${path}/resume/resume/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          ResumeCreate: {
            schedule: applicantResume.page1.schedule, //стр 1!
            work_format: applicantResume.page1.format, //стр 1!
            about_self: applicantResume.page6.personalInfo, //стр 6!  
            job_title: applicantResume.page1.profession, //стр 1!
            salary: Number(applicantResume.page1.salary), //стр 1!     //меняем String на Number!
            sex: applicantResume.page2.sex, //стр 2!
            city: applicantResume.page2.city, //стр 2!
            remote_is_available:
              applicantResume.page2.remoteWork === //стр 2!      //меняем String на Boolean!
              "Показывать только год рождения"
                ? true
                : false,
            birth_date: applicantResume.page2.birthDate, //стр 2!
            only_year:
              applicantResume.page2.showOnlyYear === "Можно удалённо" //стр 2!     //меняем String на Boolean!
                ? true
                : false,
            no_experience:
              applicantResume.page3.noExperience === "Без опыта" //стр 3!
                ? true
                : false,
            photo: '',
          },
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseApplicantResume = await response.json();
      console.log(response, responseApplicantResume);
      return responseApplicantResume;
    } catch (error) {
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const initialState = {
   postApplicantResume: {
      ResumeCreate: {
         id: null,
         schedule: [],
         work_format: [],
         about_self: '',
         job_title: '', 
         salary: null, 
         sex: '', 
         city: '', 
         remote_is_available: false,
         birth_date: '',
         only_year: false,
         no_experience: false,
         date_of_creation: '',
         applicant: '',
         photo: '',
       },
   },
  education: {
    education_level: null,
    institute_name: "",
    faculty: "",
    profession: "",
    education_end_year: null,
    resume: null,
  },
  experience: {
    responsibility: "",
    achievements: "",
    start_month: null,
    start_year: null,
    end_month: null,
    end_year: null,
    to_date: false,
    company_name: "",
    profession: "",
    resume: null,
  },
  language: {
    language: null,
    language_level: null,
    resume: null,
  },
  portfolio: {
    portfolio_description: "",
    portfolio_link: "",
    resume: null,
  },
  resumeCreate: {
    schedule: [],
    work_format: [],
    about_self: "",
    job_title: "",
    salary: null,
    sex: "",
    city: "",
    remote_is_available: false,
    birth_date: "",
    only_year: false,
    no_experience: false,
  },
  training: {
    institute_name: "",
    faculty: "",
    profession: "",
    training_end_year: null,
    resume: null,
  },
  ResumeDetail: {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    experience: [],
    education: [],
    language: [],
    training: [],
    portfolio: [],
    job_title: "",
    salary: null,
    schedule: "",
    work_format: "",
    sex: "",
    city: "",
    remote_is_available: false,
    birth_date: "",
    only_year: false,
    photo: "",
    no_experience: false,
    about_self: "",
    date_of_creation: "",
  },
};

const resumeApiSlice = createSlice({
  name: "resumeApi",
  initialState,
  reducers: {
    updateEducation: (state, action) => {},
    updateExperience: (state, action) => {},
  },
  extraReducers: (builder) => {
   //  //! post applicant Detail
   //  builder.addCase(postApplicantDetail.fulfilled, (state, action) => {
   //    console.log("Post Applicant Detail");
   //  });
   //  builder.addCase(postApplicantDetail.rejected, (state, action) => {
   //    console.log("Fetch error to Post Applicant Detail", action.payload);
   //  });
    //! post applicant Resume
    builder.addCase(postApplicantResume.fulfilled, (state, action) => {
      console.log("Post Applicant Resume");
    });
    builder.addCase(postApplicantResume.rejected, (state, action) => {
      console.log("Fetch error to Post Applicant Resume", action.payload);
    });
  },
});

export const { updateEducation, updateExperience } = resumeApiSlice.actions;

export default resumeApiSlice.reducer;
