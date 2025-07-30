import { Injectable } from '@nestjs/common';
import { ScheduledVisit } from '../../entities/scheduled-visit';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';

interface ListSuggestedVisitsByCustomerRequest {
  customer_id: string;
}

interface ListSuggestedVisitsByCustomerResponse {
  visits: ScheduledVisit[];
}

@Injectable()
export class ListSuggestedVisitsByCustomerUseCase {
  constructor(private readonly repository: ScheduledVisitRepository) {}

  async execute({
    customer_id,
  }: ListSuggestedVisitsByCustomerRequest): Promise<ListSuggestedVisitsByCustomerResponse> {
    const visits = await this.repository.findSuggestedByCustomer(customer_id);
    return { visits };
  }
}
