
import { Demo } from '@/types';
import axios from 'axios';


console.log('aqui');
export const AlunoService = {
  getProductsSmall() {
    return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.data as Demo.Product[]);
},

getAlunos() {
    return fetch('/demo/data/student.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.data as Demo.Product[]);
},

getProductsWithOrdersSmall() {
    return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => d.data as Demo.Product[]);
}
};
