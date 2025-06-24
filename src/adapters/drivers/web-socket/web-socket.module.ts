import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway.events';
import { ChatMessageHandler } from './listeners/ChatMessage';
import { SocketService } from './web-socket.service';
import { ChatEmitter } from './emitters/chat-emitter';
import { NotificationEmitter } from './emitters/proposals-emitter';

@Module({
  imports: [],
  providers: [
    EventsGateway,
    ChatMessageHandler,
    SocketService,
    ChatEmitter,
    NotificationEmitter,
  ],
  exports: [ChatEmitter, SocketService, NotificationEmitter],
})
export class WebSocketModule {}
