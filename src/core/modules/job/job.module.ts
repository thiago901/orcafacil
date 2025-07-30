import { Module } from '@nestjs/common';
import { ListJobsByCompanyUseCase } from './application/use-case/list-jobs-by-company-use-case';
import { CreateJobUseCase } from './application/use-case/create-job-use-case';
import { GetJobByIdUseCase } from './application/use-case/get-jobs-by-id-use-case';
import { UpdateStatusJobUseCase } from './application/use-case/update-status-job-use-case';
import { UpdateJobByProposalUseCase } from './application/use-case/update-job-by-proposal-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListJobsByCompanyUseCase,
    CreateJobUseCase,
    GetJobByIdUseCase,
    UpdateStatusJobUseCase,
    UpdateJobByProposalUseCase,
  ],
  exports: [
    ListJobsByCompanyUseCase,
    CreateJobUseCase,
    GetJobByIdUseCase,
    UpdateStatusJobUseCase,
    UpdateJobByProposalUseCase,
  ],
})
export class JobModule {}
