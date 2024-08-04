import React from 'react';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useAuth } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py="10" px="6">
      <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Profile
      </Heading>
      <Text fontSize="xl" mb="6">
        Username: {user?.username || 'Guest'}
      </Text>
      <Stack spacing={4} direction="row" justify="center" mb="6">
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => navigate('/start-stream')}
          variant="solid"
          boxShadow="md"
          _hover={{ boxShadow: 'lg' }}
        >
          Start Streaming
        </Button>
        <Button
          colorScheme="purple"
          size="lg"
          onClick={() => navigate('/view-streams')}
          variant="solid"
          boxShadow="md"
          _hover={{ boxShadow: 'lg' }}
        >
          View Streams
        </Button>
      </Stack>
    </Box>
  );
}

export default ProfilePage;
