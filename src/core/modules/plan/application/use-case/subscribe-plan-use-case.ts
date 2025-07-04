import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { PlanRepository } from '../ports/repositories/plan-repository';
import { UserPlanRepository } from '../ports/repositories/user-plan-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { PlanType, UserPlan } from '../../entities/user-plan';
import { addMonths, addYears } from 'date-fns';
import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
type RequestProps = {
  plan_id: string;
  user_id: string;
  plan_type: PlanType;
};
type ResponseProps = Either<ResourceNotFoundError, { user_plan: UserPlan }>;

@Injectable()
export class SubscribePlanUseCase {
  constructor(
    private readonly paymentsProvider: PlanRepository,
    private readonly userPlanRepository: UserPlanRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    plan_id,
    user_id,
    plan_type,
  }: RequestProps): Promise<ResponseProps> {
    const now = new Date();
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      return left(new ResourceNotFoundError('User not found'));
    }
    const current_plan = await this.userPlanRepository.findActiveByUserId(
      user.id.toString(),
    );
    if (current_plan) {
      current_plan.status = 'expired';
      current_plan.end_date = now;
      await this.userPlanRepository.save(current_plan);
    }
    const plan = await this.paymentsProvider.findById(plan_id);
    if (!plan) {
      return left(new ResourceNotFoundError('Plan not found'));
    }
    const duration = this.duration(plan_type, now);

    const user_plan = UserPlan.create({
      user_id: user.id.toString(),
      plan_id: plan_id,
      plan_type: plan_type,
      price: plan_type === 'monthly' ? plan.price_month : plan.price_year,
      status: 'active',
      start_date: now,
      end_date: plan_id === 'free' ? null : duration,
    });

    await this.userPlanRepository.create(user_plan);
    return right({ user_plan });
  }

  private duration(plan_type: PlanType, now: Date) {
    const result = {
      monthly: addMonths(now, 1),
      yearly: addYears(now, 1),
    };
    return result[plan_type];
  }
}
