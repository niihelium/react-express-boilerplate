import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Axios instance for authenticated requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (username, password) =>
  api.post('/auth/register', { username, password });

export const loginUser = (username, password) =>
  api.post('/auth/login', { username, password });

export const getNotes = () => api.get('/notes');
export const createNote = (title, content) => api.post('/notes', { title, content });
export const getNoteById = id => api.get(`/notes/${id}`);
