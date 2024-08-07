// import React, { useEffect, useState, useRef } from 'react';
// import { Box, Heading, Text, Image, Center, Spinner } from '@chakra-ui/react';
// import WHEPClient from '../Client/WHEPClient';

// function StreamPlayer() {
//     const [streamData, setStreamData] = useState(null);
//     const videoRef = useRef(null);

//     useEffect(() => {
//         const fetchStream = async () => {
//             const response = await fetch('http://localhost:3001/stream');
//             const data = await response.json();
//             setStreamData(data);
//             console.log('Video ref:', videoRef.current);
//             new WHEPClient(data.endpoint, videoRef.current);
//         };
    
//         fetchStream();
//     }, []);
    

//     return (
//         <Box textAlign="center" py="10" px={{ base: "4", md: "6" }}>
//             <Heading as="h1" size="2xl" mb="4" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
//                 Live Stream
//             </Heading>
//             {streamData ? (
//                 <Box borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" boxShadow="sm" p="4">
//                     {streamData.thumbnail && <Image src={streamData.thumbnail} alt="Stream Thumbnail" mb="2" borderRadius="md" boxSize="150px" objectFit="cover" />}
//                     <Box p="4">
//                         <Text fontWeight="bold" fontSize="lg">{streamData.title}</Text>
//                         <Text fontSize="sm" color="gray.600">By: {streamData.username}</Text>
//                     </Box>
//                     <video
//                         ref={videoRef}
//                         autoPlay
//                         controls
//                         style={{ width: '100%', borderRadius: 'md' }}
//                     />
//                 </Box>
//             ) : (
//                 <Center>
//                     <Spinner size="xl" />
//                     <Text fontSize="xl" mt={4}>Loading...</Text>
//                 </Center>
//             )}
//         </Box>
//     );
// }

// export default StreamPlayer;
