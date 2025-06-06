import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { NotificationRepository } from '../ports/repositories/notification-repository';

import { Notification } from '../../entities/notification';

interface RequestProps {
  recipient_id: string;
}

type ResponseProps = Either<Error, { notifications: Notification[] }>;

@Injectable()
export class ListNotificationByRecipientIdUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ recipient_id }: RequestProps): Promise<ResponseProps> {
    const notifications =
      await this.notificationRepository.findAllByRecipientId(recipient_id);

    return right({ notifications });
  }
}
