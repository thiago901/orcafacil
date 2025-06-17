import { PlanUsage } from '@core/modules/plan/entities/plan-usage';
import { ResourcesAllowed } from '../../common/resources-allowed';

export type FindByUserPlanAndPeriodParams = {
  user_plan_id: string;
  resource: ResourcesAllowed;
  period: Date | null;
};
export abstract class PlanUsageRepository {
  abstract findByUserPlanAndPeriod(
    data: FindByUserPlanAndPeriodParams,
  ): Promise<PlanUsage | null>;

  abstract create(planUsage: PlanUsage): Promise<void>;

  abstract save(planUsage: PlanUsage): Promise<void>;
}
