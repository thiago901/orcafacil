import { ProgressEstimateRequest } from '@core/modules/estimate-request/entities/progress-estimate-request';

export abstract class ProgressEstimateRequestRepository {
  abstract create(data: ProgressEstimateRequest): Promise<void>;

  abstract findByEstimateRequest(
    estimate_request_id: string,
  ): Promise<ProgressEstimateRequest[]>;
}
