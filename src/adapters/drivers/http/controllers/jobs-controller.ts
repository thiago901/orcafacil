import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { ListJobsByCompanyUseCase } from '@core/modules/job/application/use-case/list-jobs-by-company-use-case';
import { CreateJobUseCase } from '@core/modules/job/application/use-case/create-job-use-case';
import { JobMapping } from '../mapping/job-mapping';
import {
  CreateJobProps,
  createJobSchema,
} from './validations/create-job.validate';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { GetJobByIdUseCase } from '@core/modules/job/application/use-case/get-jobs-by-id-use-case';
import { UpdateStatusJobUseCase } from '@core/modules/job/application/use-case/update-status-job-use-case';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('/jobs')
@UseInterceptors(LoggingInterceptor)
export class JobsController {
  constructor(
    private readonly listJobsByCompanyUseCase: ListJobsByCompanyUseCase,
    private readonly createJobUseCase: CreateJobUseCase,
    private readonly getJobByIdUseCase: GetJobByIdUseCase,
    private readonly updateStatusJobUseCase: UpdateStatusJobUseCase,
  ) {}

  @Get('/company/:company_id')
  async listAllByCompany(@Param('company_id') company_id: string) {
    const result = await this.listJobsByCompanyUseCase.execute({ company_id });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: result.value.jobs.map(JobMapping.toView),
    };
  }

  @Get('/:id')
  async jobById(@Param('id') id: string) {
    const result = await this.getJobByIdUseCase.execute({ id });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: JobMapping.toView(result.value.job),
    };
  }
  @Post('/')
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async createJob(@Body() body: CreateJobProps) {
    const {
      company_id,
      proposal_id,
      estimate_request_id,
      estimate_id,
      customer_id,
    } = body;
    const result = await this.createJobUseCase.execute({
      company_id,
      proposal_id,
      estimate_request_id,
      estimate_id,
      customer_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: JobMapping.toView(result.value.job),
    };
  }
  @Patch('/status/:id/:status')
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async updateStatus(@Param('status') status: string, @Param('id') id: string) {
    const result = await this.updateStatusJobUseCase.execute({
      id,
      status,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: JobMapping.toView(result.value.job),
    };
  }
}
