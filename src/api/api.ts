import axios from 'axios';
import { getAuthState } from './auth';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
//const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://britinogn.onrender.com/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - attach token
api.interceptors.request.use(
    (config) => {
        const token = getAuthState().token || localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle errors & clean data
api.interceptors.response.use(
    (response) => response.data, // Return data directly
    (error) => {
        // 401: Clear auth & redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        // Extract friendly message
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

export default api;