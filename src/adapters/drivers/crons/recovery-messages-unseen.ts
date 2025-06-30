import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MessageCronService {
  private readonly logger = new Logger(MessageCronService.name);

  // Executa a cada minuto
  @Cron(CronExpression.EVERY_MINUTE)
  handleUnreadMessages() {
    this.logger.log('🕒 Verificando mensagens não visualizadas...');

    // 1. Buscar mensagens com status "enviada" e tempo > 5 min
    // 2. Verificar se o usuário já visualizou
    // 3. Se não, notificar (push, email, etc)

    // Exemplo fake:
    // const unread = await this.messageRepository.findUnseenOlderThan(5);
    // unread.forEach(msg => this.notificationService.notifyUser(msg.userId));
  }
}
