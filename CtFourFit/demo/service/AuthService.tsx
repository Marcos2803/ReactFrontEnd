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
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((response) => {
        return response.data as Auth.User[];
      })
      .catch((error) => {
        throw error;
      });
  },

  // Criar usuário
  createUser(userData: Auth.User) {
    return api.post('/auth/register', userData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
        throw error;
      });
  },

  // Atualizar usuário
  updateUser(userId: string, updatedData: Partial<Auth.User>) {
    return api.put(`/auth/atualizarusuario/${userId}`, updatedData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  // Deletar usuário
  deleteUser(userId: string) {
    return api.delete(`/auth/deletarusuario/${userId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};


