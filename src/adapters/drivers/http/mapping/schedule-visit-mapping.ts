import { ScheduledVisit } from '@core/modules/scheduled-visit/entities/scheduled-visit';

export class ScheduledVisitMapping {
  static toView({
    id,
    created_at,
    company_id,
    customer_id,
    estimate_request_id,
    notes,
    scheduled_at,
    status,
    suggested_at,
    updated_at,
  }: ScheduledVisit) {
    return {
      id: id.toString(),

      created_at,
      company_id,
      customer_id,
      estimate_request_id,
      notes,
      scheduled_at,
      status,
      suggested_at,
      updated_at,
    };
  }
}
