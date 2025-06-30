import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MessageCronService {
  private readonly logger = new Logger(MessageCronService.name);

  // Executa a cada minuto
  @Cron(CronExpression.EVERY_MINUTE)
  handleUnreadMessages() {
    this.logger.log('🕒 Verificando mensagens não visualizadas...');

    // 1. Buscar mensagens não lidas que forram criadas > 5 min
    // 2. buscar usuários dessas mensagens
    // 3. pegar o email desses usuários
    // 4. enviar email para esses usuários
  }
}
