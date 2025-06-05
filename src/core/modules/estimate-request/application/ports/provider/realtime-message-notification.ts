export abstract class RealtimeMessageNotificationProvider {
  abstract sendMessage(
    roomId: string,
    event: string,
    payload: any,
  ): Promise<void>;
}
