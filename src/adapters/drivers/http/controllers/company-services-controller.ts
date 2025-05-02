import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { ListAllCompaniesServicesByCompanyUseCase } from '@core/modules/company/application/use-case/list-all-companies-services-by-company-use-case';
import { Public } from '@adapters/drivens/infra/auth/public';
import { CompanyServiceMapping } from '../mapping/company-service-mapping';

@ApiTags('Company Services')
@ApiBearerAuth()
@Controller('/companies-services')
@UseInterceptors(LoggingInterceptor)
export class CompanyServicesController {
  constructor(
    private readonly listAllCompaniesServicesByCompanyUseCase: ListAllCompaniesServicesByCompanyUseCase,
  ) {}

  @Get('/:company_id')
  @Public()
  async create(@Param('company_id') company_id: string) {
    const result = await this.listAllCompaniesServicesByCompanyUseCase.execute({
      company_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return { result: result.value.companies.map(CompanyServiceMapping.toView) };
  }
}
