import { Either, left, right } from '@core/common/entities/either';
import { Injectable } from '@nestjs/common';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

// CANCEL
interface CancelVisitRequest {
  visit_id: string;
}

type CancelVisitResponse = Either<Error, null>;

@Injectable()
export class CancelScheduledVisitUseCase {
  constructor(private readonly repository: ScheduledVisitRepository) {}

  async execute({
    visit_id,
  }: CancelVisitRequest): Promise<CancelVisitResponse> {
    const visit = await this.repository.findById(visit_id);

    if (!visit) {
      return left(new ResourceNotFoundError());
    }

    visit.status = 'CANCELED';
    await this.repository.save(visit);

    return right(null);
  }
}
