import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { Plan } from '@core/modules/plan/entities/plan';

import { Plan as PlanPrisma } from '@prisma/client';

type PlanComplete = PlanPrisma;
export class PlanMapping {
  static toDomain({
    actived,
    created_at,
    id,
    price_month,
    price_year,
    name,
    price_id_month,
    price_id_year,
    resources,
    description,
    updated_at,
  }: PlanComplete) {
    return Plan.create(
      {
        actived,
        created_at,
        price_month,
        description,
        price_year,
        price_id_year,
        price_id_month,
        name,
        resources,
        updated_at: updated_at ?? new Date(),
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(plan: Plan) {
    return {
      id: plan.id.toString(),
      actived: plan.actived,
      created_at: plan.created_at,
      price_month: plan.price_month,
      price_year: plan.price_year,
      description: plan.description,
      name: plan.name,
      price_id_month: plan.price_id_month,
      price_id_year: plan.price_id_year,
      resources: plan.resources,
      updated_at: plan.updated_at,
    };
  }
}
