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
    };
  }
}
