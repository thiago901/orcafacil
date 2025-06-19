import { Module } from '@nestjs/common';
import { ListEstimateRequestsByUserUseCase } from './application/use-case/list-estimate-requests-use-case';
import { CreateEstimateRequestUseCase } from './application/use-case/create-estimate-requests-use-case';
import { ListEstimateRequestsUseCase } from './application/use-case/list-estimate-requests-by-user-use-case';
import { UploadEstimateRequestFilesUseCase } from './application/use-case/upload-estimate-requests-files-use-case';
import { ListEstimateRequestFilesUseCase } from './application/use-case/list-estimate-requests-files-use-case';
import { FindEstimateRequestsByIdUseCase } from './application/use-case/find-estimate-requests-by-id-use-case';
import { CreateEstimateRequestMessageUseCase } from './application/use-case/create-estimate-requests-message-use-case';
import { GetAllMessagesByEstimateRequestUseCase } from './application/use-case/get-all-messages-by-estimate-requests-use-case';
import { GetMessagesByEstimateRequestAndCompanyUseCase } from './application/use-case/get-messages-by-estimate-requests-and-company-use-case copy';
import { WebSocketModule } from '@adapters/drivers/web-socket/web-socket.module';
import { GetAllMessagesGroupByCompanyUseCase } from './application/use-case/get-all-messages-group-by-company-use-case';
import { GetAllMessagesGroupByIdUseCase } from './application/use-case/get-all-messages-by-id-use-case';

@Module({
  imports: [WebSocketModule],
  controllers: [],
  providers: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
    UploadEstimateRequestFilesUseCase,
    ListEstimateRequestFilesUseCase,
    FindEstimateRequestsByIdUseCase,
    CreateEstimateRequestMessageUseCase,
    GetAllMessagesByEstimateRequestUseCase,
    GetMessagesByEstimateRequestAndCompanyUseCase,
    GetAllMessagesGroupByCompanyUseCase,
    GetAllMessagesGroupByIdUseCase,
  ],
  exports: [
    ListEstimateRequestsByUserUseCase,
    CreateEstimateRequestUseCase,
    ListEstimateRequestsUseCase,
    UploadEstimateRequestFilesUseCase,
    ListEstimateRequestFilesUseCase,
    FindEstimateRequestsByIdUseCase,
    CreateEstimateRequestMessageUseCase,
    GetAllMessagesByEstimateRequestUseCase,
    GetMessagesByEstimateRequestAndCompanyUseCase,
    GetAllMessagesGroupByCompanyUseCase,
    GetAllMessagesGroupByIdUseCase,
  ],
})
export class EstimateRequestModule {}
