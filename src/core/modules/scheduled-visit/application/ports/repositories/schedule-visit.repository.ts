import { ScheduledVisit } from '@core/modules/scheduled-visit/entities/scheduled-visit';

export type FindConflictingVisitProps = {
  company_id: string;
  date: Date;
};
export abstract class ScheduledVisitRepository {
  abstract create(visit: ScheduledVisit): Promise<void>;
  abstract findById(id: string): Promise<ScheduledVisit | null>;
  abstract save(visit: ScheduledVisit): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findConflictingVisit(
    data: FindConflictingVisitProps,
  ): Promise<ScheduledVisit | null>;
  abstract findAllByCompany(company_id: string): Promise<ScheduledVisit[]>;
  abstract findSuggestedByCustomer(
    customer_id: string,
  ): Promise<ScheduledVisit[]>;
}
