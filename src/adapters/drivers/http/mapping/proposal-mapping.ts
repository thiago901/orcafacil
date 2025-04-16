import { Proposal } from '@core/modules/proposal/entities/proposal';

export class ProposalMapping {
  static toView({
    id,
    amount,
    aproved_at,
    company_id,
    created_at,
    description,
    estimate_request_id,
    updated_at,
  }: Proposal) {
    return {
      id: id.toString(),
      amount,
      aproved_at,
      company_id,
      created_at,
      description,
      estimate_request_id,
      updated_at,
    };
  }
}
