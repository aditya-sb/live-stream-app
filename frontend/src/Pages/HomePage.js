// src/Pages/HomePage.js
import React from 'react';
import { Box, Button, Heading, Text, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py="10" px="6">
      <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Welcome to the Home Page
      </Heading>
      <Text fontSize="xl" mb="6">
        This is the main landing page of your application.
      </Text>
      <Stack direction="row" spacing={4} justify="center">
        <Button colorScheme="teal" onClick={() => navigate('/login')}>Login</Button>
        <Button colorScheme="purple" onClick={() => navigate('/signup')}>Signup</Button>
      </Stack>
    </Box>
  );
}

export default HomePage;
