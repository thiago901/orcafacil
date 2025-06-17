import { UserPlan } from '@core/modules/plan/entities/user-plan';

export abstract class UserPlanRepository {
  abstract findById(userPlanId: string): Promise<UserPlan | null>;
  abstract findActiveByUserId(userId: string): Promise<UserPlan | null>;
  abstract create(userPlan: UserPlan): Promise<void>;
  abstract save(userPlan: UserPlan): Promise<void>;
  abstract delete(userPlanId: string): Promise<void>;
}
