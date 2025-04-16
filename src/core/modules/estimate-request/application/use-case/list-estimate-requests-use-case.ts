import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  user_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimateRequests: EstimateRequest[];
  }
>;

@Injectable()
export class ListEstimateRequestsByUserUseCase {
  constructor(
    private readonly estimateRequestRepository: EstimateRequestRepository,
  ) {}

  async execute({ user_id }: RequestProps): Promise<ResponseProps> {
    const estimateRequests =
      await this.estimateRequestRepository.findByUserId(user_id);

    return right({ estimateRequests });
  }
}
