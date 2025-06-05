import { Logger } from '@nestjs/common';

export class ChatMessageHandler {
  private readonly logger = new Logger(ChatMessageHandler.name);

  handleMessage(texto) {
    this.logger.debug(`Payload: ${JSON.stringify(texto)}`);
  }
}
