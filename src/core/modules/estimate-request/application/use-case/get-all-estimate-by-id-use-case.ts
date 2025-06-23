import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { EstimateRepository } from '../ports/repositories/estimate-repository';
import { Estimate } from '../../entities/estimate';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  estimate_id: string;
}

type ResponseProps = Either<
  ResourceNotFoundError,
  {
    estimate: Estimate;
  }
>;

@Injectable()
export class GetAllEstimateByIdUseCase {
  constructor(private readonly estimateRepository: EstimateRepository) {}

  async execute({ estimate_id }: RequestProps): Promise<ResponseProps> {
    const estimate = await this.estimateRepository.findById(estimate_id);
    if (!estimate) {
      return left(new ResourceNotFoundError());
    }
    return right({ estimate });
  }
}
