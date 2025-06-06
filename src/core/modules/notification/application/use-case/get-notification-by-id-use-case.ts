import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { NotificationRepository } from '../ports/repositories/notification-repository';

import { Notification } from '../../entities/notification';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  id: string;
}

type ResponseProps = Either<Error, { notification: Notification }>;

@Injectable()
export class GetNotificationByIdUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    return right({ notification });
  }
}
