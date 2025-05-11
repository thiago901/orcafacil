import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { CompanyServiceRepository } from '@core/modules/company/application/ports/repositories/company-service-repository';
import { CompanyService } from '@core/modules/company/entities/company-service';
import { CompanyServiceMapping } from './mapping/company-service-mapping';

@Injectable()
export class PrismaCompanyServiceRepository
  implements CompanyServiceRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async create(company: CompanyService): Promise<CompanyService> {
    const data = CompanyServiceMapping.toPrisma(company);
    await this.prisma.companyService.create({
      data,
    });
    return company;
  }
  async getAllByCompanyId(company_id: string): Promise<CompanyService[]> {
    const companies = await this.prisma.companyService.findMany({
      where: {
        company_id,
      },
      include: {
        category: true,
      },
    });

    return companies.map((company) => CompanyServiceMapping.toDomain(company));
  }
}
