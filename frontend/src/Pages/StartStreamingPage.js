import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Image, Stack, useToast, Heading } from '@chakra-ui/react';
import { useAuth } from '../Context/authContext';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const StartStreamingPage = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const iceCandidatesRef = useRef([]);
  const toast = useToast();

  useEffect(() => {
    if (showWebcam) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
          toast({
            title: 'Error',
            description: 'Could not access webcam',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [showWebcam, toast]);

  useEffect(() => {
    socket.on('ice-candidate', ({ candidate }) => {
      peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('answer', async ({ answer }) => {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    return () => {
      socket.off('ice-candidate');
      socket.off('answer');
    };
  }, []);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleShowWebcam = () => {
    setShowWebcam(true);
  };

  const handleStartStreaming = async () => {
    const stream = videoRef.current.srcObject;
    peerConnectionRef.current = new RTCPeerConnection();

    stream.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, stream);
    });

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, peerId: peerConnectionRef.current.peerId });
      }
    };

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    socket.emit('start-stream', {
      offer,
      title,
      thumbnail,
      username: user.username,
    });

    setStreaming(true);
  };

  const handleStopStreaming = () => {
    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach(track => track.stop());
    peerConnectionRef.current.close();
    setStreaming(false);
    setShowWebcam(false);
    socket.emit('stop-stream');
  };

  return (
    <Box textAlign="center" py="10" px={{ base: "4", md: "6" }}>
      <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        Start Streaming
      </Heading>
      {!showWebcam ? (
        <Stack spacing="4">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl id="thumbnail">
            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            {thumbnail && <Image src={thumbnail} alt="Thumbnail Preview" boxSize="150px" mt="2" />}
          </FormControl>
          <Button colorScheme="blue" onClick={handleShowWebcam}>
            Show Webcam
          </Button>
        </Stack>
      ) : (
        <Box>
          <video
            autoPlay
            muted
            ref={videoRef}
            style={{
              width: '100%', borderRadius: 'md'
            }}
          />
          {!streaming ? (
            <Button colorScheme="green" mt="4" onClick={handleStartStreaming}>
              Start Streaming
            </Button>
          ) : (
            <Button colorScheme="red" mt="4" onClick={handleStopStreaming}>
              Stop Streaming
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default StartStreamingPage;
