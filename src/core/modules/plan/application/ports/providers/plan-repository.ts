import { Plan } from '@core/modules/plan/entities/plan';

export abstract class PlanRepository {
  abstract findById(plan_id: string): Promise<Plan | null>;
  abstract getAll(): Promise<Plan[]>;
}
