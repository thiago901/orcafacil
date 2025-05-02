import { Module } from '@nestjs/common';
import { CreateCompanyUseCase } from './application/use-case/create-company-use-case';
import { FindCompanyByIdUseCase } from './application/use-case/find-company-by-id-use-case';
import { ListAllCompaniesUseCase } from './application/use-case/list-all-companies-use-case';
import { ListAllCompaniesByOwnerUseCase } from './application/use-case/list-all-companies-by-owneruse-case';
import { ListAllCompaniesServicesByCompanyUseCase } from './application/use-case/list-all-companies-services-by-company-use-case';
import { ListAllCompaniesCategoriesUseCase } from './application/use-case/list-all-companies-categories-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CreateCompanyUseCase,
    FindCompanyByIdUseCase,
    ListAllCompaniesUseCase,
    ListAllCompaniesByOwnerUseCase,
    ListAllCompaniesServicesByCompanyUseCase,
    ListAllCompaniesCategoriesUseCase,
  ],
  exports: [
    CreateCompanyUseCase,
    FindCompanyByIdUseCase,
    ListAllCompaniesUseCase,
    ListAllCompaniesByOwnerUseCase,
    ListAllCompaniesServicesByCompanyUseCase,
    ListAllCompaniesCategoriesUseCase,
  ],
})
export class CompanyModule {}
