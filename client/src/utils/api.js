import axios from 'axios';
import { showToast } from './toast';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const language = localStorage.getItem('ip-rmt60-language') || 'id';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = language;
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...(config.params || {}),
        lang: config.params?.lang ?? language
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    const message = error.response?.data?.message || 'An error occurred';
    showToast.error(message);
    if (error.response) {
      // Server responded with a status code outside of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized (e.g. redirect to login)
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // Optional: Redirect to login page
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
