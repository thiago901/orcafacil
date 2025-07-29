import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { CompanyAddress } from '../../entities/company-address';
import { AddressFinderProvider } from '@core/common/application/ports/providers/address-finder';
import { UsagePlanProvider } from '@core/common/application/ports/providers/usage-plan-provider';
import { ResourceExceededError } from '@core/modules/plan/application/errors/resource-exceeded-error';
import { UseCaseValidationError } from '@core/common/errors/common/use-case-validation-error';
import { CompanyServiceRepository } from '../ports/repositories/company-service-repository';
import { CompanyService } from '../../entities/company-service';

type RequestProps = {
  name: string;
  owner_id: string;
  about: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: {
    name: string;
    city: string;
    country: string;
    state: string;
    zip: string;
    address: string;
  };
  categories: {
    name: string;
    category_id: string;
    category_name: string;
  }[];
};
type ResponseProps = Either<
  ResourceExceededError,
  {
    company: Company;
  }
>;

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly addressFinderProvider: AddressFinderProvider,
    private readonly usagePlanProvider: UsagePlanProvider,
    private readonly companyServiceRepository: CompanyServiceRepository,
  ) {}

  async execute({
    name,
    owner_id,
    email,
    phone,
    website,
    about,
    address,
    categories,
  }: RequestProps): Promise<ResponseProps> {
    const isAllowed = await this.usagePlanProvider.checkAndConsumeFixed({
      resource: 'multiCompanySupport',
      user_id: owner_id,
    });
    if (!isAllowed) {
      return left(new ResourceExceededError('multiCompanySupport'));
    }
    if (!categories.length) {
      return left(new UseCaseValidationError('Category is required'));
    }
    const addressData = await this.addressFinderProvider.find({
      city: address.city,
      postal_code: address.zip,
      state: address.state,
      street: address.address,
    });

    const company_address = CompanyAddress.create({
      address: address.address,
      city: address.city,
      country: address.country,
      state: address.state,
      zip: address.zip,
      latitude: Number(addressData.lat) || 0,
      longitude: Number(addressData.lon) || 0,
      name: address.name,
    });
    const company = Company.create({
      avatar: null,
      name,
      owner_id,
      ratting: 0,
      about,
      email,
      address_id: company_address.id.toString(),
      phone,
      website,
      address: company_address,
      services: [],
    });

    await this.companyRepository.create(company);
    for (const category of categories) {
      const cat = CompanyService.create({
        category_id: category.category_id,
        category_name: category.category_name,
        company_id: company.id.toString(),
        name: category.name,
      });
      await this.companyServiceRepository.create(cat);
    }

    return right({ company });
  }
}
