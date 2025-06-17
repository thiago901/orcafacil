import { UserPlan as PrismaUserPlan } from '@prisma/client';
import {
  PlanStatus,
  PlanType,
  UserPlan,
} from '@core/modules/plan/entities/user-plan';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export class UserPlanMapping {
  static toDomain({
    id,
    user_id,
    plan_id,
    status,
    plan_type,
    price,
    start_date,
    end_date,
    created_at,
  }: PrismaUserPlan): UserPlan {
    return UserPlan.create(
      {
        user_id,
        plan_id,
        status: status as PlanStatus,
        plan_type: plan_type as PlanType,
        price,
        start_date,
        end_date,
        created_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(userPlan: UserPlan): PrismaUserPlan {
    return {
      id: userPlan.id.toString(),
      user_id: userPlan.user_id,
      plan_id: userPlan.plan_id,
      status: userPlan.status,
      plan_type: userPlan.plan_type,
      price: userPlan.price,
      start_date: userPlan.start_date,
      end_date: userPlan.end_date ?? null,
      created_at: userPlan.created_at,
    };
  }
}
