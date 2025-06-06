import { Notification } from '@core/modules/notification/entities/notification';

export class NotificationMapping {
  static toView({
    id,
    created_at,
    message,
    read,
    title,
    type,
    updated_at,
    recipient_id,
  }: Notification) {
    return {
      id: id.toString(),
      message,
      read,
      title,
      type,
      created_at,
      updated_at,
      recipient_id,
    };
  }
}
