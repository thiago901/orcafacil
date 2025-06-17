import { Injectable } from '@nestjs/common';

import {
  CheckAndConsumeParams,
  UsagePlanProvider,
} from '@core/common/application/ports/providers/usage-plan-provider';

import { PlanUsageUseCase } from '@core/modules/plan/application/use-case/plan-usage-use-case';

@Injectable()
export class CustomerUsagePlanProvider implements UsagePlanProvider {
  constructor(private readonly planUsageUseCase: PlanUsageUseCase) {}
  async checkAndConsumeMonthly({
    resource,
    user_id,
  }: CheckAndConsumeParams): Promise<void> {
    await this.planUsageUseCase.execute({ user_id, resource });
  }
  async checkAndConsumeFixed({
    resource,
    user_id,
  }: CheckAndConsumeParams): Promise<void> {
    const result = await this.planUsageUseCase.execute({
      user_id,
      resource,
      type: 'fixed',
    });
    if (result.isLeft()) {
      throw result.value;
    }
  }
}
