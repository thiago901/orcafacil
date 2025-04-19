import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { Proposal } from '@core/modules/proposal/entities/proposal';

import {
  EstimateRequest as EstimateRequestPrisma,
  Proposal as ProposalPrisma,
} from '@prisma/client';

type EstimateRequestComplete = EstimateRequestPrisma & {
  proposals?: ProposalPrisma[];
};
export class EstimateRequestMapping {
  static toDomain({
    description,
    email,
    footage,
    id,
    name,
    phone,
    user_id,
    proposals,
  }: EstimateRequestComplete) {
    return EstimateRequest.create(
      {
        description,
        email,
        footage,
        name,
        phone,
        user_id,
        proposals: proposals?.map((proposal) =>
          Proposal.create(
            {
              amount: proposal.amount,
              company_id: proposal.company_id,
              description: proposal.description,
              estimate_request_id: proposal.estimate_request_id,
              aproved_at: proposal.aproved_at,
              created_at: proposal.created_at,
              updated_at: proposal.updated_at,
            },
            new UniqueEntityID(proposal.id),
          ),
        ),
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(estimateRequest: EstimateRequest) {
    return {
      description: estimateRequest.description,
      email: estimateRequest.email,
      footage: estimateRequest.footage,
      name: estimateRequest.name,
      phone: estimateRequest.phone,
      user_id: estimateRequest.user_id,
    };
  }
}
