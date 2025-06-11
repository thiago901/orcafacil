import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';

import { Job } from '@core/modules/job/entities/job';
import { Proposal } from '@core/modules/proposal/entities/proposal';

import {
  Job as PrismaJob,
  EstimateRequest as PrismaEstimateRequest,
  Proposal as PrismaProposal,
} from '@prisma/client';
type JobComplete = PrismaJob & {
  estimate_request?: PrismaEstimateRequest;
  proposal?: PrismaProposal;
};
export class JobMapping {
  static toDomain({
    company_id,
    created_at,
    id,
    proposal_id,
    estimate_request_id,
    updated_at,
    estimate_request,
    proposal,
  }: JobComplete) {
    return Job.create(
      {
        company_id,
        proposal_id,
        created_at,
        updated_at,
        estimate_request_id,
        estimate_request:
          estimate_request &&
          EstimateRequest.create(
            {
              finished_at: estimate_request.finished_at,
              address: {
                city: estimate_request.address_city,
                latitude: estimate_request.latitude,
                longitude: estimate_request.longitude,
                neighborhood: estimate_request.address_neighborhood,
                number: estimate_request.address_number,
                postal_code: estimate_request.address_postal_code,
                state: estimate_request.address_state,
                street: estimate_request.address_street,
              },
              category: estimate_request.category,
              description: estimate_request.description,
              email: estimate_request.email,
              footage: estimate_request.footage,
              name: estimate_request.name,
              phone: estimate_request.phone,
              user_id: estimate_request.user_id,
              created_at: estimate_request.created_at,
              updated_at: estimate_request.updated_at,
            },
            new UniqueEntityID(estimate_request.id),
          ),
        proposal:
          proposal &&
          Proposal.create(
            {
              name: proposal.name,
              amount: proposal.amount,
              company_id: proposal.company_id,
              description: proposal.description,
              estimate_request_id: proposal.estimate_request_id,
              approved_at: proposal.approved_at,
              created_at: proposal.created_at,
              reject_at: proposal.reject_at,
              updated_at: proposal.updated_at,
            },
            new UniqueEntityID(proposal_id),
          ),
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(job: Job) {
    return {
      id: job.id.toString(),
      company_id: job.company_id,
      proposal_id: job.proposal_id,
      estimate_request_id: job.estimate_request_id,
      created_at: job.created_at,
      updated_at: job.updated_at,
    };
  }
}
