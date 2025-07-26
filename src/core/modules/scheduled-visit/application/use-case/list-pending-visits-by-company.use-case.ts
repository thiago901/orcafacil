import { ScheduledVisit } from '../../entities/scheduled-visit';

import { Injectable } from '@nestjs/common';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { Either, right } from '@core/common/entities/either';

interface ListPendingVisitsByCompanyRequest {
  company_id: string;
}

type ListPendingVisitsByCompanyResponse = Either<
  Error,
  { visits: ScheduledVisit[] }
>;

@Injectable()
export class ListPendingVisitsByCompanyUseCase {
  constructor(private readonly repository: ScheduledVisitRepository) {}

  async execute({
    company_id,
  }: ListPendingVisitsByCompanyRequest): Promise<ListPendingVisitsByCompanyResponse> {
    const visits = await this.repository.findAllByCompany(company_id);
    return right({ visits });
  }
}
