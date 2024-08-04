import React, { useState, useRef } from 'react';
import { Box, Button, Heading, Input, FormControl, FormLabel, Image } from '@chakra-ui/react';
import io from 'socket.io-client';
import { useAuth } from '../Context/authContext';

const socket = io('http://localhost:3001');

function StartStreamingPage() {
  const { user } = useAuth();
  const [streaming, setStreaming] = useState(false);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const videoRef = useRef(null);

  const handleStream = async () => {
    if (!user) {
      alert('Please log in to start streaming');
      return;
    }

    if (streaming) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        socket.emit('stream', { data: e.data, title, thumbnail, username: user.username });
      };
      mediaRecorder.start(100);
    }
    setStreaming(!streaming);
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(URL.createObjectURL(file));
  };

  return (
    <Box textAlign="center" py="10" px="6">
      <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Start Streaming
      </Heading>
      <FormControl mb="4">
        <FormLabel>Stream Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Stream Thumbnail</FormLabel>
        <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
      </FormControl>
      {thumbnail && <Image src={thumbnail} alt="Thumbnail" mb="4" />}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', marginBottom: '10px' }} />
      <Button colorScheme={streaming ? 'red' : 'green'} onClick={handleStream} size="lg" variant="solid">
        {streaming ? 'Stop Streaming' : 'Start Streaming'}
      </Button>
    </Box>
  );
}

export default StartStreamingPage;
