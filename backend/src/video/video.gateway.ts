import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VideoService } from './video.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly videoService: VideoService) {}

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    client.broadcast.emit('peerDisconnected', { id: client.id });
    this.videoService.stopStream(client.id);
  }


  @SubscribeMessage('request-stream')
  handleRequestStream(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { peerId } = data;
    const streamData = this.videoService.getStreamData(peerId);

    if (streamData && streamData.offer) {
      client.emit('offer', { offer: streamData.offer, id: peerId });
    } else {
      client.emit('stream-not-found', { message: 'Stream not found or offer is missing.' });
    }
  }

// Server-side: Handling WebSocket messages for offer, answer, and ICE candidates
@SubscribeMessage('start-stream')
handleStartStream(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
  const { offer, title, thumbnail, username } = data;

  if (offer) {
    const streamId = this.videoService.startStream(client.id, { title, username, thumbnail, offer });
    client.broadcast.emit('offer', { offer, id: client.id, streamId });
  } else {
    console.error('Offer is missing or invalid.');
  }
}

@SubscribeMessage('answer')
handleAnswer(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
  const { answer, peerId } = data;
  client.to(peerId).emit('answer', { answer, id: client.id });
}

@SubscribeMessage('ice-candidate')
handleIceCandidate(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
  const { candidate, peerId } = data;
  client.to(peerId).emit('ice-candidate', { candidate, id: client.id });
}

}
