import { RequiredProps } from '@core/common/entities/required';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';
import { CompanyAddress } from '@core/modules/company/entities/company-address';
import { CompanyService } from '@core/modules/company/entities/company-service';

import {
  Company as CompanyPrisma,
  CompanyAddress as CompanyAddressPrisma,
  CompanyService as CompanyServicePrisma,
} from '@prisma/client';

type CompanyCompletePrisma = CompanyPrisma & {
  address?: CompanyAddressPrisma;
  services?: CompanyServicePrisma[];
};
export class CompanyMapping {
  static toDomain({
    avatar,
    id,
    name,
    ratting,
    owner_id,
    about,
    address_id,
    address,
    services,
  }: CompanyCompletePrisma) {
    return Company.create(
      {
        avatar,
        name,
        owner_id,
        ratting: Number(ratting),
        about,
        services: !services
          ? []
          : services.map((service) =>
              CompanyService.create(
                {
                  category_id: service.category_id,
                  company_id: service.company_id,
                  name: service.name,
                },
                new UniqueEntityID(service.id),
              ),
            ),
        address: !address
          ? null
          : CompanyAddress.create(
              {
                name: address.name,
                address: address.address,
                city: address.city,
                state: address.state,
                country: address.country,
                zip: address.zip,
                latitude: Number(address.latitude),
                longitude: Number(address.longitude),
                created_at: address.created_at,
                updated_at: address.updated_at,
              },
              new UniqueEntityID(address_id),
            ),
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(company: Company) {
    const companyPrisma = company as RequiredProps<Company, 'address'>;
    return {
      id: companyPrisma.id.toString(),
      avatar: companyPrisma.avatar,
      name: companyPrisma.name,
      owner_id: companyPrisma.owner_id,
      ratting: companyPrisma.ratting,
      about: companyPrisma.about,
      address_id: companyPrisma.address.id.toString(),
      created_at: company.created_at,
      updated_at: company.updated_at,
      address: {
        id: companyPrisma.address.id.toString(),
        name: companyPrisma.address.name,
        address: companyPrisma.address.address,
        city: companyPrisma.address.city,
        state: companyPrisma.address.state,
        country: companyPrisma.address.country,
        zip: companyPrisma.address.zip,
        latitude: companyPrisma.address.latitude,
        longitude: companyPrisma.address.longitude,
        created_at: companyPrisma.address.created_at,
        updated_at: companyPrisma.address.updated_at,
      },
    };
  }
}
