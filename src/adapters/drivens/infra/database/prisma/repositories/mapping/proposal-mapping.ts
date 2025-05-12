import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { Proposal } from '@core/modules/proposal/entities/proposal';

import {
  Proposal as ProposalPrisma,
  Company as PrismaCompany,
  EstimateRequest as PrismaEstimateRequest,
} from '@prisma/client';

type ProposalComplete = ProposalPrisma & {
  company?: PrismaCompany;
  estimateRequest?: PrismaEstimateRequest;
};
export class ProposalMapping {
  static toDomain({
    id,
    name,
    amount,
    approved_at,
    company_id,
    created_at,
    description,
    estimate_request_id,
    updated_at,
    company,
    reject_at,
    estimateRequest,
  }: ProposalComplete) {
    return Proposal.create(
      {
        name,
        amount,
        approved_at,
        company_id,
        created_at,
        description,
        estimate_request_id,
        updated_at,
        reject_at,
        estimate_request: !estimateRequest
          ? null
          : EstimateRequest.create(
              {
                description: estimateRequest.description,
                email: estimateRequest.email,
                footage: estimateRequest.footage,
                name: estimateRequest.name,
                phone: estimateRequest.phone,
                user_id: estimateRequest.user_id,
                address: {
                  latitude: estimateRequest.latitude,
                  longitude: estimateRequest.longitude,
                  city: estimateRequest.address_city,
                  neighborhood: estimateRequest.address_neighborhood,
                  number: estimateRequest.address_number,
                  postal_code: estimateRequest.address_postal_code,
                  state: estimateRequest.address_state,
                  street: estimateRequest.address_street,
                },
              },
              new UniqueEntityID(estimate_request_id),
            ),
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
      name: proposal.name,
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
