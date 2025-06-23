import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRepository } from '../ports/repositories/estimate-repository';
import { Estimate } from '../../entities/estimate';

interface RequestProps {
  estimate_request_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimates: Estimate[];
  }
>;

@Injectable()
export class GetAllEstimateByEstimateRequestUseCase {
  constructor(private readonly estimateRepository: EstimateRepository) {}

  async execute({ estimate_request_id }: RequestProps): Promise<ResponseProps> {
    const estimates =
      await this.estimateRepository.getAllByEstimateRequest(
        estimate_request_id,
      );

    return right({ estimates });
  }
}
