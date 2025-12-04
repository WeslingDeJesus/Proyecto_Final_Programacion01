import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7081'
});

export function setToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('tb_token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('tb_token');
  }
}

export function loadTokenFromStorage() {
  const t = localStorage.getItem('tb_token');
  if (t) setToken(t);
}

export default api; 