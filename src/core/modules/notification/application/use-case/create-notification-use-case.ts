import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { NotificationRepository } from '../ports/repositories/notification-repository';

import { Notification } from '../../entities/notification';

interface RequestProps {
  title: string;
  type: string;
  message: string;
  recipient_id: string;
}

type ResponseProps = Either<Error, { notification: Notification }>;

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    message,
    recipient_id,
    title,
    type,
  }: RequestProps): Promise<ResponseProps> {
    const notification = Notification.create({
      message,
      read: false,
      recipient_id,
      title,
      type,
    });
    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}
