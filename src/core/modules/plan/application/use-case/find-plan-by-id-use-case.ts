import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { PlanRepository } from '../ports/repositories/plan-repository';
import { ResourceAlreadyExistsError } from '@core/modules/user/application/errors/resource-already-exists-error';
import { Plan } from '../../entities/plan';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  plan_id: string;
}

type ResponseProps = Either<ResourceAlreadyExistsError, { plan: Plan }>;

@Injectable()
export class FindPlanByIdUseCase {
  constructor(private readonly paymentsProvider: PlanRepository) {}

  async execute({ plan_id }: RequestProps): Promise<ResponseProps> {
    const plan = await this.paymentsProvider.findById(plan_id);
    if (!plan) {
      return left(new ResourceNotFoundError());
    }
    return right({ plan });
  }
}
