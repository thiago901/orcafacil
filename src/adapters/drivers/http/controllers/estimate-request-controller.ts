import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFiles,
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
import { FilesInterceptor } from '@nestjs/platform-express';

import { UploadEstimateRequestFilesUseCase } from '@core/modules/estimate-request/application/use-case/upload-estimate-requests-files-use-case';
import { ListEstimateRequestFilesUseCase } from '@core/modules/estimate-request/application/use-case/list-estimate-requests-files-use-case';
import { EstimateRequestFilesMapping } from '../mapping/estimate-request-files-mapping';
import { FindEstimateRequestsByIdUseCase } from '@core/modules/estimate-request/application/use-case/find-estimate-requests-by-id-use-case';

@ApiTags('Estimate Request')
@ApiBearerAuth()
@Controller('/estimate-requests')
@UseInterceptors(LoggingInterceptor)
export class EstimateRequestController {
  constructor(
    private readonly createEstimateRequestUseCase: CreateEstimateRequestUseCase,
    private readonly listEstimateRequestsByUserUseCase: ListEstimateRequestsByUserUseCase,
    private readonly listEstimateRequestsUseCase: ListEstimateRequestsUseCase,
    private readonly uploadEstimateRequestFilesUseCase: UploadEstimateRequestFilesUseCase,
    private readonly listEstimateRequestFilesUseCase: ListEstimateRequestFilesUseCase,
    private readonly findEstimateRequestsByIdUseCase: FindEstimateRequestsByIdUseCase,
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

  @Get('/user/:id')
  @HttpCode(200)
  async findByUserId(@Param('id') id: string) {
    const result = await this.listEstimateRequestsByUserUseCase.execute({
      user_id: id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    console.log(result.value.estimateRequests);

    return {
      result: result.value.estimateRequests.map(EstimateRequestMapping.toView),
    };
  }
  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.findEstimateRequestsByIdUseCase.execute({
      id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }

    return {
      result: EstimateRequestMapping.toView(result.value.estimateRequests),
    };
  }

  @Get()
  @HttpCode(200)
  async listAll(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    const result = await this.listEstimateRequestsUseCase.execute({
      latitude,
      longitude,
    });
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

  @Post('/:id/files')
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor('files'))
  @Public()
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') estimate_request_id: string,
  ) {
    if (!files.length) {
      throw new BadRequestException('Nenhum arquivo enviado!');
    }

    await this.uploadEstimateRequestFilesUseCase.execute({
      files,
      estimate_request_id,
    });

    return {
      status: 201,
      message:
        'The video is being uploaded and we will inform you of the next statuses!',
    };
  }
  @Get('/:id/files')
  @Public()
  async listRequestFiles(@Param('id') estimate_request_id: string) {
    const result = await this.listEstimateRequestFilesUseCase.execute({
      estimate_request_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    return {
      result: result.value.estimate_files.map(
        EstimateRequestFilesMapping.toView,
      ),
    };
  }
}
