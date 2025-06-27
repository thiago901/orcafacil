import { ResourcesAllowed } from '../../../../modules/plan/application/common/resources-allowed';

export type CheckAndConsumeParams = {
  user_id: string;
  resource: ResourcesAllowed;
};

export abstract class UsagePlanProvider {
  abstract checkAndConsumeMonthly(data: CheckAndConsumeParams): Promise<void>;
  abstract checkAndConsumeFixed(data: CheckAndConsumeParams): Promise<boolean>;
}
