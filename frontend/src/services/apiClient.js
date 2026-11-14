import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 15000,
});

export const getApiError = (error, fallback = 'Something went wrong. Please try again.') => {
  if (!error.response) return error.code === 'ECONNABORTED' ? 'The request timed out. Please try again.' : 'Unable to connect to TechMart. Please check your connection.';
  return error.response.data?.message || error.response.data?.errMessage || fallback;
};

export default apiClient;
