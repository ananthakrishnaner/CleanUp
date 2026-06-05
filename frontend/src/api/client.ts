import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Since we use Nginx as our gateway, all API calls go to /api
// In React Native Web running on localhost:3000, we point to localhost:80.
// In production, it would point to the real domain.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost/api';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default client;
