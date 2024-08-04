import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { fetchProtectedData } from '../api/auth';

function ProtectedDataPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchProtectedData();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch protected data', error);
      }
    };

    getData();
  }, []);

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading mb="6" textAlign="center" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Protected Data
      </Heading>
      {data ? (
        <Text>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}

export default ProtectedDataPage;
