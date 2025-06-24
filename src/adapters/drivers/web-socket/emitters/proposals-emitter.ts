import {
  NotificationProvider,
  SendNotificationProps,
} from '@core/modules/notification/application/ports/providers/notification-provider';

import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { getSocketServer } from '../server-socket';

@Injectable()
export class NotificationEmitter implements NotificationProvider {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    return this.server;
  }

  async sendNotification({
    event,
    payload,
    to,
  }: SendNotificationProps): Promise<void> {
    getSocketServer().to(to).emit(event, payload);
  }
}
