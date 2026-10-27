import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:5021'
});

api.interceptors.response.use(
    (response) => {
        if (response.data?.mensagem) {
                toast.success(response.data.mensagem)
        }
        return response;
    }, 
    (error) => {
        console.log('RESPOSTA DE ERRO COMPLETA:', error.response);
        const msgErro =
        error.response?.data?.erro ||   
        error.response?.data?.error || 
        error.response?.data?.mensagem ||
        'Ocorreu um erro no servidor. Tente novamente mais tarde';

        toast.error(msgErro);
        return Promise.reject(error)
    }
);

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