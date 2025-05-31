import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRequestMessageRepository } from '../ports/repositories/estimate-request-repository-message';
import { EstimateRequestMessage } from '../../entities/estimate-request-message';

interface RequestProps {
  estimate_request_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimate_request_messages: EstimateRequestMessage[];
  }
>;

@Injectable()
export class GetAllMessagesByEstimateRequestUseCase {
  constructor(
    private readonly estimateRequestMessageRepository: EstimateRequestMessageRepository,
  ) {}

  async execute({ estimate_request_id }: RequestProps): Promise<ResponseProps> {
    const messages =
      await this.estimateRequestMessageRepository.findByEstimateId(
        estimate_request_id,
      );

    return right({ estimate_request_messages: messages });
  }
}
