import { PlanUsage as PrismaPlanUsage } from '@prisma/client';
import { PlanUsage } from '@core/modules/plan/entities/plan-usage';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export class PlanUsageMapping {
  static toDomain({
    id,
    user_plan_id,
    user_id,
    resource,
    count,
    period,
    created_at,
  }: PrismaPlanUsage): PlanUsage {
    return PlanUsage.create(
      {
        user_plan_id,
        resource,
        count,
        period,
        created_at,
        user_id,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(planUsage: PlanUsage): PrismaPlanUsage {
    return {
      id: planUsage.id.toString(),
      user_plan_id: planUsage.user_plan_id,
      resource: planUsage.resource,
      count: planUsage.count,
      period: planUsage.period,
      created_at: planUsage.created_at,
      user_id: planUsage.user_id,
    };
  }
}
