import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { CreateCompanyReviewUseCase } from '@core/modules/company/application/use-case/create-company-review-use-case';
import {
  CreateCompanyReviewProps,
  createCompanyReviewSchema,
} from './validations/create-company-review.validate';
import { CurrentUser } from '@adapters/drivens/infra/auth/current-user-decorator';
import { TokenPayload } from '@adapters/drivens/infra/auth/jwt.strategy';
import { CompanyReviewMapping } from '../mapping/company-review-mapping';
import { ListCompanyReviewByCompanyUseCase } from '@core/modules/company/application/use-case/list-all-review-by-company-use-case';
import { ListCompanyReviewByUserUseCase } from '@core/modules/company/application/use-case/list-all-review-by-user-use-case';
import { FindCompanyReviewByIdUseCase } from '@core/modules/company/application/use-case/find-review-by-id-use-case copy';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadReviewImageUseCase } from '@core/modules/company/application/use-case/upload-review-image-use-case';

@ApiTags('Review')
@ApiBearerAuth()
@Controller('/reviews')
@UseInterceptors(LoggingInterceptor)
export class CompanyReviewController {
  constructor(
    private readonly createCompanyReviewUseCase: CreateCompanyReviewUseCase,
    private readonly listCompanyReviewByCompanyUseCase: ListCompanyReviewByCompanyUseCase,
    private readonly listCompanyReviewByUserUseCase: ListCompanyReviewByUserUseCase,
    private readonly findCompanyReviewByIdUseCase: FindCompanyReviewByIdUseCase,
    private readonly uploadReviewImageUseCase: UploadReviewImageUseCase,
  ) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCompanyReviewSchema))
  async create(
    @Body() body: CreateCompanyReviewProps,
    @CurrentUser() user: TokenPayload,
  ) {
    const { comment, company_id, rating, title } = body;
    const result = await this.createCompanyReviewUseCase.execute({
      comment,
      company_id,
      rating,
      title,
      user_id: user.sub,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return { result: CompanyReviewMapping.toView(result.value.review) };
  }

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.findCompanyReviewByIdUseCase.execute({ id });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    return { result: CompanyReviewMapping.toView(result.value.review) };
  }

  @Get('/users')
  @HttpCode(200)
  async listAllByUser(@CurrentUser() user: TokenPayload) {
    const result = await this.listCompanyReviewByUserUseCase.execute({
      user_id: user.sub,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    return { result: result.value.review.map(CompanyReviewMapping.toView) };
  }

  @Get('/company/:id')
  @HttpCode(200)
  async listAllByCompany(@Param('id') id: string) {
    const result = await this.listCompanyReviewByCompanyUseCase.execute({
      company_id: id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    return { result: result.value.review.map(CompanyReviewMapping.toView) };
  }
  @Patch('/:id/file')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') company_review_id: string,
  ) {
    if (!files.length) {
      throw new BadRequestException('Nenhum arquivo enviado!');
    }

    await this.uploadReviewImageUseCase.execute({
      files,
      company_review_id,
    });

    return {
      status: 201,
      message:
        'The video is being uploaded and we will inform you of the next statuses!',
    };
  }
}
