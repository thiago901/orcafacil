import { RealtimeMessageNotificationProvider } from '@core/modules/estimate-request/application/ports/provider/realtime-message-notification';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class ChatEmitter implements RealtimeMessageNotificationProvider {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    return this.server;
  }

  async sendMessage(
    roomId: string,
    event: string,
    payload: any,
  ): Promise<void> {
    this.server.to(roomId).emit(event, payload);
  }
}
