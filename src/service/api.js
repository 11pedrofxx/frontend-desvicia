import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5021'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;