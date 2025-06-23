import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestFile } from '@core/modules/estimate-request/entities/estimate-request-file';
import { Proposal } from '@core/modules/proposal/entities/proposal';
import { User } from '@core/modules/user/entities/user';

import {
  EstimateRequest as EstimateRequestPrisma,
  Proposal as ProposalPrisma,
  EstimateRequestFile as EstimateRequestFilePrisma,
  User as UserPrisma,
} from '@prisma/client';

type EstimateRequestComplete = EstimateRequestPrisma & {
  proposals?: ProposalPrisma[];
  files?: EstimateRequestFilePrisma[];
  user?: UserPrisma;
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
    address_city,
    address_neighborhood,
    address_number,
    address_postal_code,
    address_state,
    address_street,
    category,
    proposals,
    files,
    finished_at,
    user,
  }: EstimateRequestComplete) {
    return EstimateRequest.create(
      {
        description,
        email,
        footage,
        name,
        phone,
        user_id,
        category,
        finished_at,
        user: !user
          ? null
          : User.create(
              {
                avatar: user.avatar,
                email: user.email,
                name: user.name,
                password: '',
                phone: user.phone,
                role: user.role,
                active: user.active,
              },
              new UniqueEntityID(user.id),
            ),
        address: {
          latitude,
          longitude,
          city: address_city,
          neighborhood: address_neighborhood,
          number: address_number,
          postal_code: address_postal_code,
          state: address_state,
          street: address_street,
        },
        proposals: proposals?.map((proposal) =>
          Proposal.create(
            {
              name: proposal.name,
              estimate_id: proposal.estimate_id,
              expire_at: proposal.expire_at,
              reject_at: proposal.reject_at,
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
      category: estimateRequest.category,
      latitude: estimateRequest.address.latitude,
      longitude: estimateRequest.address.longitude,
      address_city: estimateRequest.address.city,
      address_neighborhood: estimateRequest.address.neighborhood,
      address_number: estimateRequest.address.number,
      address_postal_code: estimateRequest.address.postal_code,
      address_state: estimateRequest.address.state,
      address_street: estimateRequest.address.street,
      user_id: estimateRequest.user_id,
      id: estimateRequest.id.toString(),
      created_at: estimateRequest.created_at,
      updated_at: estimateRequest.updated_at,
    };
  }
}
