import { Notification } from '@core/modules/notification/entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract findAllByRecipientId(id: string): Promise<Notification[]>;
}
