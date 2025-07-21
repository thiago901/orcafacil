import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { AddressFinderProvider } from '@core/common/application/ports/providers/address-finder';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Company } from '../../entities/company';

type RequestProps = {
  address: {
    city: string;
    postal_code: string;
    state: string;
    street: string;
  };
  categories: string[];
};
type ResponseProps = Either<
  ResourceNotFoundError,
  {
    companies: Company[];
  }
>;

@Injectable()
export class FindCompanyByLocationUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly addressFinderProvider: AddressFinderProvider,
  ) {}

  async execute({ categories, address }: RequestProps): Promise<ResponseProps> {
    const addressData = await this.addressFinderProvider.find({
      city: address.city,
      postal_code: address.postal_code,
      state: address.state,
      street: address.street,
    });
    const location = {
      lat: addressData.lat,
      long: addressData.lon,
      meters: 1000,
    };

    const companies = await this.companyRepository.getAll({
      location,
      categories,
    });

    return right({ companies });
  }
}
