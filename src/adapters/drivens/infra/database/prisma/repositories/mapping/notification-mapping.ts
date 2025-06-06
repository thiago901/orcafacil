import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { Notification } from '@core/modules/notification/entities/notification';

import { Notification as NotificationPrisma } from '@prisma/client';

type NotificationComplete = NotificationPrisma;
export class NotificationMapping {
  static toDomain({
    created_at,
    id,
    message,
    recipient_id,
    read,
    title,
    type,
    updated_at,
  }: NotificationComplete) {
    return Notification.create(
      {
        message,
        read,
        title,
        type,
        recipient_id,
        created_at,
        updated_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(notification: Notification) {
    return {
      id: notification.id.toString(),
      message: notification.message,
      read: notification.read,
      recipient_id: notification.recipient_id,
      title: notification.title,
      type: notification.type,
      created_at: notification.created_at,
      updated_at: notification.updated_at,
    };
  }
}
