import { EstimateRequestMessage } from '@core/modules/estimate-request/entities/estimate-request-message';

export class EstimateRequestMesssageMapping {
  static toView({
    id,
    company_id,
    company_name,
    content,
    created_at,
    estimate_request_id,
    sender,
    type,
    updated_at,
    user_name,
  }: EstimateRequestMessage) {
    return {
      id: id.toString(),
      company_id,
      company_name,
      content,
      created_at,
      estimate_request_id,
      sender,
      type,
      updated_at,
      user_name,
    };
  }
}
