import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRequestMessageRepository } from '../ports/repositories/estimate-request-repository-message';
import { EstimateRequestMessage } from '../../entities/estimate-request-message';

interface RequestProps {
  estimate_request_id: string;
  company_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimate_request_messages: EstimateRequestMessage[];
  }
>;

@Injectable()
export class GetMessagesByEstimateRequestAndCompanyUseCase {
  constructor(
    private readonly estimateRequestMessageRepository: EstimateRequestMessageRepository,
  ) {}

  async execute({
    estimate_request_id,
    company_id,
  }: RequestProps): Promise<ResponseProps> {
    const messages =
      await this.estimateRequestMessageRepository.findByEstimateIdAndCompanyId(
        estimate_request_id,
        company_id,
      );

    return right({ estimate_request_messages: messages });
  }
}
