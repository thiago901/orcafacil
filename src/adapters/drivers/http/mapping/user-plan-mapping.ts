import { UserPlan } from '@core/modules/plan/entities/user-plan';

export class UserPlanMapping {
  static toView({
    id,
    created_at,
    end_date,
    plan_id,
    plan_type,
    price,
    start_date,
    status,
    user_id,
  }: UserPlan) {
    return {
      id: id.toString(),
      end_date,
      plan_id,
      plan_type,
      price,
      start_date,
      status,
      user_id,
      created_at,
    };
  }
}
