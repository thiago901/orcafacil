import { Module } from '@nestjs/common';
import { ListEstimateRequestsByUserUseCase } from './application/use-case/list-estimate-requests-use-case';
import { CreateEstimateRequestUseCase } from './application/use-case/create-estimate-requests-use-case';
import { ListEstimateRequestsUseCase } from './application/use-case/list-estimate-requests-by-user-use-case';
import { UploadEstimateRequestFilesUseCase } from './application/use-case/upload-estimate-requests-files-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
    UploadEstimateRequestFilesUseCase,
  ],
  exports: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
    UploadEstimateRequestFilesUseCase,
  ],
})
export class EstimateRequestModule {}
