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

import { Public } from '@adapters/drivens/infra/auth/public';
import { CreateCompanyUseCase } from '@core/modules/company/application/use-case/create-company-use-case';
import { FindCompanyByIdUseCase } from '@core/modules/company/application/use-case/find-company-by-id-use-case';
import { ListAllCompaniesUseCase } from '@core/modules/company/application/use-case/list-all-companies-use-case';
import {
  CreateCompanyProps,
  createCompanySchema,
} from './validations/create-company.validate';
import { CompanyMapping } from '../mapping/company-mapping';

@ApiTags('Company')
@ApiBearerAuth()
@Controller('/companies')
@UseInterceptors(LoggingInterceptor)
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly findCompanyByIdUseCase: FindCompanyByIdUseCase,
    private readonly listAllCompaniesUseCase: ListAllCompaniesUseCase,
  ) {}

  @Post('')
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCompanySchema))
  async create(@Body() body: CreateCompanyProps) {
    const result = await this.createCompanyUseCase.execute(body);
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return { result: CompanyMapping.toView(result.value.company) };
  }

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.findCompanyByIdUseCase.execute({ id });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    return { result: CompanyMapping.toView(result.value.company) };
  }

  @Get()
  @HttpCode(200)
  async listAll() {
    const result = await this.listAllCompaniesUseCase.execute();
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { result: result.value.companies.map(CompanyMapping.toView) };
  }
}
