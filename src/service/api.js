import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:5021'
});

api.interceptors.response.use(
    (response) => {
        if (response.data?.mensagem) {
            toast.success(response.data.mensagem);
        }

        return response;
    },

    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');

            toast.error('Sua sessão expirou. Faça login novamente.');

            window.location.href = '/login';

            return Promise.reject(error);
        }

        console.log('RESPOSTA DE ERRO COMPLETA:', error.response);

        const msgErro =
            error.response?.data?.erro ||
            error.response?.data?.error ||
            error.response?.data?.mensagem ||
            'Ocorreu um erro no servidor. Tente novamente mais tarde';

        toast.error(msgErro);

        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem('token') ||
            sessionStorage.getItem('token');

        if (token) {
            config.headers['x-access-token'] = token;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ===============================
// ESTRATÉGIAS
// ===============================

export async function listarEstrategias() {
    const resposta = await api.get('/estrategias');

    return resposta.data;
}

export async function criarEstrategia(titulo) {
    const resposta = await api.post('/estrategia', {
        titulo: titulo
    });

    return resposta.data;
}


// ===============================
// CONTATOS DE EMERGÊNCIA
// ===============================

export async function listarContatos() {
    const resposta = await api.get('/contatos');

    return resposta.data;
}

export async function adicionarContato(nome, telefone) {
    const resposta = await api.post('/contato', {
        nome: nome,
        telefone: telefone
    });

    return resposta.data;
}

export async function removerContato(id) {
    const resposta = await api.delete(`/contatos/${id}`);

    return resposta.data;
}


export default api;
