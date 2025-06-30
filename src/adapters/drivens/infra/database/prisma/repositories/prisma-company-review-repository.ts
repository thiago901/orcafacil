import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { CompanyReview } from '@core/modules/company/entities/company-review';
import { CompanyReviewMapping } from './mapping/company-review-mapping';
import { CompanyReviewRepository } from '@core/modules/company/application/ports/repositories/company-review-repository';

@Injectable()
export class PrismaCompanyReviewReviewRepository
  implements CompanyReviewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(companyreview: CompanyReview): Promise<void> {
    const data = CompanyReviewMapping.toPrisma(companyreview);
    await this.prisma.companyReview.create({
      data,
    });
  }

  async getAllByUser(user_id: string): Promise<CompanyReview[]> {
    const reviews = await this.prisma.companyReview.findMany({
      where: {
        user_id,
      },
    });

    return reviews.map((companyreview) =>
      CompanyReviewMapping.toDomain(companyreview),
    );
  }

  async getAllByCompany(company_id: string): Promise<CompanyReview[]> {
    const reviews = await this.prisma.companyReview.findMany({
      where: {
        company_id,
      },
    });

    return reviews.map((companyreview) =>
      CompanyReviewMapping.toDomain(companyreview),
    );
  }
  async findById(id: string): Promise<CompanyReview | null> {
    const companyreview = await this.prisma.companyReview.findUnique({
      where: { id },
    });

    if (!companyreview) {
      return null;
    }

    return CompanyReviewMapping.toDomain(companyreview);
  }
}
