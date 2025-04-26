import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

type RequestProps = {
  id: string;
};
type ResponseProps = Either<
  ResourceNotFoundError,
  {
    estimateRequests: EstimateRequest;
  }
>;

@Injectable()
export class FindEstimateRequestsByIdUseCase {
  constructor(
    private readonly estimateRequestRepository: EstimateRequestRepository,
  ) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const estimateRequests = await this.estimateRequestRepository.findById(id);
    if (!estimateRequests) {
      return left(new ResourceNotFoundError('EstimateRequest'));
    }
    return right({ estimateRequests });
  }
}
