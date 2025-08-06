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
    customer,
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
      customer: customer
        ? {
            document: customer.document,
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            user_id: customer.user_id,
            created_at: customer.created_at,
            updated_at: customer.updated_at,
          }
        : null,
    };
  }
}
