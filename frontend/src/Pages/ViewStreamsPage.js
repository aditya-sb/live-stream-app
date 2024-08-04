import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, Text, Image } from '@chakra-ui/react';
import io from 'socket.io-client';
import { useAuth } from '../Context/authContext';

const socket = io('http://localhost:3001');

function ViewStreamsPage() {
  const { user } = useAuth();
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    if (!user) {
      alert('Please log in to view streams');
      return;
    }

    socket.on('stream', (data) => {
      setStreams((prevStreams) => [...prevStreams, data]);
    });

    return () => {
      socket.off('stream');
    };
  }, [user]);

  return (
    <Box textAlign="center" py="10" px="6">
      <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        View Streams
      </Heading>
      <Stack spacing={4}>
        {streams.map((stream, index) => (
          <Box key={index} borderWidth="1px" borderRadius="md" overflow="hidden">
            {stream.thumbnail && <Image src={stream.thumbnail} alt="Stream Thumbnail" mb="2" />}
            <Box p="4">
              <Text fontWeight="bold">{stream.title}</Text>
              <Text>By: {stream.username}</Text>
            </Box>
            <video
              srcObject={stream.data}
              autoPlay
              controls
              style={{ width: '100%' }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default ViewStreamsPage;
