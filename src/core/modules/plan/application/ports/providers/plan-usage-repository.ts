import { PlanUsage } from '@core/modules/plan/entities/plan-usage';

export type FindByUserPlanAndPeriodParams = {
  user_plan_id: string;
  resource: string;
  period: Date;
};
export abstract class PlanUsageRepository {
  abstract findByUserPlanAndPeriod(
    data: FindByUserPlanAndPeriodParams,
  ): Promise<PlanUsage | null>;

  abstract create(planUsage: PlanUsage): Promise<void>;

  abstract save(planUsage: PlanUsage): Promise<void>;
}
