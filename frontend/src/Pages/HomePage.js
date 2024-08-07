// src/Pages/HomePage.js
import React from 'react';
import { Box, Button, Heading, Text, Stack, Icon } from '@chakra-ui/react';
import { FiEye, FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import StreamPlayer from '../Components/StreamPlayer';

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken');

  return (
    <Box textAlign="center" py="10" px="6">
      <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Welcome to the Live Streaming Platform
      </Heading>
      <Text fontSize="xl" mb="6">
        Stream your passion, connect with viewers, and take your content to the next level.
      </Text>
      <Stack direction="row" spacing={4} justify="center">
        {!isLoggedIn ? (
          <>
            <Button colorScheme="teal" onClick={() => navigate('/login')}>Login</Button>
            <Button colorScheme="purple" onClick={() => navigate('/signup')}>Signup</Button>
          </>
        ) : (
          <>
            <Stack direction="row" spacing={4} justify="center">
              <Button colorScheme="purple" onClick={() => navigate('/start-stream')}>
                Start Streaming
              </Button>
            </Stack>
            {/* <StreamPlayer /> */}
          </>
        )}
      </Stack>
    </Box>
  );
}

export default HomePage;

