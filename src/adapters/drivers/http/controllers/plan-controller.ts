import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { PlanMapping } from '../mapping/plan-mapping';
import { FindPlanByIdUseCase } from '@core/modules/plan/application/use-case/find-plan-by-id-use-case';
import { GetAllPlansUseCase } from '@core/modules/plan/application/use-case/get-all-plan-by-id-use-case';
import { Public } from '@adapters/drivens/infra/auth/public';

@ApiTags('Plan')
@ApiBearerAuth()
@Controller('/plans')
@UseInterceptors(LoggingInterceptor)
export class PlanController {
  constructor(
    private readonly findPlanByIdUseCase: FindPlanByIdUseCase,
    private readonly getAllPlansUseCase: GetAllPlansUseCase,
  ) {}

  @Get('/:plan_id')
  @HttpCode(200)
  async getById(@Param('plan_id') plan_id: string) {
    const result = await this.findPlanByIdUseCase.execute({ plan_id });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.UNAUTHORIZED);
    }
    return { result: PlanMapping.toView(result.value.plan) };
  }
  @Get('/')
  @Public()
  @HttpCode(200)
  async getAll() {
    const result = await this.getAllPlansUseCase.execute();
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.UNAUTHORIZED);
    }
    return { result: result.value.plans.map(PlanMapping.toView) };
  }
}
