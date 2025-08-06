import { Either, left, right } from '@core/common/entities/either';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { ScheduledVisit } from '../../entities/scheduled-visit';
import { ProgressEstimateRequestProvider } from '@core/modules/estimate-request/application/ports/provider/progress-estimate-request';

// CONFIRM
interface ConfirmVisitRequest {
  visit_id: string;
}

type ConfirmVisitResponse = Either<Error, { visit: ScheduledVisit }>;

@Injectable()
export class ConfirmScheduledVisitUseCase {
  constructor(
    private readonly repository: ScheduledVisitRepository,
    private readonly progressEstimateRequestProvider: ProgressEstimateRequestProvider,
  ) {}

  async execute({
    visit_id,
  }: ConfirmVisitRequest): Promise<ConfirmVisitResponse> {
    const visit = await this.repository.findById(visit_id);

    if (!visit) {
      return left(new ResourceNotFoundError());
    }

    visit.status = 'CONFIRMED';
    await this.repository.save(visit);
    await this.progressEstimateRequestProvider.execute({
      type: 'VISIT_CONFIRMED',
      estimate_request_id: visit.estimate_request_id,
      title: 'Data de Visíta confirmada',
      description: `A data foi confirmada, aguarde contado do prestador`,
      props: {},
      proposal_id: visit.proposal_id,
    });
    await this.progressEstimateRequestProvider.execute({
      type: 'VISIT_WAITING',
      estimate_request_id: visit.estimate_request_id,
      title: 'Prestador finalizou a visita?',
      description: `O prestador já finalizou`,
      props: {
        scheduled_date: visit.suggested_at || visit.scheduled_at,
        visit_id,
      },
      proposal_id: visit.proposal_id,
    });

    return right({ visit });
  }
}
