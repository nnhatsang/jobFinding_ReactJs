import axios from "axios";
import cookies from "react-cookies";

export let endpoints = {
  users: "/users/",
  register: "/users/",
  "user-id": (userId) => `/users/${userId}/`,
  current_user: "/users/current_user/",
  oauth2_info: "/oauth2_info/",
  login: "/o/token/",

  cities: "/cities/",

  addJob: "/jobs/create_job/",

  jobs: "/jobs/",
  jobDetail: (jobId) => `/jobs/${jobId}/`,
  jobCompany: (companiesId) => `/companies/${companiesId}/jobs/`,

  companies: "/companies/",
  companyDetail: (companiesId) => `/companies/${companiesId}/`,

  userApplication: `/users/list_applications/`,
  applicationDetail: (applicationsId) => `/applications/${applicationsId}/`,

  blogs: "/blogs/",

  "blogs-views": (blogId) => `/blogs/${blogId}/views/`,
  blogdetail: (blogId) => `/blogs/${blogId}/`,

  //fillter
  fillter: "/fillter/",

  "comment-company": (companiesId) => `companies/${companiesId}/comments/`,
  "company-comment": `/comments/`,

  //kt role
  checkAccess: (role) => `/check-access?role=${role}`,

  userCV: "/users/list_cvs/",
  cvDetail: (cvId) => `/cvs/${cvId}/`,
  createCV: "/cvs/create_cv/",

  createApplication: "/applications/create_application/",
  regisCompany: "/companies/",
  // for company
  user_company: "/user_company/",

  user_company_list_job: (companiesId) =>
    `/user_company/${companiesId}/list_jobs/`,

  user_company_list_job_by_application: (companiesId) =>
    `/user_company/${companiesId}//user_company/{id}/list_jobs_by_application/`,
};

export const authAxios = () =>
  axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${cookies.load("access_token")}`,
    },
  });

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
