import { Module } from '@nestjs/common';
import { CreateCompanyUseCase } from './application/use-case/create-company-use-case';
import { FindCompanyByIdUseCase } from './application/use-case/find-company-by-id-use-case';
import { ListAllCompaniesUseCase } from './application/use-case/list-all-companies-use-case';
import { ListAllCompaniesByOwnerUseCase } from './application/use-case/list-all-companies-by-owneruse-case';
import { ListAllCompaniesServicesByCompanyUseCase } from './application/use-case/list-all-companies-services-by-company-use-case';
import { ListAllCompaniesCategoriesUseCase } from './application/use-case/list-all-companies-categories-use-case';
import { CreateCompanyServiceUseCase } from './application/use-case/create-company-service-use-case';
import { UploadProfileImageUseCase } from './application/use-case/upload-profile-image-use-case';
import { UpdateCompanyUseCase } from './application/use-case/update-company-use-case';
import { CreateCompanyReviewUseCase } from './application/use-case/create-company-review-use-case';
import { ListCompanyReviewByUserUseCase } from './application/use-case/list-all-review-by-user-use-case';
import { ListCompanyReviewByCompanyUseCase } from './application/use-case/list-all-review-by-company-use-case';
import { UploadReviewImageUseCase } from './application/use-case/upload-review-image-use-case';

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
    CreateCompanyServiceUseCase,
    UploadProfileImageUseCase,
    UpdateCompanyUseCase,
    CreateCompanyReviewUseCase,
    ListCompanyReviewByUserUseCase,
    ListCompanyReviewByCompanyUseCase,
    UploadReviewImageUseCase,
  ],
  exports: [
    CreateCompanyUseCase,
    FindCompanyByIdUseCase,
    ListAllCompaniesUseCase,
    ListAllCompaniesByOwnerUseCase,
    ListAllCompaniesServicesByCompanyUseCase,
    ListAllCompaniesCategoriesUseCase,
    CreateCompanyServiceUseCase,
    UploadProfileImageUseCase,
    UpdateCompanyUseCase,
    CreateCompanyReviewUseCase,
    ListCompanyReviewByUserUseCase,
    ListCompanyReviewByCompanyUseCase,
    UploadReviewImageUseCase,
  ],
})
export class CompanyModule {}
