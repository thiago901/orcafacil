import { Module } from '@nestjs/common';
import { ListEstimateRequestsByUserUseCase } from './application/use-case/list-estimate-requests-use-case';
import { CreateEstimateRequestUseCase } from './application/use-case/create-estimate-requests-use-case';
import { ListEstimateRequestsUseCase } from './application/use-case/list-estimate-requests-by-user-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
  ],
  exports: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
  ],
})
export class EstimateRequestModule {}
