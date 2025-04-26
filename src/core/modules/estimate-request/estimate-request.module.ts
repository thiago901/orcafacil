import { Module } from '@nestjs/common';
import { ListEstimateRequestsByUserUseCase } from './application/use-case/list-estimate-requests-use-case';
import { CreateEstimateRequestUseCase } from './application/use-case/create-estimate-requests-use-case';
import { ListEstimateRequestsUseCase } from './application/use-case/list-estimate-requests-by-user-use-case';
import { UploadEstimateRequestFilesUseCase } from './application/use-case/upload-estimate-requests-files-use-case';
import { ListEstimateRequestFilesUseCase } from './application/use-case/list-estimate-requests-files-use-case';
import { FindEstimateRequestsByIdUseCase } from './application/use-case/find-estimate-requests-by-id-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
    UploadEstimateRequestFilesUseCase,
    ListEstimateRequestFilesUseCase,
    FindEstimateRequestsByIdUseCase,
  ],
  exports: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
    UploadEstimateRequestFilesUseCase,
    ListEstimateRequestFilesUseCase,
    FindEstimateRequestsByIdUseCase,
  ],
})
export class EstimateRequestModule {}
