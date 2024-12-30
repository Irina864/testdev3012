'use client';
import { configureStore } from '@reduxjs/toolkit';

import accountUserSlice from './API/accountUserSlice';
import autorizationAndRegistrationSlice from './API/autorizationAndRegistrationSlice';
import restorePasswordSlice from './API/restorePasswordSlice';
import resumeApiSlice from './API/resumeApiSlice';
import resumeSlice from './API/resumeSlice';
import vacanciesSlice from './API/vacanciesSlice';
import CompanyVacanciesSlice from './CompanyVacanciesSlice';
import aboutSlice from './aboutSlice';
import accountApplicantDataSlice from './accountApplicantDataSlice';
import accountEmployerDataSlice from './accountEmployerDataSlice';
import addressSlice from './addressSlice';
import applicantCardSlice from './applicantCardSlice';
import authorizationSlice from './authorizationSlice';
import calendarSlice from './calendarSlice';
import UserChatsSlice from './chatsSlice';
import cityAndRegionSlice from './cityAndRegionSlice';
import educationPlaceSlice from './educationPlaceSlice';
import favPageSlice from './favPageSlice';
import formDataSlice from './formDataSlice';
import formSlice from './formSlice';
import headerSlice from './headerSlice';
import languageSlice from './languageSlice';
import modalSlice from './modalSlice';
import modeSlice from './modeSlice';
import pageSlice from './pageSlice';
import pageReducer from './pageSliceAccount';
import progressSlice from './progressSlice';
import registrationSlice from './registrationSlice';
import resumeDataSlice from './resumeDataSlice';
import vacancyDataReducer from './vacancyDataSlice';
import workPlaceSlice from './workPlaceSlice';
import chatsAndMessagesSlice from './API/chatsSlice';
import reactionsSlice from './API/reactionSlice';
import filterSlice from './filterSlice';
import navigationSlice from './navigationSlice';

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    authorization: authorizationSlice,
    restorePassword: restorePasswordSlice,
    page: pageSlice,
    progress: progressSlice,
    modal: modalSlice,
    about: aboutSlice,
    form: formSlice,
    workPlace: workPlaceSlice,
    educationPlace: educationPlaceSlice,
    formData: formDataSlice,
    calendar: calendarSlice,
    resumeData: resumeDataSlice,
    vacancyData: vacancyDataReducer,
    addresses: addressSlice,
    accountApplicantData: accountApplicantDataSlice,
    accountEmployerData: accountEmployerDataSlice,
    // page: pageReducer,
    header: headerSlice,
    pageSave: pageReducer,
    companyVacancies: CompanyVacanciesSlice,
    citiesAndRegions: cityAndRegionSlice,

    favPage: favPageSlice,
    userChats: UserChatsSlice,

    registration: registrationSlice,
    autorizationAndRegistration: autorizationAndRegistrationSlice,
    accountUser: accountUserSlice,

    // resumeApi: resumeApiSlice,
    vacancies: vacanciesSlice,
    language: languageSlice,
    resume: resumeSlice,
    chats: chatsAndMessagesSlice,
    reaction: reactionsSlice,

    resumeCard: applicantCardSlice,
    filter: filterSlice,
    navigation: navigationSlice,
  },

  devTools: true,
});

export default store;
