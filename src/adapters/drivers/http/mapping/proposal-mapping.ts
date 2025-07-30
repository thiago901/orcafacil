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
    progress_estimate_requests,
    messages,
    is_required_visit,
    expire_at,
    name,
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
      messages: !messages
        ? []
        : messages.map((item) => ({
            company_id: item.company_id,
            company_name: item.company_name,
            content: item.content,
            created_at: item.created_at,
            estimate_request_id: item.estimate_request_id,
            id: item.id.toString(),
            proposal_id: item.proposal_id,
            read: item.read,
            sender: item.sender,
            type: item.type,
            updated_at: item.updated_at,
            user_id: item.user_id,
            user_name: item.user_name,
          })),
      is_required_visit,
      expire_at,
      name,
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
      progress_estimate_requests: progress_estimate_requests?.map((item) => ({
        title: item.title,
        estimate_request_id: item.estimate_request_id,
        description: item.description,
        type: item.type,
        created_at: item.created_at,
        proposal_id: item.proposal_id,
        proporties: item.proporties,
      })),
    };
  }
}
