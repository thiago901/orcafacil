import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { Public } from '@adapters/drivens/infra/auth/public';

import { CompanyCatagoryMapping } from '../mapping/company-category-mapping';
import { ListAllCompaniesCategoriesUseCase } from '@core/modules/company/application/use-case/list-all-companies-categories-use-case';

@ApiTags('Company Categories')
@ApiBearerAuth()
@Controller('/companies-categories')
@UseInterceptors(LoggingInterceptor)
export class CompanyCategoryController {
  constructor(
    private readonly listAllCompaniesCategoriesUseCase: ListAllCompaniesCategoriesUseCase,
  ) {}

  @Get('/')
  @Public()
  async listAll() {
    const result = await this.listAllCompaniesCategoriesUseCase.execute();
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: result.value.categories.map(CompanyCatagoryMapping.toView),
    };
  }
}
