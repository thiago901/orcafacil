import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

type EstimateRequestProps = {
  longitude: number;
  latitude: number;
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
  ) {}

  async execute({
    latitude,
    longitude,
  }: EstimateRequestProps): Promise<ResponseProps> {
    const estimateRequests = await this.estimateRequestRepository.getAll();

    return right({ estimateRequests });
  }
}
