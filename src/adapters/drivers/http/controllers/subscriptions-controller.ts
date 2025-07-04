import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { FindSubscriptionByUserIdUseCase } from '@core/modules/plan/application/use-case/find-subsctiption-by-user-id-use-case';
import { UserPlanMapping } from '../mapping/user-plan-mapping';
import { CurrentUser } from '@adapters/drivens/infra/auth/current-user-decorator';
import { TokenPayload } from '@adapters/drivens/infra/auth/jwt.strategy';

@ApiTags('Subscriptions')
@ApiBearerAuth()
@Controller('/subscriptions')
@UseInterceptors(LoggingInterceptor)
export class SubscriptionsController {
  constructor(
    private readonly findSubscriptionByUserIdUseCase: FindSubscriptionByUserIdUseCase,
  ) {}

  @Get('/user')
  @HttpCode(200)
  async getByUserId(@CurrentUser() user: TokenPayload) {
    const result = await this.findSubscriptionByUserIdUseCase.execute({
      user_id: user.sub,
    });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.UNAUTHORIZED);
    }
    return { result: UserPlanMapping.toView(result.value.user_plan) };
  }
}
