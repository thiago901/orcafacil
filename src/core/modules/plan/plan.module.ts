import { Module } from '@nestjs/common';
import { FindPlanByIdUseCase } from './application/use-case/find-plan-by-id-use-case';
import { GetAllPlansUseCase } from './application/use-case/get-all-plan-by-id-use-case';

@Module({
  imports: [],

  providers: [GetAllPlansUseCase, FindPlanByIdUseCase],
  exports: [GetAllPlansUseCase, FindPlanByIdUseCase],
})
export class PlanModule {}
