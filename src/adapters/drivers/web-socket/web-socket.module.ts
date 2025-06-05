import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway.events';
import { ChatMessageHandler } from './listeners/ChatMessage';
import { SocketService } from './web-socket.service';
import { ChatEmitter } from './emitters/chat-emitter';

@Module({
  imports: [],
  providers: [EventsGateway, ChatMessageHandler, SocketService, ChatEmitter],
  exports: [ChatEmitter, SocketService],
})
export class WebSocketModule {}
