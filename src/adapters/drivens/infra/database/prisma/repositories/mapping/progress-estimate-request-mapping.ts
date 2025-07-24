import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { ProgressEstimateRequest } from '@core/modules/estimate-request/entities/progress-estimate-request';

import { ProgressEstimateRequest as ProgressEstimateRequestPrisma } from '@prisma/client';

type ProgressEstimateRequestComplete = ProgressEstimateRequestPrisma;
export class ProgressEstimateRequestMapping {
  static toDomain({
    created_at,
    description,
    estimate_request_id,
    id,
    title,
    type,
  }: ProgressEstimateRequestComplete) {
    return ProgressEstimateRequest.create(
      {
        created_at,
        description,
        estimate_request_id,
        title,
        type,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(progressEstimateRequest: ProgressEstimateRequest) {
    return {
      id: progressEstimateRequest.id.toString(),
      created_at: progressEstimateRequest.created_at,
      description: progressEstimateRequest.description,
      estimate_request_id: progressEstimateRequest.estimate_request_id,
      title: progressEstimateRequest.title,
      type: progressEstimateRequest.type,
    };
  }
}
