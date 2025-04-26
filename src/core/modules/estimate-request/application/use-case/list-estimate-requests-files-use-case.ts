import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRequestFile } from '../../entities/estimate-request-file';
import { EstimateRequestFileRepository } from '../ports/repositories/estimate-request-repository-file';

interface RequestProps {
  estimate_request_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimate_files: EstimateRequestFile[];
  }
>;

@Injectable()
export class ListEstimateRequestFilesUseCase {
  constructor(
    private readonly estimateRequestFileRepository: EstimateRequestFileRepository,
  ) {}

  async execute({ estimate_request_id }: RequestProps): Promise<ResponseProps> {
    const estimate_files =
      await this.estimateRequestFileRepository.findByEstimateId(
        estimate_request_id,
      );

    return right({ estimate_files });
  }
}
