import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Proposal } from '@core/modules/proposal/entities/proposal';

import { Proposal as ProposalPrisma } from '@prisma/client';

export class ProposalMapping {
  static toDomain({
    id,
    amount,
    aproved_at,
    company_id,
    created_at,
    description,
    estimate_request_id,
    updated_at,
  }: ProposalPrisma) {
    return Proposal.create(
      {
        amount,
        aproved_at,
        company_id,
        created_at,
        description,
        estimate_request_id,
        updated_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(proposal: Proposal) {
    return {
      id: proposal.id.toString(),
      amount: proposal.amount,
      aproved_at: proposal.aproved_at,
      company_id: proposal.company_id,
      created_at: proposal.created_at,
      description: proposal.description,
      estimate_request_id: proposal.estimate_request_id,
      updated_at: proposal.updated_at,
    };
  }
}
