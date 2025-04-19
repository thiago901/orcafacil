import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  user_id?: string;
  description: string;
  email: string;
  footage: number;
  name: string;
  phone: string;
}

type ResponseProps = Either<
  null,
  {
    estimateRequest: EstimateRequest;
  }
>;

@Injectable()
export class CreateEstimateRequestUseCase {
  constructor(
    private readonly estimateRequestRepository: EstimateRequestRepository,
  ) {}

  async execute({
    user_id,
    description,
    email,
    footage,
    name,
    phone,
  }: RequestProps): Promise<ResponseProps> {
    const estimateRequest = EstimateRequest.create({
      description,
      email,
      footage,
      name,
      phone,
      user_id: user_id || null,
    });

    await this.estimateRequestRepository.save(estimateRequest);

    return right({ estimateRequest });
  }
}
