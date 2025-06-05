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
    estimate_request_files,
    address,
    created_at,
    updated_at,
    user,
  }: EstimateRequest) {
    return {
      id: id.toString(),
      description,
      email,
      footage,
      name,
      phone,
      user_id,
      user: {
        avatar: user?.avatar,
        email: user?.email,
        name: user?.name,
        phone: user?.phone,
        id: user?.id.toString(),
      },
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
      proposals_amount: proposals?.length || 0,
      estimate_request_files: estimate_request_files?.map((file) => ({
        id: file.id.toString(),
        estimate_request_id: file.estimate_request_id.toString(),
        url: file.url,
        created_at: file.created_at,
      })),
      address,
      created_at,
      updated_at,
    };
  }
}
