
import { Demo } from '@/types';
import axios from 'axios';

export const UsersService = {
  getUsers() {
    return fetch('/demo/data/auth.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.data as Auth.User[]);
},


};
