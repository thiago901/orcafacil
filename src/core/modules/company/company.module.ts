import { Module } from '@nestjs/common';
import { CreateCompanyUseCase } from './application/use-case/create-company-use-case';
import { FindCompanyByIdUseCase } from './application/use-case/find-company-by-id-use-case';
import { ListAllCompaniesUseCase } from './application/use-case/list-all-companies-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CreateCompanyUseCase,
    FindCompanyByIdUseCase,
    ListAllCompaniesUseCase,
  ],
  exports: [
    CreateCompanyUseCase,
    FindCompanyByIdUseCase,
    ListAllCompaniesUseCase,
  ],
})
export class CompanyModule {}
