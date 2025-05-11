import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { CompanyCategoryRepository } from '@core/modules/company/application/ports/repositories/company-catagories-repository';
import { Category } from '@core/modules/company/entities/category';
import { CompanyCategoryMapping } from './mapping/company-category-mapping';

@Injectable()
export class PrismaCompanyCategoryRepository
  implements CompanyCategoryRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({});

    return categories.map((company) =>
      CompanyCategoryMapping.toDomain(company),
    );
  }
  async create(category: Category): Promise<Category> {
    const data = CompanyCategoryMapping.toPrisma(category);
    await this.prisma.category.create({
      data,
    });

    return category;
  }
}
