import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, Text, Image, useToast, Center, Spinner } from '@chakra-ui/react';
import { useAuth } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';
import StreamViewer from './StreamViewer';

function ViewStreamsPage() {
  const { user } = useAuth();
  const [streams, setStreams] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast({
        title: 'Please log in to view streams.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const fetchStreams = async () => {
      try {
        const response = await fetch('http://localhost:3001/streams');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStreams(data);
      } catch (error) {
        console.error('Error fetching streams', error);
        toast({
          title: 'Error fetching streams.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchStreams();
  }, [user, toast]);

  const handleStreamClick = (streamId) => {
    navigate(`/stream/${streamId}`);
  };

  return (
    <Box textAlign="center" py="10" px={{ base: '4', md: '6' }}>
      <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        View Streams
      </Heading>
      <Stack spacing="8">
        {streams.length > 0 ? (
          streams.map((stream) => (
            <Box
              key={stream.id}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              bg="white"
              boxShadow="sm"
              p="4"
              onClick={() => handleStreamClick(stream.id)}
              _hover={{ cursor: 'pointer', bg: 'gray.100' }}
            >
              {stream.thumbnail && <Image src={stream.thumbnail} alt="Stream Thumbnail" mb="2" borderRadius="md" boxSize="150px" objectFit="cover" />}
              <Box p="4">
                <Text fontWeight="bold" fontSize="lg">{stream.title}</Text>
                <Text fontSize="sm" color="gray.600">By: {stream.username}</Text>
              </Box>
              {/* <StreamViewer streamId={stream.id} /> */}
            </Box>
          ))
        ) : (
          <Center>
            <Spinner size="xl" />
            <Text fontSize="xl" mt={4}>No streams available at the moment.</Text>
          </Center>
        )}
      </Stack>
    </Box>
  );
}

export default ViewStreamsPage;
