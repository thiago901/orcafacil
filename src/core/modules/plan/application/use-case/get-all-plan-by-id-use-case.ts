import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { PlanRepository } from '../ports/providers/plan-repository';
import { ResourceAlreadyExistsError } from '@core/modules/user/application/errors/resource-already-exists-error';
import { Plan } from '../../entities/plan';

type ResponseProps = Either<ResourceAlreadyExistsError, { plans: Plan[] }>;

@Injectable()
export class GetAllPlansUseCase {
  constructor(private readonly paymentsProvider: PlanRepository) {}

  async execute(): Promise<ResponseProps> {
    const plans = await this.paymentsProvider.getAll();
    return right({ plans });
  }
}
