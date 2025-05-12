import { Module } from '@nestjs/common';
import { ListJobsByCompanyUseCase } from './application/use-case/list-jobs-by-company-use-case';
import { CreateJobUseCase } from './application/use-case/create-job-use-case';
import { GetJobByIdUseCase } from './application/use-case/get-jobs-by-id-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [ListJobsByCompanyUseCase, CreateJobUseCase, GetJobByIdUseCase],
  exports: [ListJobsByCompanyUseCase, CreateJobUseCase, GetJobByIdUseCase],
})
export class JobModule {}
