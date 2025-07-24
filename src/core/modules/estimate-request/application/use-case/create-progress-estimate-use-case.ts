import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { ProgressEstimateRequestRepository } from '../ports/repositories/progress-estimate-request-repository';
import {
  ProgressEstimateRequest,
  ProgressEstimateRequestType,
} from '../../entities/progress-estimate-request';

interface RequestProps {
  description: string;
  estimate_request_id: string;
  title: string;
  type: ProgressEstimateRequestType;
}

type ResponseProps = Either<
  null,
  {
    progressEstimateRequest: ProgressEstimateRequest;
  }
>;

@Injectable()
export class CreateProgressEstimateUseCase {
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
