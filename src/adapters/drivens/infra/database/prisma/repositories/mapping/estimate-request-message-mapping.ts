import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { EstimateRequestMessage } from '@core/modules/estimate-request/entities/estimate-request-message';

import { Message as EstimateRequestMessagePrisma } from '@prisma/client';

type EstimateRequestComplete = EstimateRequestMessagePrisma;
export class EstimateRequestMessageMapping {
  static toDomain({
    estimate_request_id,
    id,
    content,
    created_at,
    sender,
    type,
    company_id,
    company_name,
    user_name,

    updated_at,
  }: EstimateRequestComplete) {
    return EstimateRequestMessage.create(
      {
        estimate_request_id,
        content,
        sender,
        type,
        company_id,
        company_name,
        user_name,

        created_at,
        updated_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(estimateRequestMessage: EstimateRequestMessage) {
    return {
      id: estimateRequestMessage.id.toString(),
      estimate_request_id: estimateRequestMessage.estimate_request_id,
      content: estimateRequestMessage.content,
      sender: estimateRequestMessage.sender,
      type: estimateRequestMessage.type,
      company_id: estimateRequestMessage.company_id,
      company_name: estimateRequestMessage.company_name,
      user_name: estimateRequestMessage.user_name,
      created_at: estimateRequestMessage.created_at,
      updated_at: estimateRequestMessage.updated_at,
    };
  }
}
