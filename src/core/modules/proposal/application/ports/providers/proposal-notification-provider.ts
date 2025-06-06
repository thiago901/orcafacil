export type ProposalSendNotificationProps = {
  to: string;
  event: string;
  payload: any;
};
export abstract class ProposalNotificationProvider {
  abstract sendNotification(data: ProposalSendNotificationProps): Promise<void>;
}
