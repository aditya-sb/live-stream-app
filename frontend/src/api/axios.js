import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

instance.interceptors.request.use((config) => {
  const authTokenString = localStorage?.getItem('authToken');
const authToken = JSON.parse(authTokenString);
const token = authToken?.access_token;
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
