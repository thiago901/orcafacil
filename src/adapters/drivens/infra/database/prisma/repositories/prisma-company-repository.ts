import { PrismaService } from '../prisma.service';
import { CompanyMapping } from './mapping/company-mapping';

import { Injectable } from '@nestjs/common';

import {
  CompanyRepository,
  GetAllCompaniesProps,
} from '@core/modules/company/application/ports/repositories/company-repository';
import { Company } from '@core/modules/company/entities/company';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(company: Company): Promise<void> {
    const data = CompanyMapping.toPrisma(company);
    const {
      about,
      avatar,
      id,
      name,
      address,
      email,
      phone,
      address_id,
      website,
      owner_id,
      ratting,
      updated_at,
      created_at,
    } = data;
    await this.prisma.company.update({
      data: {
        about,
        avatar,
        id,
        name,
        email,
        phone,
        website,
        owner_id,
        ratting,
        updated_at,
        created_at,
      },
      where: { id },
    });
    await this.prisma.companyAddress.update({
      data: {
        address: address.address,
        city: address.city,
        country: address.country,
        latitude: address.latitude,
        longitude: address.longitude,
        name: address.name,
        state: address.state,
        zip: address.zip,
      },
      where: { id: address_id },
    });
    await this.prisma.$executeRawUnsafe(`
      UPDATE "company_address"
      SET "location" = ST_SetSRID(ST_MakePoint("longitude", "latitude"), 4326)::geography
      WHERE "id" = '${data.address_id}';
    `);
  }
  async create(company: Company): Promise<void> {
    const data = CompanyMapping.toPrisma(company);
    const {
      about,
      avatar,
      id,
      name,
      email,
      phone,
      website,
      owner_id,
      ratting,
      address,
      updated_at,
      created_at,
    } = data;
    await this.prisma.companyAddress.create({
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
            email,
            phone,
            website,
            created_at,
            updated_at,
          },
        },
      },
    });

    await this.prisma.$executeRawUnsafe(`
      UPDATE "company_address"
      SET "location" = ST_SetSRID(ST_MakePoint("longitude", "latitude"), 4326)::geography
      WHERE "id" = '${data.address_id}';
    `);
  }
  async getAll({
    categories,
    location,
  }: GetAllCompaniesProps): Promise<Company[]> {
    const where = categories
      ? {
          services: {
            some: {
              category_name: {
                in: categories,
              },
            },
          },
        }
      : {};
    if (location) {
      const nearbyIds = await this.prisma.$queryRaw<
        Array<{ id: string }>
      >(Prisma.sql`
        SELECT "id"
        FROM "company_address"
        WHERE ST_DWithin(
          "location",
          ST_SetSRID(ST_MakePoint(${Number(location.long)}, ${Number(location.lat)}), 4326)::geography,
          ${Number(location.meters)}
        )
      `);
      where['address_id'] = {
        in: nearbyIds.map((item) => item.id),
      };
    }

    const users = await this.prisma.company.findMany({
      include: {
        address: true,
        services: true,
      },
      // ...where,
      where: {
        ...where,
      },
    });

    return users.map((company) => CompanyMapping.toDomain(company));
  }
  async getAllByOwner(owner_id: string): Promise<Company[]> {
    const users = await this.prisma.company.findMany({
      include: {
        address: true,
      },
      where: {
        owner_id,
      },
    });

    return users.map((company) => CompanyMapping.toDomain(company));
  }
  async findById(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        address: true,
        services: true,
      },
    });

    if (!company) {
      return null;
    }

    return CompanyMapping.toDomain(company);
  }
}
