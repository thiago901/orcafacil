import { Either, left, right } from '@core/common/entities/either';
import { Injectable } from '@nestjs/common';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { ScheduledVisit } from '../../entities/scheduled-visit';

// SUGGEST
interface SuggestNewDateRequest {
  visit_id: string;
  suggested_at: Date;
}

type SuggestNewDateResponse = Either<Error, { visit: ScheduledVisit }>;

@Injectable()
export class SuggestNewDateUseCase {
  constructor(private readonly repository: ScheduledVisitRepository) {}

  async execute({
    visit_id,
    suggested_at,
  }: SuggestNewDateRequest): Promise<SuggestNewDateResponse> {
    const visit = await this.repository.findById(visit_id);

    if (!visit) {
      return left(new ResourceNotFoundError());
    }

    visit.suggested_at = suggested_at;
    visit.status = 'SUGGESTED';
    await this.repository.save(visit);

    return right({ visit });
  }
}
