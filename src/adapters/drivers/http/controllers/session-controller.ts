import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import {
  AuthenticateUserProps,
  RecoverPasswordProps,
  authenticateUserSchema,
  recoverPasswordSchema,
} from './validations';
import { CreateSessionUseCase } from '@core/modules/user/application/use-case/create-session-use-case';
import { RecoverPasswordUseCase } from '@core/modules/user/application/use-case/recover-password-use-case';
import { Public } from '@adapters/drivens/infra/auth/public';

@ApiTags('Session')
@ApiBearerAuth()
@Controller('/')
@UseInterceptors(LoggingInterceptor)
export class SessionController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly forgotPasswordUseCase: RecoverPasswordUseCase,
  ) {}

  @Post('/sessions')
  @Public()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateUserSchema))
  async createSession(@Body() body: AuthenticateUserProps) {
    const result = await this.createSessionUseCase.execute(body);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.UNAUTHORIZED);
    }
    return { token: result.value.token };
  }

  @Post('/forgot-password')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(recoverPasswordSchema))
  async forgotPassword(@Body() body: RecoverPasswordProps) {
    const result = await this.forgotPasswordUseCase.execute(body);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }
    return { message: 'Recovery instructions sent' };
  }
}
