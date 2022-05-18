import { environment } from "../../environments/environment";

const API_URLS = {
  CREATE_USER: environment.apiUrl + "/user/signup",
  SIGNOUT_USER: environment.apiUrl + "/user/singout",
  SIGNIN_USER: environment.apiUrl + "/user/signin",
  GET_USER: environment.apiUrl + "/user/getUser/",
  CREATE_REVIEW: environment.apiUrl + "/user/createReview",
  GET_REVIEW: environment.apiUrl + "/user/getReview",
  GET_CITY: environment.apiUrl + "/",
};

export default API_URLS;
