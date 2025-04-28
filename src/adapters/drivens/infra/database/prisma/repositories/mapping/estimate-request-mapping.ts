import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestFile } from '@core/modules/estimate-request/entities/estimate-request-file';
import { Proposal } from '@core/modules/proposal/entities/proposal';

import {
  EstimateRequest as EstimateRequestPrisma,
  Proposal as ProposalPrisma,
  EstimateRequestFile as EstimateRequestFilePrisma,
} from '@prisma/client';

type EstimateRequestComplete = EstimateRequestPrisma & {
  proposals?: ProposalPrisma[];
  files?: EstimateRequestFilePrisma[];
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
    latitude,
    longitude,
    proposals,
    files,
  }: EstimateRequestComplete) {
    return EstimateRequest.create(
      {
        description,
        email,
        footage,
        name,
        phone,
        user_id,
        latitude,
        longitude,
        proposals: proposals?.map((proposal) =>
          Proposal.create(
            {
              amount: proposal.amount,
              company_id: proposal.company_id,
              description: proposal.description,
              estimate_request_id: proposal.estimate_request_id,
              approved_at: proposal.approved_at,
              created_at: proposal.created_at,
              updated_at: proposal.updated_at,
            },
            new UniqueEntityID(proposal.id),
          ),
        ),
        estimate_request_files: files?.map((file) =>
          EstimateRequestFile.create(
            {
              estimate_request_id: file.estimate_request_id,
              url: file.url,
              created_at: file.created_at,
            },
            new UniqueEntityID(file.id),
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
      latitude: estimateRequest.latitude,
      longitude: estimateRequest.longitude,
      user_id: estimateRequest.user_id,
      id: estimateRequest.id.toString(),
    };
  }
}
