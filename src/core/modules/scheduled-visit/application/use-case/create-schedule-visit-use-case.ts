import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { ScheduledVisit } from '../../entities/scheduled-visit';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';

// CREATE
interface CreateVisitRequest {
  customer_id: string;
  company_id: string;
  estimate_request_id: string;
  scheduled_at: Date;
  notes?: string | null;
}

type CreateVisitResponse = Either<Error, { visit: ScheduledVisit }>;

@Injectable()
export class CreateScheduledVisitUseCase {
  constructor(private readonly repository: ScheduledVisitRepository) {}

  async execute(request: CreateVisitRequest): Promise<CreateVisitResponse> {
    const {
      company_id,
      customer_id,
      scheduled_at,
      notes,
      estimate_request_id,
    } = request;
    const conflict = await this.repository.findConflictingVisit({
      company_id: company_id,
      date: scheduled_at,
    });

    if (conflict) {
      return left(new ResourceNotFoundError('Horário já ocupado'));
    }

    const visit = ScheduledVisit.create({
      customer_id,
      company_id,
      estimate_request_id,
      scheduled_at,
      notes,
    });

    await this.repository.create(visit);

    return right({ visit });
  }
}
