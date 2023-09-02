import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});

console.log(import.meta.env.VITE_REACT_APP_API_URL);
console.log(import.meta.env.VITE_REACT_APP_API_KEY);

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
