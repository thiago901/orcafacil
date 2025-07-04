import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { UserPlanRepository } from '../ports/repositories/user-plan-repository';
import { UserPlan } from '../../entities/user-plan';

interface RequestProps {
  user_id: string;
}

type ResponseProps = Either<ResourceNotFoundError, { user_plan: UserPlan }>;

@Injectable()
export class FindSubscriptionByUserIdUseCase {
  constructor(private readonly userPlanRepository: UserPlanRepository) {}

  async execute({ user_id }: RequestProps): Promise<ResponseProps> {
    const user_plan = await this.userPlanRepository.findByUser(user_id);
    if (!user_plan) {
      return left(new ResourceNotFoundError());
    }
    return right({ user_plan });
  }
}
