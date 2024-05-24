import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/webrtc' })
export class AppGateway {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: any): void {
    client.broadcast.emit('offer', payload);
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: any): void {
    client.broadcast.emit('answer', payload);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(client: Socket, payload: any): void {
    client.broadcast.emit('ice-candidate', payload);
  }
}
