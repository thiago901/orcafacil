import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';

import { EstimateRequest as EstimateRequestPrisma } from '@prisma/client';

export class EstimateRequestMapping {
  static toDomain({
    description,
    email,
    footage,
    id,
    name,
    phone,
    user_id,
  }: EstimateRequestPrisma) {
    return EstimateRequest.create(
      {
        description,
        email,
        footage,
        name,
        phone,
        user_id,
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
