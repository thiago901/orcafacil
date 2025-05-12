import { Job } from '@core/modules/job/entities/job';

export class JobMapping {
  static toView({
    company_id,
    created_at,
    id,
    proposal_id,
    updated_at,
    proposal,
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
      estimate_request: proposal?.estimate_request
        ? {
            id: proposal.estimate_request.id.toString(),
            address: proposal.estimate_request.address,
            description: proposal.estimate_request.description,
            email: proposal.estimate_request.email,
            name: proposal.estimate_request.name,
            phone: proposal.estimate_request.phone,
            created_at: proposal.estimate_request.created_at,
            updated_at: proposal.estimate_request.updated_at,
          }
        : null,
    };
  }
}
