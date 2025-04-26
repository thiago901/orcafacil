import { EstimateRequestRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository';
import { PrismaService } from '../prisma.service';
import { EstimateRequestMapping } from './mapping/estimate-request-mapping';

import { Injectable } from '@nestjs/common';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';

@Injectable()
export class PrismaEstimateRequestRepository
  implements EstimateRequestRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async findByUserId(user_id: string): Promise<EstimateRequest[]> {
    const estimaterequests = await this.prisma.estimateRequest.findMany({
      where: {
        user_id,
      },
      include: {
        proposals: true,
      },
    });

    return estimaterequests.map((estimaterequest) =>
      EstimateRequestMapping.toDomain(estimaterequest),
    );
  }

  async save(estimaterequest: EstimateRequest): Promise<void> {
    const data = EstimateRequestMapping.toPrisma(estimaterequest);

    await this.prisma.estimateRequest.create({
      data,
    });
  }
  async getAll(): Promise<EstimateRequest[]> {
    const estimate_requests = await this.prisma.estimateRequest.findMany({
      include: {
        proposals: true,
      },
    });

    return estimate_requests.map((estimaterequest) =>
      EstimateRequestMapping.toDomain(estimaterequest),
    );
  }
  async findById(id: string): Promise<EstimateRequest | null> {
    const estimaterequest = await this.prisma.estimateRequest.findUnique({
      where: { id },
      include: {
        proposals: true,
        files: true,
      },
    });

    if (!estimaterequest) {
      return null;
    }

    return EstimateRequestMapping.toDomain(estimaterequest);
  }
}
