import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para log de requests
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de responses
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const usuarioService = {
  login: (cpf, nome) => api.post('/usuarios/login', { cpf, nome }),
  buscarUsuario: (cpf) => api.get(`/usuarios/${cpf}`),
  consultarPontos: (cpf) => api.get(`/usuarios/${cpf}/pontos`),
  obterRanking: () => api.get('/usuarios/ranking'),
};

export const reciclagemService = {
  registrar: (cpf, tipoResiduo, peso) => 
    api.post('/reciclagem/registrar', { cpf, tipoResiduo, peso }),
  consultarHistorico: (cpf) => api.get(`/reciclagem/historico/${cpf}`),
  trocarPontos: (cpf) => api.post('/reciclagem/trocar-pontos', { cpf }),
  obterTabelaPontuacao: () => api.get('/reciclagem/pontuacao'),
  obterTiposResiduo: () => api.get('/reciclagem/tipos-residuo'),
};

export default api;