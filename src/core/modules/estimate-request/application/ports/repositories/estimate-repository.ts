import { Estimate } from '@core/modules/estimate-request/entities/estimate';

export abstract class EstimateRepository {
  abstract create(estimate: Estimate): Promise<void>;
  abstract findById(id: string): Promise<Estimate | null>;
  abstract getAllByCompany(company_id: string): Promise<Estimate[]>;
  abstract getAllByEstimateRequest(
    estimate_request_id: string,
  ): Promise<Estimate[]>;
}
