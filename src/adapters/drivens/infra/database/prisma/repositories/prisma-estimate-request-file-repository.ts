import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { EstimateRequestFileRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository-file';
import { EstimateRequestFile } from '@core/modules/estimate-request/entities/estimate-request-file';
import { EstimateRequestFileMapping } from './mapping/estimate-request-file-mapping';

@Injectable()
export class PrismaEstimateRequestFileRepository
  implements EstimateRequestFileRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(
    estimate_request_file: EstimateRequestFile | EstimateRequestFile[],
  ): Promise<void> {
    if (!Array.isArray(estimate_request_file)) {
      const data = EstimateRequestFileMapping.toPrisma(estimate_request_file);

      await this.prisma.estimateRequestFile.create({
        data,
      });
      return;
    }

    const data = estimate_request_file.map((file) =>
      EstimateRequestFileMapping.toPrisma(file),
    );
    await this.prisma.estimateRequestFile.createMany({
      data,
    });
  }

  async findByEstimateId(
    estimate_request_id: string,
  ): Promise<EstimateRequestFile[]> {
    const estimaterequest = await this.prisma.estimateRequestFile.findMany({
      where: { estimate_request_id },
    });

    return estimaterequest.map((estimateRequestFile) =>
      EstimateRequestFileMapping.toDomain(estimateRequestFile),
    );
  }
}
