import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { GetAllProgressEstimateByEstimateRequestUseCase } from '@core/modules/estimate-request/application/use-case/get-all-progress-estimate-by-estimate-request-use-case';
import { ProgressEstimateRequestMapping } from '../mapping/progress-estimate-request-mapping';
import { CreateProgressEstimateUseCase } from '@core/modules/estimate-request/application/use-case/create-progress-estimate-use-case';

@ApiTags('Progress Estimate Request')
@ApiBearerAuth()
@Controller('/progress-estimate-requests')
@UseInterceptors(LoggingInterceptor)
export class ProgressEstimateRequestController {
  constructor(
    private readonly getAllProgressEstimateByEstimateRequestUseCase: GetAllProgressEstimateByEstimateRequestUseCase,
    private readonly createProgressEstimateUseCase: CreateProgressEstimateUseCase,
  ) {}

  @Get('/estimate_request/:id')
  @HttpCode(200)
  async findAllByEstimateReques(@Param('id') id: string) {
    const result =
      await this.getAllProgressEstimateByEstimateRequestUseCase.execute({
        estimate_request_id: id,
      });
    if (result.isLeft()) {
      throw new HttpException(result.value || 'error', HttpStatus.NOT_FOUND);
    }

    return {
      result: result.value.progressEstimateRequests.map(
        ProgressEstimateRequestMapping.toView,
      ),
    };
  }
  @Post('/estimate_request/:id')
  @HttpCode(200)
  async create(@Param('id') id: string) {
    const result = await this.createProgressEstimateUseCase.execute({
      description: 'lorem iptu',
      estimate_request_id: id,
      title: 'Novo titulo',
      type: 'PROPOSALS_WAITING',
    });
    if (result.isLeft()) {
      throw new HttpException(result.value || 'error', HttpStatus.NOT_FOUND);
    }

    return {
      result: 'ok',
    };
  }
}
