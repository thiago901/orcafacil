import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { Public } from '@adapters/drivens/infra/auth/public';

import { CreateEstimateRequestUseCase } from '@core/modules/estimate-request/application/use-case/create-estimate-requests-use-case';
import { ListEstimateRequestsByUserUseCase } from '@core/modules/estimate-request/application/use-case/list-estimate-requests-use-case';
import { ListEstimateRequestsUseCase } from '@core/modules/estimate-request/application/use-case/list-estimate-requests-by-user-use-case';
import {
  CreateEstimateRequestProps,
  createEstimateRequestSchema,
} from './validations/create-estimate-request.validate';
import { EstimateRequestMapping } from '../mapping/estimate-request-mapping';

@ApiTags('Estimate Request')
@ApiBearerAuth()
@Controller('/estimate-requests')
@UseInterceptors(LoggingInterceptor)
export class EstimateRequestController {
  constructor(
    private readonly createEstimateRequestUseCase: CreateEstimateRequestUseCase,
    private readonly listEstimateRequestsByUserUseCase: ListEstimateRequestsByUserUseCase,
    private readonly listEstimateRequestsUseCase: ListEstimateRequestsUseCase,
  ) {}

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createEstimateRequestSchema))
  async create(@Body() body: CreateEstimateRequestProps) {
    const result = await this.createEstimateRequestUseCase.execute(body);
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: EstimateRequestMapping.toView(result.value.estimateRequest),
    };
  }

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.listEstimateRequestsByUserUseCase.execute({
      user_id: id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    return {
      result: result.value.estimateRequests.map(EstimateRequestMapping.toView),
    };
  }

  @Get()
  @HttpCode(200)
  async listAll() {
    const result = await this.listEstimateRequestsUseCase.execute();
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      result: result.value.estimateRequests.map(EstimateRequestMapping.toView),
    };
  }
}
