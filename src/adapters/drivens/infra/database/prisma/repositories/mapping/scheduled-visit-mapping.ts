import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { ScheduledVisit } from '@core/modules/scheduled-visit/entities/scheduled-visit';
import { ScheduledVisit as PrismaScheduledVisit } from '@prisma/client';

export class ScheduledVisitMapping {
  static toDomain(raw: PrismaScheduledVisit): ScheduledVisit {
    return ScheduledVisit.create(
      {
        customer_id: raw.customer_id,
        company_id: raw.company_id,
        estimate_request_id: raw.estimate_request_id,
        scheduled_at: raw.scheduled_at,
        notes: raw.notes,
        status: raw.status,
        suggested_at: raw.suggested_at,
        proposal_id: raw.proposal_id,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(visit: ScheduledVisit) {
    return {
      id: visit.id.toString(),
      customer_id: visit.customer_id,
      company_id: visit.company_id,
      estimate_request_id: visit.estimate_request_id,
      scheduled_at: visit.scheduled_at,
      notes: visit.notes,
      status: visit.status,
      suggested_at: visit.suggested_at,
      created_at: visit.created_at,
      proposal_id: visit.proposal_id,
    };
  }
}
