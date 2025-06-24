import { Module } from '@nestjs/common';
import { CreateNotificationUseCase } from './application/use-case/create-notification-use-case';
import { ListNotificationByRecipientIdUseCase } from './application/use-case/list-notification-by-recipient-id-use-case copy';
import { GetNotificationByIdUseCase } from './application/use-case/get-notification-by-id-use-case';
import { UpdateNotificationByRecipientIdUseCase } from './application/use-case/update-notification-by-recipient-id-use-case';
import { CreateBulkNotificationUseCase } from './application/use-case/create-bulk-notification-use-case';

@Module({
  imports: [],

  providers: [
    CreateNotificationUseCase,
    ListNotificationByRecipientIdUseCase,
    GetNotificationByIdUseCase,
    UpdateNotificationByRecipientIdUseCase,
    CreateBulkNotificationUseCase,
  ],
  exports: [
    CreateNotificationUseCase,
    ListNotificationByRecipientIdUseCase,
    GetNotificationByIdUseCase,
    UpdateNotificationByRecipientIdUseCase,
    CreateBulkNotificationUseCase,
  ],
})
export class NotificationModule {}
