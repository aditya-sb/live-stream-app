// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; // Adjust to your API URL

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await axios.post(`${API_URL}/register`, credentials);
  return response.data;
};

export const fetchProtectedData = async () => {
    const response = await axios.get(`${API_URL}/protected-endpoint`); // Updated endpoint
    return response.data;
  };
