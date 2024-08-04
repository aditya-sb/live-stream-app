import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { AuthProvider } from './Context/authContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ChakraProvider>
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
</ChakraProvider>);


