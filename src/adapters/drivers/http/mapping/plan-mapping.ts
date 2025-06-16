import { Plan } from '@core/modules/plan/entities/plan';

export class PlanMapping {
  static toView({
    id,
    actived,
    created_at,
    price_month,
    price_year,
    name,
    price_id_month,
    price_id_year,
    resources,
    updated_at,
    description,
  }: Plan) {
    const array = Object.entries(resources)
      .map(([key, value]) => ({
        key,
        ...(value as any),
      }))
      .sort((a, b) => b.active - a.active);
    return {
      id: id.toString(),
      actived,
      created_at,
      price_month,
      price_year,
      description,
      name,
      price_id_month,
      price_id_year,
      resources: array,
      updated_at,
    };
  }
}
