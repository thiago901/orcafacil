import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { UsagePlanProvider } from '@core/common/application/ports/providers/usage-plan-provider';

type RequestProps = {
  id: string;
  user_id: string;
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
    private readonly usagePlanProvider: UsagePlanProvider,
  ) {}

  async execute({ id, user_id }: RequestProps): Promise<ResponseProps> {
    const isAllowed = await this.usagePlanProvider.checkAndConsumeFixed({
      resource: 'visualizeCustomerContacts',
      user_id,
    });
    const omitIfNotAllowed = !isAllowed;

    const estimateRequests = await this.estimateRequestRepository.findById(id);

    if (!estimateRequests) {
      return left(new ResourceNotFoundError('EstimateRequest'));
    }
    if (omitIfNotAllowed && user_id !== estimateRequests.user_id) {
      estimateRequests.phone = '';
      estimateRequests.email = '';
      estimateRequests.address.number = '';
    }

    return right({ estimateRequests });
  }
}
