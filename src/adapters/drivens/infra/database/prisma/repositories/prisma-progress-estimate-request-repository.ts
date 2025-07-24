import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { ProgressEstimateRequestRepository } from '@core/modules/estimate-request/application/ports/repositories/progress-estimate-request-repository';
import { ProgressEstimateRequest } from '@core/modules/estimate-request/entities/progress-estimate-request';
import { ProgressEstimateRequestMapping } from './mapping/progress-estimate-request-mapping';

@Injectable()
export class PrismaProgressEstimateRequestRepository
  implements ProgressEstimateRequestRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async save(
    progressEstimateRequest: ProgressEstimateRequest,
  ): Promise<ProgressEstimateRequest> {
    const data = ProgressEstimateRequestMapping.toPrisma(
      progressEstimateRequest,
    );
    await this.prisma.progressEstimateRequest.update({
      data,
      where: {
        id: data.id,
      },
    });
    return progressEstimateRequest;
  }
  async create(
    progressEstimateRequest: ProgressEstimateRequest,
  ): Promise<ProgressEstimateRequest> {
    const data = ProgressEstimateRequestMapping.toPrisma(
      progressEstimateRequest,
    );

    await this.prisma.progressEstimateRequest.create({
      data,
    });
    return progressEstimateRequest;
  }
  async findByEstimateRequest(
    estimate_request_id: string,
  ): Promise<ProgressEstimateRequest[]> {
    const progressEstimateRequest =
      await this.prisma.progressEstimateRequest.findMany({
        where: { estimate_request_id },
        orderBy: {
          created_at: 'asc',
        },
      });

    return progressEstimateRequest.map((item) =>
      ProgressEstimateRequestMapping.toDomain(item),
    );
  }
}
