import React, { useState } from 'react';
import { Box, Button, Input, Stack, Heading, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { useAuth } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const { register } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(credentials);
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
      setError(error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading mb="6" textAlign="center" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!error}>
            <FormLabel>Username</FormLabel>
            <Input 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={handleChange} 
              isInvalid={!!error} 
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              isInvalid={!!error} 
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
          <Button type="submit" colorScheme="purple">Sign Up</Button>
        </Stack>
      </form>
      <Button mt="4" variant="link" onClick={() => navigate('/login')}>
        Already have an account? Login
      </Button>
    </Box>
  );
}

export default SignupPage;
