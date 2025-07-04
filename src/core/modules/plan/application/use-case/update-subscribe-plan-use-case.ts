import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { UserPlanRepository } from '../ports/repositories/user-plan-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { UserPlan } from '../../entities/user-plan';

import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
type RequestProps = {
  user_id: string;
  end_date?: Date;
};
type ResponseProps = Either<ResourceNotFoundError, { user_plan: UserPlan }>;

@Injectable()
export class UpdateSubscribePlanUseCase {
  constructor(
    private readonly userPlanRepository: UserPlanRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ user_id, end_date }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      return left(new ResourceNotFoundError('User not found'));
    }
    const current_plan = await this.userPlanRepository.findActiveByUserId(
      user.id.toString(),
    );
    if (!current_plan) {
      return left(new ResourceNotFoundError('Plan not found'));
    }
    current_plan.end_date = end_date ?? current_plan.end_date;
    await this.userPlanRepository.save(current_plan);
    return right({ user_plan: current_plan });
  }
}
