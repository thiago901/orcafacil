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
  Patch,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import {
  createUserSchema,
  CreateUserProps,
  UpdateUserProps,
  updateUserSchema,
} from './validations';
import { CreateUserUseCase } from '@core/modules/user/application/use-case/create-user-use-case';
import { UpdateUserUseCase } from '@core/modules/user/application/use-case/update-user-use-case';
import { DeleteUserUseCase } from '@core/modules/user/application/use-case/delete-user-use-case';
import { ListAllUsersUseCase } from '@core/modules/user/application/use-case/list-all-users-use-case';
import { UserMapping } from '../mapping/user-mapping';
import { FindUserByIdUseCase } from '@core/modules/user/application/use-case/find-user-by-id-use-case';
import { Public } from '@adapters/drivens/infra/auth/public';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadProfileImageUseCase } from '@core/modules/user/application/use-case/upload-profile-image-use-case';
import { CurrentUser } from '@adapters/drivens/infra/auth/current-user-decorator';
import { TokenPayload } from '@adapters/drivens/infra/auth/jwt.strategy';
import { ActivateUserUseCase } from '@core/modules/user/application/use-case/acivate-user-use-case';

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
    private readonly uploadProfileImageUseCase: UploadProfileImageUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
  ) {}

  @Post('/')
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserProps) {
    const result = await this.createUserUseCase.execute(body);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }
    return { result: UserMapping.toView(result.value.user) };
  }

  @Put('/:id')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async update(@Param('id') id: string, @Body() body: UpdateUserProps) {
    const result = await this.updateUserUseCase.execute({ id, ...body });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }
    return { result: UserMapping.toView(result.value.user) };
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
    return { result: UserMapping.toView(result.value.user) };
  }
  @Get('/profile/me')
  @HttpCode(200)
  async profile(@CurrentUser() user: TokenPayload) {
    const result = await this.findUserByIdUseCase.execute({ id: user.sub });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);
    }
    return { result: UserMapping.toView(result.value.user) };
  }
  @Post('/activate/:token')
  @HttpCode(200)
  @Public()
  async activateUser(@Param('token') token: string) {
    const result = await this.activateUserUseCase.execute({ token });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);
    }
    return {
      result: {
        message: 'SUCESS',
      },
    };
  }

  @Get('/')
  @HttpCode(200)
  async listAll() {
    const result = await this.listAllUsersUseCase.execute();
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { result: result.value.users.map(UserMapping.toView) };
  }

  @Patch('/:id/file')
  @UseInterceptors(FileInterceptor('file'))
  @Public()
  async uploadFiles(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') user_id: string,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado!');
    }

    await this.uploadProfileImageUseCase.execute({
      file,
      user_id,
    });

    return {
      status: 201,
      message:
        'The video is being uploaded and we will inform you of the next statuses!',
    };
  }
}
