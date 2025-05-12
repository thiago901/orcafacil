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
  proposal?: PrismaProposal & {
    estimateRequest?: PrismaEstimateRequest;
  };
};
export class JobMapping {
  static toDomain({
    company_id,
    created_at,
    id,
    proposal_id,
    updated_at,
    proposal,
  }: JobComplete) {
    return Job.create(
      {
        company_id,
        proposal_id,
        created_at,
        updated_at,
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
              estimate_request:
                proposal.estimateRequest &&
                EstimateRequest.create(
                  {
                    address: {
                      city: proposal.estimateRequest.address_city,
                      latitude: proposal.estimateRequest.latitude,
                      longitude: proposal.estimateRequest.longitude,
                      neighborhood:
                        proposal.estimateRequest.address_neighborhood,
                      number: proposal.estimateRequest.address_number,
                      postal_code: proposal.estimateRequest.address_postal_code,
                      state: proposal.estimateRequest.address_state,
                      street: proposal.estimateRequest.address_street,
                    },
                    description: proposal.estimateRequest.description,
                    email: proposal.estimateRequest.email,
                    footage: proposal.estimateRequest.footage,
                    name: proposal.estimateRequest.name,
                    phone: proposal.estimateRequest.phone,
                    user_id: proposal.estimateRequest.user_id,
                    created_at: proposal.estimateRequest.created_at,
                    // estimate_request_files:
                    //   proposal.estimateRequest.estimate_request_files,

                    updated_at: proposal.estimateRequest.updated_at,
                  },
                  new UniqueEntityID(proposal.estimateRequest.id),
                ),
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
      created_at: job.created_at,
      updated_at: job.updated_at,
    };
  }
}
