import { Either, left, right } from '@core/common/entities/either';
import { Injectable } from '@nestjs/common';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { ScheduledVisit } from '../../entities/scheduled-visit';
import { ProgressEstimateRequestProvider } from '@core/modules/estimate-request/application/ports/provider/progress-estimate-request';
import { format } from 'date-fns';

// SUGGEST
interface SuggestNewDateRequest {
  visit_id: string;
  suggested_at: Date;
}

type SuggestNewDateResponse = Either<Error, { visit: ScheduledVisit }>;

@Injectable()
export class SuggestNewDateUseCase {
  constructor(
    private readonly repository: ScheduledVisitRepository,
    private readonly progressEstimateRequestProvider: ProgressEstimateRequestProvider,
  ) {}

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
    await this.progressEstimateRequestProvider.execute({
      type: 'VISIT_SUGGESTED',
      estimate_request_id: visit.estimate_request_id,
      title: 'Sugestão de data',
      description: `Infelizmente o prestador não pode atender na data solicitada, por isso sugeriu o dia <strong>${format(suggested_at, 'dd/MM/yyy')}</strong>`,
    });

    return right({ visit });
  }
}
