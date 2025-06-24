import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageHandler } from './listeners/ChatMessage';
import { SocketService } from './web-socket.service';
import { ChatEmitter } from './emitters/chat-emitter';
import { NotificationEmitter } from './emitters/proposals-emitter';
import { setSocketServer } from './server-socket';
@WebSocketGateway(0, {
  cors: {
    origin: 'https://orcalink.com.br',
  },
  transports: ['websocket'],
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);
  constructor(
    private readonly chatMessageHandler: ChatMessageHandler,
    private readonly socketService: SocketService,
    private readonly chatEmitter: ChatEmitter,
    private readonly notificationEmitter: NotificationEmitter,
  ) {}

  @WebSocketServer() io: Server;
  afterInit(server: Server) {
    this.logger.log('Initialized');
    this.chatEmitter.setServer(server);
    setSocketServer(server);
    this.notificationEmitter.setServer(server);
    this.socketService.setServer(server);
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('join:room')
  handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    client.emit('room:joined', { roomId: data.roomId });
    this.logger.log(`Entrou na salas  ${data.roomId}`);
  }

  @SubscribeMessage('ping')
  handleMessage(client: Socket, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${JSON.stringify(data)}`);
    this.chatMessageHandler.handleMessage(JSON.stringify(data));
    client.emit('message:recieve', 'sssss');
    return {
      event: 'pong',
      data: 'Wrong data that will make the test fail',
    };
  }
}
