import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { EstimateRequestFile } from '@core/modules/estimate-request/entities/estimate-request-file';

import { EstimateRequestFile as EstimateRequestFilePrisma } from '@prisma/client';

type EstimateRequestComplete = EstimateRequestFilePrisma;
export class EstimateRequestFileMapping {
  static toDomain({ estimate_request_id, id, url }: EstimateRequestComplete) {
    return EstimateRequestFile.create(
      {
        url,
        estimate_request_id,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(estimateRequestFile: EstimateRequestFile) {
    return {
      created_at: estimateRequestFile.created_at,
      estimate_request_id: estimateRequestFile.estimate_request_id,
      url: estimateRequestFile.url,
      id: estimateRequestFile.id.toString(),
    };
  }
}
