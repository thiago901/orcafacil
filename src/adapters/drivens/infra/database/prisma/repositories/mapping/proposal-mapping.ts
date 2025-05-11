import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';
import { Proposal } from '@core/modules/proposal/entities/proposal';

import {
  Proposal as ProposalPrisma,
  Company as PrismaCompany,
} from '@prisma/client';

type ProposalComplete = ProposalPrisma & {
  company?: PrismaCompany;
};
export class ProposalMapping {
  static toDomain({
    id,
    amount,
    approved_at,
    company_id,
    created_at,
    description,
    estimate_request_id,
    updated_at,
    company,
    reject_at,
  }: ProposalComplete) {
    return Proposal.create(
      {
        amount,
        approved_at,
        company_id,
        created_at,
        description,
        estimate_request_id,
        updated_at,
        reject_at,
        company:
          company &&
          Company.create(
            {
              about: company.about,
              address: null,
              avatar: company.avatar,
              name: company.name,
              owner_id: company.owner_id,
              ratting: company.ratting,
            },
            new UniqueEntityID(company_id),
          ),
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(proposal: Proposal) {
    return {
      id: proposal.id.toString(),
      amount: proposal.amount,
      approved_at: proposal.approved_at,
      company_id: proposal.company_id,
      created_at: proposal.created_at,
      description: proposal.description,
      estimate_request_id: proposal.estimate_request_id,
      updated_at: proposal.updated_at,
      reject_at: proposal.reject_at,
    };
  }
}
