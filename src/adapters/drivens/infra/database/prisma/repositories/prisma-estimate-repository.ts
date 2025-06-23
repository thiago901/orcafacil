import { EstimateRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-repository';
import { PrismaService } from '../prisma.service';

import { Injectable } from '@nestjs/common';

import { Estimate } from '@core/modules/estimate-request/entities/estimate';
import { EstimateMapping } from './mapping/estimate-mapping';
import { EstimateItemsMapping } from './mapping/estimate-items-mapping';

@Injectable()
export class PrismaEstimateRepository implements EstimateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(estimate: Estimate): Promise<void> {
    const items = estimate.items?.getItems().map(EstimateItemsMapping.toPrisma);
    const nestingCreate = {
      estimate_items: { createMany: { data: items } },
    };
    const data = EstimateMapping.toPrisma(estimate, nestingCreate);

    await this.prisma.estimate.create({
      data,
    });
  }

  async findById(id: string): Promise<Estimate | null> {
    const estimate = await this.prisma.estimate.findUnique({
      where: { id },
      include: {
        estimate_items: true,
      },
    });

    if (!estimate) {
      return null;
    }

    return EstimateMapping.toDomain(estimate);
  }
  async getAllByCompany(company_id: string): Promise<Estimate[]> {
    const estimates = await this.prisma.estimate.findMany({
      where: { company_id },
      include: {
        estimate_items: true,
      },
    });

    return estimates.map(EstimateMapping.toDomain);
  }
  async getAllByEstimateRequest(
    estimate_request_id: string,
  ): Promise<Estimate[]> {
    const estimates = await this.prisma.estimate.findMany({
      where: { proposals: { some: { estimate_request_id } } },
      include: {
        estimate_items: true,
      },
    });

    return estimates.map(EstimateMapping.toDomain);
  }
}
