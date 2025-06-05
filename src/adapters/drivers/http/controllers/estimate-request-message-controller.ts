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

import { CreateEstimateRequestMessageUseCase } from '@core/modules/estimate-request/application/use-case/create-estimate-requests-message-use-case';
import { GetAllMessagesByEstimateRequestUseCase } from '@core/modules/estimate-request/application/use-case/get-all-messages-by-estimate-requests-use-case';
import { EstimateRequestMesssageMapping } from '../mapping/estimate-request-message-mapping';
import {
  CreateEstimateRequestMessageProps,
  createEstimateRequestMessageSchema,
} from './validations/create-estimate-request-message.validate';
import { CurrentUser } from '@adapters/drivens/infra/auth/current-user-decorator';
import { TokenPayload } from '@adapters/drivens/infra/auth/jwt.strategy';
import { GetMessagesByEstimateRequestAndCompanyUseCase } from '@core/modules/estimate-request/application/use-case/get-messages-by-estimate-requests-and-company-use-case copy';
import { GetAllMessagesGroupByCompanyUseCase } from '@core/modules/estimate-request/application/use-case/get-all-messages-group-by-company-use-case';

@ApiTags('Estimate Request Message')
@ApiBearerAuth()
@Controller('/estimate-requests-message')
@UseInterceptors(LoggingInterceptor)
export class EstimateRequestMessageController {
  constructor(
    private readonly createEstimateRequestMessageUseCase: CreateEstimateRequestMessageUseCase,
    private readonly getAllMessagesByEstimateRequestUseCase: GetAllMessagesByEstimateRequestUseCase,
    private readonly getMessagesByEstimateRequestAndCompanyUseCase: GetMessagesByEstimateRequestAndCompanyUseCase,
    private readonly getAllMessagesGroupByCompanyUseCase: GetAllMessagesGroupByCompanyUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createEstimateRequestMessageSchema))
  async create(
    @Body() body: CreateEstimateRequestMessageProps,
    @CurrentUser() user: TokenPayload,
  ) {
    const { company_id, content, estimate_request_id, sender, type } = body;

    const result = await this.createEstimateRequestMessageUseCase.execute({
      company_id,
      content,
      estimate_request_id,
      sender,
      type,
      user_id: user.sub,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: EstimateRequestMesssageMapping.toView(
        result.value.estimate_request_message,
      ),
    };
  }

  @Get('/:estimate_request_id')
  @HttpCode(200)
  async findByEsitmateId(
    @Param('estimate_request_id') estimate_request_id: string,
  ) {
    const result = await this.getAllMessagesByEstimateRequestUseCase.execute({
      estimate_request_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }

    return {
      result: result.value.estimate_request_messages.map(
        EstimateRequestMesssageMapping.toView,
      ),
    };
  }

  @Get('/:estimate_request_id/company')
  @HttpCode(200)
  async findByEsitmateIdCompany(
    @Param('estimate_request_id') estimate_request_id: string,
  ) {
    const result = await this.getAllMessagesGroupByCompanyUseCase.execute({
      estimate_request_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }

    return {
      result: result.value.estimate_request_messages,
    };
  }

  @Get('/:estimate_request_id/company/:company_id')
  @HttpCode(200)
  async findByEstimateAndCompany(
    @Param('estimate_request_id') estimate_request_id: string,
    @Param('company_id') company_id: string,
  ) {
    const result =
      await this.getMessagesByEstimateRequestAndCompanyUseCase.execute({
        estimate_request_id,
        company_id,
      });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }

    return {
      result: result.value.estimate_request_messages.map(
        EstimateRequestMesssageMapping.toView,
      ),
    };
  }
}
