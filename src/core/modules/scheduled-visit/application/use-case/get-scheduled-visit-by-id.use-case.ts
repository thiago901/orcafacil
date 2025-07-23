import { ScheduledVisit } from '../../entities/scheduled-visit';

import { Injectable } from '@nestjs/common';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface GetScheduledVisitByIdRequest {
  id: string;
}

type GetScheduledVisitByIdResponse = Either<Error, { visit: ScheduledVisit }>;

@Injectable()
export class GetScheduledVisitByIdUseCase {
  constructor(private readonly repository: ScheduledVisitRepository) {}

  async execute({
    id,
  }: GetScheduledVisitByIdRequest): Promise<GetScheduledVisitByIdResponse> {
    const visit = await this.repository.findById(id);
    if (!visit) {
      return left(new ResourceNotFoundError());
    }
    return right({ visit });
  }
}
