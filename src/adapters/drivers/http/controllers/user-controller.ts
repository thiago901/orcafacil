import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  Delete,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import {
  createUserSchema,
  CreateUserProps,
  AuthenticateUserProps,
  ListUsersFiltersProps,
  RecoverPasswordProps,
  UpdateUserProps,
  authenticateUserSchema,
  listUsersFiltersSchema,
  recoverPasswordSchema,
  updateUserSchema,
} from './validations';
import { CreateUserUseCase } from '@core/modules/user/application/use-case/create-user-use-case';
import { UpdateUserUseCase } from '@core/modules/user/application/use-case/update-user-use-case';
import { DeleteUserUseCase } from '@core/modules/user/application/use-case/delete-user-use-case';
import { ListAllUsersUseCase } from '@core/modules/user/application/use-case/list-all-users-use-case';
import { CreateSessionUseCase } from '@core/modules/user/application/use-case/create-session-use-case';
import { RecoverPasswordUseCase } from '@core/modules/user/application/use-case/recover-password-use-case';
import { UserMapping } from '../mapping/user-mapping';
import { FindUserByIdUseCase } from '@core/modules/user/application/use-case/find-user-by-id-use-case';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/users')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly forgotPasswordUseCase: RecoverPasswordUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserProps) {
    const result = await this.createUserUseCase.execute(body);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }
    return { user: UserMapping.toView(result.value.user) };
  }

  @Put('/:id')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async update(@Param('id') id: string, @Body() body: UpdateUserProps) {
    const result = await this.updateUserUseCase.execute({ id, ...body });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }
    return { user: UserMapping.toView(result.value.user) };
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const result = await this.deleteUserUseCase.execute({ id });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);
    }
    return;
  }

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.findUserByIdUseCase.execute({ id });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);
    }
    return { user: UserMapping.toView(result.value.user) };
  }

  @Get()
  @HttpCode(200)
  async listAll() {
    const result = await this.listAllUsersUseCase.execute();
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { users: result.value.users.map(UserMapping.toView) };
  }

  @Post('/sessions')
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
