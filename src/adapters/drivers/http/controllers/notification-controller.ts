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
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { Public } from '@adapters/drivens/infra/auth/public';
import { CreateNotificationUseCase } from '@core/modules/notification/application/use-case/create-notification-use-case';
import { ListNotificationByRecipientIdUseCase } from '@core/modules/notification/application/use-case/list-notification-by-recipient-id-use-case copy';
import { GetNotificationByIdUseCase } from '@core/modules/notification/application/use-case/get-notification-by-id-use-case';
import { NotificationMapping } from '../mapping/notification-mapping';
import {
  CreateNotificationProps,
  createNotificationSchema,
} from './validations/create-notification.validate';
import { UpdateNotificationByRecipientIdUseCase } from '@core/modules/notification/application/use-case/update-notification-by-recipient-id-use-case';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('/notifications')
@UseInterceptors(LoggingInterceptor)
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly listNotificationByRecipientIdUseCase: ListNotificationByRecipientIdUseCase,
    private readonly getNotificationByIdUseCase: GetNotificationByIdUseCase,
    private readonly updateNotificationByRecipientIdUseCase: UpdateNotificationByRecipientIdUseCase,
  ) {}

  @Post('')
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createNotificationSchema))
  async create(@Body() body: CreateNotificationProps) {
    const result = await this.createNotificationUseCase.execute(body);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }
    return { result: NotificationMapping.toView(result.value.notification) };
  }

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.getNotificationByIdUseCase.execute({ id });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);
    }
    return { result: NotificationMapping.toView(result.value.notification) };
  }

  @Get('/user/:recipient_id')
  @HttpCode(200)
  async listAll(@Param('recipient_id') recipient_id: string) {
    const result = await this.listNotificationByRecipientIdUseCase.execute({
      recipient_id,
    });
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      result: result.value.notifications.map(NotificationMapping.toView),
    };
  }
  @Put('/:id')
  @HttpCode(200)
  async update(@Param('id') id: string) {
    const result = await this.updateNotificationByRecipientIdUseCase.execute({
      id,
    });
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      result: NotificationMapping.toView(result.value.notification),
    };
  }
}
