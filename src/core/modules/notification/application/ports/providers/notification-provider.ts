export type SendNotificationProps = {
  to: string;
  event: string;
  payload: any;
};
export abstract class NotificationProvider {
  abstract sendNotification(data: SendNotificationProps): Promise<void>;
}
