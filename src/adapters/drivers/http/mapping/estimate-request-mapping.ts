import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';

export class EstimateRequestMapping {
  static toView({
    id,
    description,
    email,
    footage,
    name,
    phone,
    user_id,
  }: EstimateRequest) {
    return {
      id: id.toString(),
      description,
      email,
      footage,
      name,
      phone,
      user_id,
    };
  }
}
