import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { ProgressEstimateRequest } from '@core/modules/estimate-request/entities/progress-estimate-request';
import { Proposal } from '@core/modules/proposal/entities/proposal';

import {
  Proposal as ProposalPrisma,
  Company as PrismaCompany,
  EstimateRequest as PrismaEstimateRequest,
  ProgressEstimateRequest as PrismaProgressEstimateRequest,
} from '@prisma/client';

type ProposalComplete = ProposalPrisma & {
  company?: PrismaCompany;
  estimate_request?: PrismaEstimateRequest;
  progress_estimate_request?: PrismaProgressEstimateRequest[];
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
    estimate_request,
    estimate_id,
    expire_at,
    is_required_visit,
    progress_estimate_request,
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
        estimate_id,
        expire_at,
        is_required_visit,
        progress_estimate_requests: !!progress_estimate_request
          ? progress_estimate_request.map((item) =>
              ProgressEstimateRequest.create(
                {
                  description: item.description,
                  estimate_request_id: item.estimate_request_id,
                  props: item.props as any,
                  title: item.title,
                  type: item.type,
                  created_at: item.created_at,
                  proposal_id: item.proposal_id,
                },
                new UniqueEntityID(item.id),
              ),
            )
          : null,
        estimate_request: !estimate_request
          ? null
          : EstimateRequest.create(
              {
                description: estimate_request.description,
                email: estimate_request.email,
                footage: estimate_request.footage,
                name: estimate_request.name,
                phone: estimate_request.phone,
                user_id: estimate_request.user_id,
                category: estimate_request.category,
                finished_at: estimate_request.finished_at,
                address: {
                  latitude: estimate_request.latitude,
                  longitude: estimate_request.longitude,
                  city: estimate_request.address_city,
                  neighborhood: estimate_request.address_neighborhood,
                  number: estimate_request.address_number,
                  postal_code: estimate_request.address_postal_code,
                  state: estimate_request.address_state,
                  street: estimate_request.address_street,
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
              address_id: company.address_id,
              avatar: company.avatar,
              name: company.name,
              owner_id: company.owner_id,
              ratting: company.ratting,
              email: company.email,
              phone: company.phone,
              website: company.website,
            },
            new UniqueEntityID(company_id),
          ),
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(proposal: Proposal, nesting?: any) {
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
      estimate_id: proposal.estimate_id,
      expire_at: proposal.expire_at,
      is_required_visit: proposal.is_required_visit,
    };
  }
}
