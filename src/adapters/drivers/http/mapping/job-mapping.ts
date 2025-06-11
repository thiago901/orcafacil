import { Job } from '@core/modules/job/entities/job';

export class JobMapping {
  static toView({
    company_id,
    created_at,
    id,
    proposal_id,
    updated_at,
    proposal,
    estimate_request,
  }: Job) {
    return {
      id: id.toString(),

      created_at,
      company_id,
      proposal_id,
      updated_at,
      proposal: proposal
        ? {
            id: proposal.id.toString(),
            amount: proposal.amount,
            company_id: proposal.company_id,
            description: proposal.description,
            approved_at: proposal.approved_at,
            created_at: proposal.created_at,
            reject_at: proposal.reject_at,
            updated_at: proposal.updated_at,
          }
        : null,
      estimate_request: estimate_request
        ? {
            id: estimate_request.id.toString(),
            address: estimate_request.address,
            description: estimate_request.description,
            email: estimate_request.email,
            name: estimate_request.name,
            phone: estimate_request.phone,
            created_at: estimate_request.created_at,
            updated_at: estimate_request.updated_at,
          }
        : null,
    };
  }
}
