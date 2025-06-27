import { Injectable } from '@nestjs/common';

import {
  CheckAndConsumeParams,
  UsagePlanProvider,
} from '@core/common/application/ports/providers/usage-plan-provider';

import { PlanUsageUseCase } from '@core/modules/plan/application/use-case/plan-usage-use-case';
import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

@Injectable()
export class CustomerUsagePlanProvider implements UsagePlanProvider {
  constructor(
    private readonly planUsageUseCase: PlanUsageUseCase,
    private readonly userRepository: UserRepository,
  ) {}
  async checkAndConsumeMonthly({
    resource,
    user_id,
  }: CheckAndConsumeParams): Promise<void> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    if (user.role === 'company') {
      await this.planUsageUseCase.execute({ user_id, resource });
    }
  }
  async checkAndConsumeFixed({
    resource,
    user_id,
  }: CheckAndConsumeParams): Promise<boolean> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    if (user.role === 'company') {
      const result = await this.planUsageUseCase.execute({
        user_id,
        resource,
        type: 'fixed',
      });
      if (result.isLeft()) {
        return false;
      }
    }

    return true;
  }
}
