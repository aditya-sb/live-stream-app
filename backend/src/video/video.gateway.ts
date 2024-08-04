import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class VideoGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('stream')
  handleStream(@MessageBody() data: any): void {
    this.server.emit('stream', data);
  }
}
