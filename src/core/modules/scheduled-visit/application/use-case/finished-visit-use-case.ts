import { Either, left, right } from '@core/common/entities/either';
import { Injectable } from '@nestjs/common';
import { ScheduledVisitRepository } from '../ports/repositories/schedule-visit.repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { ProgressEstimateRequestProvider } from '@core/modules/estimate-request/application/ports/provider/progress-estimate-request';
import { ScheduledVisit } from '../../entities/scheduled-visit';

interface FinishedVisitUseCaseRequest {
  visit_id: string;
}

type FinishedVisitUseCaseResponse = Either<Error, { visit: ScheduledVisit }>;

@Injectable()
export class FinishedVisitUseCase {
  constructor(
    private readonly repository: ScheduledVisitRepository,
    private readonly progressEstimateRequestProvider: ProgressEstimateRequestProvider,
  ) {}

  async execute({
    visit_id,
  }: FinishedVisitUseCaseRequest): Promise<FinishedVisitUseCaseResponse> {
    const visit = await this.repository.findById(visit_id);

    if (!visit) {
      return left(new ResourceNotFoundError());
    }
    visit.status = 'COMPLETED';

    await this.repository.save(visit);

    await this.progressEstimateRequestProvider.execute({
      type: 'VISIT_CONFIRMED',
      estimate_request_id: visit.estimate_request_id,
      title: 'Visita Completa',
      description: `A visita foi finalizada`,
      props: {},
      proposal_id: visit.proposal_id,
    });
    await this.progressEstimateRequestProvider.execute({
      type: 'PAYMENT_REQUESTED',
      estimate_request_id: visit.estimate_request_id,
      title: 'Aguardamos Pagamento',
      description: `Estamos aguardando pagamento para prosseguir`,
      props: {},
      proposal_id: visit.proposal_id,
    });
    return right({ visit });
  }
}
