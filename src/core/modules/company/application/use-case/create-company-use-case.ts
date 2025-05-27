import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { CompanyAddress } from '../../entities/company-address';

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
    latitude: number;
    longitude: number;
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
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    name,
    owner_id,
    about,
    address,
  }: RequestProps): Promise<ResponseProps> {
    const company = Company.create({
      avatar: null,
      name,
      owner_id,
      ratting: 0,
      about,
      email: null,
      phone: null,
      website: null,
      address: CompanyAddress.create({
        address: address.address,
        city: address.city,
        country: address.country,
        state: address.state,
        zip: address.zip,
        latitude: address.latitude,
        longitude: address.longitude,
        name: address.name,
      }),
      services: [],
    });

    await this.companyRepository.create(company);

    return right({ company });
  }
}
