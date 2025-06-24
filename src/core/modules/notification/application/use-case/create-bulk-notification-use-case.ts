import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { NotificationRepository } from '../ports/repositories/notification-repository';

import { Notification } from '../../entities/notification';
import { NotificationProvider } from '../ports/providers/notification-provider';

interface RequestProps {
  title: string;
  type: string;
  message: string;
  recipient_id: string;
}

type ResponseProps = Either<Error, null>;

@Injectable()
export class CreateBulkNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationProvider: NotificationProvider,
  ) {}

  async execute(requests: RequestProps[]): Promise<ResponseProps> {
    for (const request of requests) {
      const notification = Notification.create({
        message: request.message,
        read: false,
        recipient_id: request.recipient_id,
        title: request.title,
        type: request.type,
      });
      await this.notificationRepository.create(notification);
      this.notificationProvider.sendNotification({
        to: request.recipient_id,
        event: request.type,
        payload: {
          id: notification.id.toString(),
          message: request.message,
          recipient_id: notification.recipient_id,
        },
      });
    }

    return right(null);
  }
}
