import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { EstimateRequestMessageRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository-message';
import { EstimateRequestMessage } from '@core/modules/estimate-request/entities/estimate-request-message';
import { EstimateRequestMessageMapping } from './mapping/estimate-request-message-mapping';

@Injectable()
export class PrismaEstimateRequestMessageRepository
  implements EstimateRequestMessageRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(message: EstimateRequestMessage): Promise<void> {
    const data = EstimateRequestMessageMapping.toPrisma(message);
    await this.prisma.message.create({
      data,
    });
  }

  async findByEstimateId(
    estimate_request_id: string,
  ): Promise<EstimateRequestMessage[]> {
    const estimaterequest = await this.prisma.message.findMany({
      where: { estimate_request_id },
    });

    return estimaterequest.map((estimateRequestMessage) =>
      EstimateRequestMessageMapping.toDomain(estimateRequestMessage),
    );
  }

  async findByEstimateIdAndCompanyId(
    estimate_request_id: string,
    company_id: string,
  ): Promise<EstimateRequestMessage[]> {
    const estimaterequest = await this.prisma.message.findMany({
      where: { estimate_request_id, company_id },
    });

    return estimaterequest.map((estimateRequestMessage) =>
      EstimateRequestMessageMapping.toDomain(estimateRequestMessage),
    );
  }
}
