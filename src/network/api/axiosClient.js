// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { BASE_URL } from '../constant';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config for the full list of configs
const axiosClient = axios.create({
  // baseURL:
  //   process.env.REACT_APP_API_URL || 'https://js-post-api.herokuapp.com/api',
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    // 'x-access-tokent' :'nahojdpID[y820`0-`4-`4=ndljpo`'
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    // Handle errors
    throw error;
  },
);
export default axiosClient;
