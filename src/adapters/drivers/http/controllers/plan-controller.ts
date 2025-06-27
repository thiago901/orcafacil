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

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { PlanMapping } from '../mapping/plan-mapping';
import { FindPlanByIdUseCase } from '@core/modules/plan/application/use-case/find-plan-by-id-use-case';
import { GetAllPlansUseCase } from '@core/modules/plan/application/use-case/get-all-plan-by-id-use-case';
import { Public } from '@adapters/drivens/infra/auth/public';
import { SubscribePlanUseCase } from '@core/modules/plan/application/use-case/subscribe-plan-use-case';
import { CurrentUser } from '@adapters/drivens/infra/auth/current-user-decorator';
import {
  SubscribePlanProps,
  subscribePlanSchema,
} from './validations/subscribe-plan.validate';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { TokenPayload } from '@adapters/drivens/infra/auth/jwt.strategy';

@ApiTags('Plan')
@ApiBearerAuth()
@Controller('/plans')
@UseInterceptors(LoggingInterceptor)
export class PlanController {
  constructor(
    private readonly findPlanByIdUseCase: FindPlanByIdUseCase,
    private readonly getAllPlansUseCase: GetAllPlansUseCase,
    private readonly subscribePlanUseCase: SubscribePlanUseCase,
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

  @Post('/subscribe/:plan_id')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(subscribePlanSchema))
  async subscribe(
    @Param('plan_id') plan_id: string,
    @CurrentUser() user: TokenPayload,
    @Body() body: SubscribePlanProps,
  ) {
    const result = await this.subscribePlanUseCase.execute({
      plan_id,
      plan_type: body.plan_type,
      user_id: user.sub,
    });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.UNAUTHORIZED);
    }
    return { result: {}, success: true };
  }
}
