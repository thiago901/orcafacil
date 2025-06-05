import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    return this.server;
  }

  emitToRoom(roomId: string, event: string, payload: any) {
    this.server.to(roomId).emit(event, payload);
  }

  emitToClient(clientId: string, event: string, payload: any) {
    this.server.to(clientId).emit(event, payload);
  }
}
