import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { UserPlanRepository } from '../ports/repositories/user-plan-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { startOfMonth } from 'date-fns';
import { PlanUsageRepository } from '../ports/repositories/plan-usage-repository';
import { PlanUsage } from '../../entities/plan-usage';
import { ResourcesAllowed } from '../common/resources-allowed';
import { ResourceExceededError } from '../errors/resource-exceeded-error';
type RequestProps = {
  user_id: string;
  resource: ResourcesAllowed;
  type?: 'monthly' | 'fixed';
};
type ResponseProps = Either<ResourceNotFoundError, { plan_usage: PlanUsage }>;

@Injectable()
export class PlanUsageUseCase {
  constructor(
    private readonly planUsageRepository: PlanUsageRepository,
    private readonly userPlanRepository: UserPlanRepository,
  ) {}

  async execute({
    resource,
    user_id,
    type = 'monthly',
  }: RequestProps): Promise<ResponseProps> {
    const now = new Date();
    const user_plan = await this.userPlanRepository.findActiveByUserId(user_id);
    if (!user_plan) {
      return left(new ResourceNotFoundError('User plan not found'));
    }
    const period = startOfMonth(now);

    let usage = await this.planUsageRepository.findByUserPlanAndPeriod({
      user_plan_id: user_plan.id.toString(),
      resource,
      period: type === 'monthly' ? period : null,
    });

    if (usage) {
      usage.count += 1;
      const limit = user_plan.plan?.resources[resource].limit;
      if (limit && usage.count > limit) {
        return left(new ResourceExceededError(resource));
      }
      await this.planUsageRepository.save(usage);
    } else {
      usage = PlanUsage.create({
        user_plan_id: user_plan.id.toString(),
        resource,
        count: 1,
        period: type === 'monthly' ? period : null,
        created_at: now,
        user_id,
      });
      await this.planUsageRepository.create(usage);
    }
    return right({ plan_usage: usage });
  }
}
