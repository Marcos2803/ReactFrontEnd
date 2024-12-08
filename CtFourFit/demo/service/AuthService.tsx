import { Demo } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7069/api', // Base URL da API
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo
  },
});

export const UserService = {
  getUsers() {
      return api.get('/auth/buscarusuariosativos', {
          headers: { 'Cache-Control': 'no-cache' }
      })
      .then((response) => {
          console.log('Dados retornados pela API:', response.data);
          return response.data as Auth.User[];
      })
      .catch((error) => {
          console.error('Erro ao buscar usuários:', error);
          throw error;
      });
  },
};


