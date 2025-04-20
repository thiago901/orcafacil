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
    proposals,
  }: EstimateRequest) {
    return {
      id: id.toString(),
      description,
      email,
      footage,
      name,
      phone,
      user_id,
      proposals: proposals?.map((proposal) => ({
        id: proposal.id.toString(),
        company_id: proposal.company_id.toString(),
        estimate_request_id: proposal.estimate_request_id.toString(),
        created_at: proposal.created_at,
        updated_at: proposal.updated_at,
        amount: proposal.amount,
        approved_at: proposal.approved_at,
        reject_at: proposal.reject_at,
      })),
    };
  }
}
