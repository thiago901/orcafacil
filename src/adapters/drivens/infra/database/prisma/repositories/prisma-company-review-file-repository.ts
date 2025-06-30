import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { CompanyReviewFileRepository } from '@core/modules/company/application/ports/repositories/company-review-file-repository';
import { CompanyReviewFile } from '@core/modules/company/entities/company-review-file';
import { CompanyReviewFileMapping } from './mapping/company-review-file-mapping';

@Injectable()
export class PrismaCompanyReviewFileRepository
  implements CompanyReviewFileRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(file: CompanyReviewFile): Promise<void> {
    const data = CompanyReviewFileMapping.toPrisma(file);
    await this.prisma.companyReviewFile.create({
      data,
    });
  }
}
