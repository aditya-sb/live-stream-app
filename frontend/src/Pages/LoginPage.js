import React, { useState } from 'react';
import { Box, Button, Input, Stack, Heading, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { useAuth } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/profile');
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed: ' + (error.response?.data?.message || 'Invalid username or password'));
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading mb="6" textAlign="center" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!error}>
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="teal">Login</Button>
        </Stack>
      </form>
      <Button mt="4" variant="link" onClick={() => navigate('/signup')}>
        Don't have an account? Sign Up
      </Button>
    </Box>
  );
}

export default LoginPage;
