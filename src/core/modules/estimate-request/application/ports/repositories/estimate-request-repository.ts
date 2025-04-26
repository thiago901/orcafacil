import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';

export abstract class EstimateRequestRepository {
  abstract save(user: EstimateRequest): Promise<void>;
  abstract findByUserId(user_id: string): Promise<EstimateRequest[]>;
  abstract getAll(): Promise<EstimateRequest[]>;
  abstract findById(id: string): Promise<EstimateRequest | null>;
}
