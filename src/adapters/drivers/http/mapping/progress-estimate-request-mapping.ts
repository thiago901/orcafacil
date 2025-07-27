import { ProgressEstimateRequest } from '@core/modules/estimate-request/entities/progress-estimate-request';

export class ProgressEstimateRequestMapping {
  static toView({
    id,
    description,
    created_at,
    estimate_request_id,
    title,
    type,
    proporties,
  }: ProgressEstimateRequest) {
    return {
      id: id.toString(),
      description,
      created_at,
      estimate_request_id,
      title,
      type,
      props: proporties,
    };
  }
}
