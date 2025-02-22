import axios from 'axios';
import { getToken } from '../utils/tokenutils';

const api = axios.create({
    baseURL: import.meta.env.VITE_PROXY || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auth endpoints
export const authApi = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    
    register: async (userData: {
        name: string;
        email: string;
        phone: string;
        password: string;
    }) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    }
};

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
