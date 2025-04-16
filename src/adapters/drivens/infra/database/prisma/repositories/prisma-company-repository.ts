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

    await this.prisma.company.create({
      data,
    });
  }
  async getAll(): Promise<Company[]> {
    const users = await this.prisma.company.findMany();

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
