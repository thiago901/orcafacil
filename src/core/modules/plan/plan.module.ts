import { Module } from '@nestjs/common';
import { FindPlanByIdUseCase } from './application/use-case/find-plan-by-id-use-case';
import { GetAllPlansUseCase } from './application/use-case/get-all-plan-by-id-use-case';
import { SubscribePlanUseCase } from './application/use-case/subscribe-plan-use-case';
import { PlanUsageUseCase } from './application/use-case/plan-usage-use-case';

@Module({
  imports: [],

  providers: [
    GetAllPlansUseCase,
    FindPlanByIdUseCase,
    SubscribePlanUseCase,
    PlanUsageUseCase,
  ],
  exports: [
    GetAllPlansUseCase,
    FindPlanByIdUseCase,
    SubscribePlanUseCase,
    PlanUsageUseCase,
  ],
})
export class PlanModule {}
