import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const register = (formData) => API.post('/register', formData);
export const login = (formData) => API.post('/login', formData);
export const getUser = () => API.get('/profile');
export const updateUser = (formData) => API.put('/profile', formData);

export const getContacts = () => API.get('/contacts');
export const createContact = (contactData) => API.post('/contacts', contactData);
export const updateContact = (id, contactData) => API.put(`/contacts/${id}`, contactData);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
