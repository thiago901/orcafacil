import { Either, left, right } from '@core/common/entities/either';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { ScheduledVisit } from '../../entities/scheduled-visit';

// CONFIRM
interface ConfirmVisitRequest {
  visit_id: string;
}

type ConfirmVisitResponse = Either<Error, { visit: ScheduledVisit }>;

@Injectable()
export class ConfirmScheduledVisitUseCase {
  constructor(private readonly repository: ScheduledVisitRepository) {}

  async execute({
    visit_id,
  }: ConfirmVisitRequest): Promise<ConfirmVisitResponse> {
    const visit = await this.repository.findById(visit_id);

    if (!visit) {
      return left(new ResourceNotFoundError());
    }

    visit.status = 'CONFIRMED';
    await this.repository.save(visit);

    return right({ visit });
  }
}
