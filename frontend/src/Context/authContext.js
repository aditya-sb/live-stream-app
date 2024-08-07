import React, { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    const authTokenString = localStorage?.getItem('authToken');
    const authToken = JSON.parse(authTokenString);
    const token = authToken?.access_token;
    if (token) {
      try {
        const decodedToken = decodeJwt(token);
        setUser({ token: token, ...decodedToken });
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const decodeJwt = (token) => {
    const base64Payload = token.split('.')[1];
    const payload = decodeURIComponent(atob(base64Payload).split('').map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(payload);
  };

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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
