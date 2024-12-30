import { useUserId } from './hooks/useUserId';

// const applicantId = '1';
// const employerId = '1';

//! нужна функция для автоапдейта индексов
//! или нужно передавать индекс как аргумент

// export const linkHrefCreateResume = `/applicant/${applicantId}/createResume`;
// //   = (applicantId) => {
// //   return `/applicant/${applicantId}/createResume`;
// // };

// export const linkHrefCreateVacancy = `/employer/${employerId}/createVacancy`;
// //   = (employerId) => {
// //   return `/employer/${employerId}/createVacancy`;
// // };

// export const linkHrefApplicantAccount = `/applicant/${applicantId}/account`;
// // = (applicantId) => {
// //   return `/applicant/${applicantId}/account`;
// // };

// export const linkHrefApplicantFav = `/applicant/${applicantId}/favorites`;
// //  = (applicantId) => {
// //   return `/applicant/${applicantId}/favorites`;
// // };

// export const linkHrefApplicantChat = `/applicant/${applicantId}/chat`;
// //   = (applicantId) => {
// //   return `/applicant/${applicantId}/chat`;
// // };

// export const linkHrefApplicantAboutEmployersVacancies = `/applicant/${applicantId}/chat/aboutEmployer/employerVacancies`;
// //   = (applicantId) => {
// //   return `/applicant/${applicantId}/chat/aboutEmployer/employerVacancies`;
// // };

// export const linkHrefApplicantAboutEmployer = `/applicant/${applicantId}/chat/aboutEmployer`;
// // = (applicantId) => {
// //   return `/applicant/${applicantId}/chat/aboutEmployer`;
// // };

// export const linkHrefEmployerAccount = `/employer/${employerId}/account`;
// // = (employerId) => {
// //   return `/employer/${employerId}/account`;
// // };

// export const linkHrefEmployerChat = `/employer/${employerId}/chat`;
// //   = (employerId) => {
// //   return `/employer/${employerId}/chat`;
// // };

// export const linkHrefVacancies = `/vacancies`;

// export const linkHrefResumes = `/resumes`;

// export const linkHrefVacanciesFilter = `/vacancies/filter`;

// export const linkHrefResumesFilter = `/resumes/filter`;

const applicantId = useUserId('access_token');
const employerId = useUserId('access_token');
class UrlBuilder {
  constructor(baseSegment, id) {
    this.baseSegment = baseSegment;
    this.id = id;
  }

  createPath(endpoint) {
    // return `/${this.baseSegment}/${this.id}/${endpoint}`.replace(/\/+/g, '/');
    return `/${this.baseSegment}/${endpoint}`.replace(/\/+/g, '/');
  }

  static createStaticPath(path) {
    return `/${path}`.replace(/\/+/g, '/');
  }
}

class ApplicantUrls extends UrlBuilder {
  constructor(applicantId) {
    super('applicant', applicantId);
  }

  get createResume() {
    return this.createPath('createResume');
  }
  get account() {
    return this.createPath('account');
  }
  get favorites() {
    return this.createPath('favorites');
  }
  get chat() {
    return this.createPath('chat');
  }
}

class EmployerUrls extends UrlBuilder {
  constructor(employerId) {
    super('employer', employerId);
  }

  get createVacancy() {
    return this.createPath('createVacancy');
  }
  get account() {
    return this.createPath('account');
  }
  get chat() {
    return this.createPath('chat');
  }
  get editVacancy() {
    return this.createPath('account/vacancy/edit');
  }
  get vacancy() {
    return this.createPath('account/vacancy');
  }
}

const applicantUrls = new ApplicantUrls(applicantId);
const employerUrls = new EmployerUrls(employerId);

const staticUrls = {
  vacancies: UrlBuilder.createStaticPath('vacancies'),
  resumes: UrlBuilder.createStaticPath('resumes'),
  vacanciesFilter: UrlBuilder.createStaticPath('vacancies/filter'),
  resumesFilter: UrlBuilder.createStaticPath('resumes/filter'),
  aboutEmployer: UrlBuilder.createStaticPath('aboutEmployer'),
  aboutEmployersVacancies: UrlBuilder.createStaticPath(
    'aboutEmployer/employerVacancies'
  ),
};

export const {
  createResume: linkHrefCreateResume,
  account: linkHrefApplicantAccount,
  favorites: linkHrefApplicantFav,
  chat: linkHrefApplicantChat,
} = applicantUrls;

export const {
  createVacancy: linkHrefCreateVacancy,
  account: linkHrefEmployerAccount,
  chat: linkHrefEmployerChat,
  editVacancy: linkHrefEditVacancy,
  vacancy: linkHrefAccountVacancy,
} = employerUrls;

export const {
  vacancies: linkHrefVacancies,
  resumes: linkHrefResumes,
  vacanciesFilter: linkHrefVacanciesFilter,
  resumesFilter: linkHrefResumesFilter,
  aboutEmployer: linkHrefApplicantAboutEmployer,
  aboutEmployersVacancies: linkHrefApplicantAboutEmployersVacancies,
} = staticUrls;
