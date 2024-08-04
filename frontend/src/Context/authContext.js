import React, { createContext, useContext, useState } from 'react';
import { login as loginApi, register as registerApi } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const data = await loginApi(credentials);
      setUser({ username: credentials.username, token: data.access_token });
      localStorage.setItem('authToken', JSON.stringify(data.access_token)); // Store token as a string
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid username or password');
      } else {
        throw new Error('Login failed. Please try again later.');
      }
    }
  };

  const register = async (credentials) => {
    try {
      const data = await registerApi(credentials);
      setUser({ username: credentials.username, token: data.access_token });
      localStorage.setItem('authToken', JSON.stringify(data.access_token)); // Store token as a string
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.status === 409) {
        throw new Error('Username already exists');
      } else {
        throw new Error('Registration failed. Please try again later.');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
