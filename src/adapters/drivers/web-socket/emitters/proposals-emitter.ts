import {
  ProposalNotificationProvider,
  ProposalSendNotificationProps,
} from '@core/modules/proposal/application/ports/providers/proposal-notification-provider';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class ProposalsEmitter implements ProposalNotificationProvider {
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
  }: ProposalSendNotificationProps): Promise<void> {
    this.server.to(to).emit(event, payload);
  }
}
