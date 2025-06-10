import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { CompanyAddress } from '../../entities/company-address';
import {
  AddressFinderProvider,
  AddressFinderProviderResponse,
} from '@core/common/application/ports/providers/address-finder';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

type RequestProps = {
  id: string;
  name?: string;

  about?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: {
    name: string;
    city: string;
    country: string;
    state: string;
    zip: string;
    address: string;
  };
};
type ResponseProps = Either<
  ResourceNotFoundError,
  {
    company: Company;
  }
>;

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly addressFinderProvider: AddressFinderProvider,
  ) {}

  async execute({
    name,
    id,
    email,
    phone,
    website,
    about,
    address,
  }: RequestProps): Promise<ResponseProps> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      return left(new ResourceNotFoundError());
    }
    let addressData: AddressFinderProviderResponse =
      {} as AddressFinderProviderResponse;

    if (address) {
      addressData = await this.addressFinderProvider.find({
        city: address.city,
        postal_code: address.zip,
        state: address.state,
        street: address.address,
      });
    }
    company.about = about ? about : company.about;
    company.address = address
      ? CompanyAddress.create({
          address: address.address,
          city: address.city,
          country: address.country,
          state: address.state,
          zip: address.zip,
          latitude: Number(addressData.lat) || 0,
          longitude: Number(addressData.lon) || 0,
          name: address.name,
        })
      : company.address;
    company.email = email ? email : company.email;
    company.name = name ? name : company.name;
    company.phone = phone ? phone : company.phone;
    company.website = website ? website : company.website;
    await this.companyRepository.save(company);
    return right({ company });
  }
}
