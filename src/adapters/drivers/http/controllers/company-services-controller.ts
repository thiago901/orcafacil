import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { ListAllCompaniesServicesByCompanyUseCase } from '@core/modules/company/application/use-case/list-all-companies-services-by-company-use-case';
import { Public } from '@adapters/drivens/infra/auth/public';
import { CompanyServiceMapping } from '../mapping/company-service-mapping';
import { CreateCompanyServiceProps } from './validations/create-company-service.validate';
import { CreateCompanyServiceUseCase } from '@core/modules/company/application/use-case/create-company-service-use-case';

@ApiTags('Company Services')
@ApiBearerAuth()
@Controller('/companies-services')
@UseInterceptors(LoggingInterceptor)
export class CompanyServicesController {
  constructor(
    private readonly listAllCompaniesServicesByCompanyUseCase: ListAllCompaniesServicesByCompanyUseCase,
    private readonly createCompanyServiceUseCase: CreateCompanyServiceUseCase,
  ) {}

  @Get('/:company_id')
  @Public()
  async listByCompany(@Param('company_id') company_id: string) {
    const result = await this.listAllCompaniesServicesByCompanyUseCase.execute({
      company_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return { result: result.value.companies.map(CompanyServiceMapping.toView) };
  }
  @Post('/')
  @Public()
  async create(@Body() body: CreateCompanyServiceProps) {
    const { category_id, company_id, name } = body;
    const result = await this.createCompanyServiceUseCase.execute({
      category_id,
      company_id,
      name,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return { result: CompanyServiceMapping.toView(result.value.service) };
  }
}
