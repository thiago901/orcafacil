import { Proposal } from '@core/modules/proposal/entities/proposal';

export class ProposalMapping {
  static toView({
    id,
    amount,
    approved_at,
    company_id,
    created_at,
    description,
    estimate_request_id,
    updated_at,
    reject_at,
    company,
    estimate_request,
    estimate,
    estimate_id,
  }: Proposal) {
    return {
      id: id.toString(),
      amount,
      approved_at,
      company_id,
      created_at,
      description,
      estimate_request_id,
      updated_at,
      reject_at,
      estimate,
      estimate_id,
      estimate_request: estimate_request
        ? {
            id: estimate_request.id.toString(),
            address: estimate_request.address,
            description: estimate_request.description,
            email: estimate_request.email,
            name: estimate_request.name,
            phone: estimate_request.phone,
            footage: estimate_request.footage,
            created_at: estimate_request.created_at,
            updated_at: estimate_request.updated_at,
          }
        : {},
      company: {
        about: company?.about,
        avatar: company?.avatar,
        id: company?.id.toString(),
        name: company?.name,
        ratting: company?.ratting,
      },
    };
  }
}
