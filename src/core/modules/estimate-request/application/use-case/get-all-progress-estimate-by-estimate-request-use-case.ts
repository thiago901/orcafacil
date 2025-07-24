import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { ProgressEstimateRequestRepository } from '../ports/repositories/progress-estimate-request-repository';
import { ProgressEstimateRequest } from '../../entities/progress-estimate-request';

interface RequestProps {
  estimate_request_id: string;
}

type ResponseProps = Either<
  null,
  {
    progressEstimateRequests: ProgressEstimateRequest[];
  }
>;

@Injectable()
export class GetAllProgressEstimateByEstimateRequestUseCase {
  constructor(
    private readonly progressEstimateRequestRepository: ProgressEstimateRequestRepository,
  ) {}

  async execute({ estimate_request_id }: RequestProps): Promise<ResponseProps> {
    const progressEstimateRequests =
      await this.progressEstimateRequestRepository.findByEstimateRequest(
        estimate_request_id,
      );

    return right({ progressEstimateRequests });
  }
}
