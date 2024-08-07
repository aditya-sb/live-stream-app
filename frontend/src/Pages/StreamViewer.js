import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const STREAM_SERVER_URL = 'http://localhost:3001';

const StreamViewer = () => {
  const { streamId } = useParams();
  const videoRef = useRef(null);
  const socket = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    socket.current = io(STREAM_SERVER_URL);

    socket.current.emit('request-stream', { peerId: streamId });

    socket.current.on('offer', async ({ offer, id }) => {
      peerConnectionRef.current = new RTCPeerConnection();

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit('ice-candidate', { candidate: event.candidate, peerId: id });
        }
      };

      peerConnectionRef.current.ontrack = (event) => {
        videoRef.current.srcObject = event.streams[0];
      };

      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socket.current.emit('answer', { answer, peerId: id });
    });

    socket.current.on('ice-candidate', ({ candidate }) => {
      peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.current.disconnect();
      peerConnectionRef.current?.close();
    };
  }, [streamId]);

  return (
    <div>
      <video
        autoPlay
        ref={videoRef}
        style={{ width: '100%', borderRadius: 'md', backgroundColor: '#000' }}
      />
    </div>
  );
};

export default StreamViewer;
