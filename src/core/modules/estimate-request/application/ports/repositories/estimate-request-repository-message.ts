import { EstimateRequestMessage } from '@core/modules/estimate-request/entities/estimate-request-message';

export abstract class EstimateRequestMessageRepository {
  abstract create(message: EstimateRequestMessage): Promise<void>;

  abstract findByEstimateId(
    estimate_request_id: string,
  ): Promise<EstimateRequestMessage[]>;
  abstract findByEstimateIdAndCompanyId(
    estimate_request_id: string,
    company_id: string,
  ): Promise<EstimateRequestMessage[]>;
}
