import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { CompanyAddress } from '../../entities/company-address';
import { AddressFinderProvider } from '@core/common/application/ports/providers/address-finder';

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
};
type ResponseProps = Either<
  null,
  {
    company: Company;
  }
>;

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly addressFinderProvider: AddressFinderProvider,
  ) {}

  async execute({
    name,
    owner_id,
    email,
    phone,
    website,
    about,
    address,
  }: RequestProps): Promise<ResponseProps> {
    const addressData = await this.addressFinderProvider.find({
      city: address.city,
      postal_code: address.zip,
      state: address.state,
      street: address.address,
    });
    const company = Company.create({
      avatar: null,
      name,
      owner_id,
      ratting: 0,
      about,
      email,
      phone,
      website,
      address: CompanyAddress.create({
        address: address.address,
        city: address.city,
        country: address.country,
        state: address.state,
        zip: address.zip,
        latitude: Number(addressData.lat) || 0,
        longitude: Number(addressData.lon) || 0,
        name: address.name,
      }),
      services: [],
    });

    await this.companyRepository.create(company);

    return right({ company });
  }
}
