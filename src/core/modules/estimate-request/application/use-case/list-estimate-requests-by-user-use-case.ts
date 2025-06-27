import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { UsagePlanProvider } from '@core/common/application/ports/providers/usage-plan-provider';

type EstimateRequestProps = {
  longitude: number;
  latitude: number;
  radius_in_meters: number;
  category?: string[];
  user_id: string;
};
type ResponseProps = Either<
  null,
  {
    estimateRequests: EstimateRequest[];
  }
>;

@Injectable()
export class ListEstimateRequestsUseCase {
  constructor(
    private readonly estimateRequestRepository: EstimateRequestRepository,
    private readonly usagePlanProvider: UsagePlanProvider,
  ) {}

  async execute({
    latitude,
    longitude,
    radius_in_meters,
    category,
    user_id,
  }: EstimateRequestProps): Promise<ResponseProps> {
    const isAllowed = await this.usagePlanProvider.checkAndConsumeFixed({
      resource: 'visualizeCustomerContacts',
      user_id,
    });
    const omitIfNotAllowed = !isAllowed;
    const estimateRequests =
      await this.estimateRequestRepository.getAllByGeoLocation({
        lat: latitude,
        long: longitude,
        radius_in_meters,
        category,
        options: {
          omit: {
            phone: omitIfNotAllowed,
            email: omitIfNotAllowed,
            address_number: omitIfNotAllowed,
          },
        },
      });

    return right({ estimateRequests });
  }
}
