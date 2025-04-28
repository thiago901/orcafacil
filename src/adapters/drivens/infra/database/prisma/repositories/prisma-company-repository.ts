import { PrismaService } from '../prisma.service';
import { CompanyMapping } from './mapping/company-mapping';

import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '@core/modules/company/application/ports/repositories/company-repository';
import { Company } from '@core/modules/company/entities/company';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(company: Company): Promise<void> {
    const data = CompanyMapping.toPrisma(company);
    const { about, avatar, id, name, owner_id, ratting, address } = data;
    this.prisma.companyAddress.create({
      data: {
        city: address.city,
        country: address.country,
        created_at: address.created_at,
        id: address.id,
        latitude: address.latitude,
        longitude: address.longitude,
        name: address.name,
        zip: address.zip,
        address: address.address,
        updated_at: address.updated_at,
        state: address.state,
        company: {
          create: {
            about,
            avatar,
            id,
            name,
            owner_id,
            ratting,
          },
        },
      },
    });
  }
  async getAll(): Promise<Company[]> {
    const users = await this.prisma.company.findMany();

    return users.map((company) => CompanyMapping.toDomain(company));
  }
  async getAllByOwner(owner_id: string): Promise<Company[]> {
    const users = await this.prisma.company.findMany({
      where: {
        owner_id,
      },
    });

    return users.map((company) => CompanyMapping.toDomain(company));
  }
  async findById(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      return null;
    }

    return CompanyMapping.toDomain(company);
  }
}
