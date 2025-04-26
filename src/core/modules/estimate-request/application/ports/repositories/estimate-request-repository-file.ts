import { EstimateRequestFile } from '@core/modules/estimate-request/entities/estimate-request-file';

export abstract class EstimateRequestFileRepository {
  abstract save(
    estimate: EstimateRequestFile | EstimateRequestFile[],
  ): Promise<void>;

  abstract findByEstimateId(
    estimate_request_id: string,
  ): Promise<EstimateRequestFile[]>;
}
