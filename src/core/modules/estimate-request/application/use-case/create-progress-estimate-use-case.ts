import { Injectable } from '@nestjs/common';
import { right } from '@core/common/entities/either';

import { ProgressEstimateRequestRepository } from '../ports/repositories/progress-estimate-request-repository';
import { ProgressEstimateRequest } from '../../entities/progress-estimate-request';
import {
  ProgressEstimateRequestProvider,
  RequestProps,
  ResponseProps,
} from '../ports/provider/progress-estimate-request';

@Injectable()
export class CreateProgressEstimateUseCase
  implements ProgressEstimateRequestProvider
{
  constructor(
    private readonly progressEstimateRequestRepository: ProgressEstimateRequestRepository,
  ) {}

  async execute({
    estimate_request_id,
    description,
    title,
    type,
  }: RequestProps): Promise<ResponseProps> {
    const progressEstimateRequest = ProgressEstimateRequest.create({
      description,
      estimate_request_id,
      title,
      type,
    });

    await this.progressEstimateRequestRepository.create(
      progressEstimateRequest,
    );

    return right({ progressEstimateRequest });
  }
}
