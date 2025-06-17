import { PrismaService } from '../prisma.service';
import { PlanMapping } from './mapping/plan-mapping';

import { Injectable } from '@nestjs/common';

import { Plan } from '@core/modules/plan/entities/plan';
import { PlanRepository } from '@core/modules/plan/application/ports/repositories/plan-repository';

@Injectable()
export class PrismaPlanRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Plan[]> {
    const plans = await this.prisma.plan.findMany({
      orderBy: { price_month: 'asc' },
    });

    return plans.map((plan) => PlanMapping.toDomain(plan));
  }
  async findById(id: string): Promise<Plan | null> {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      return null;
    }

    return PlanMapping.toDomain(plan);
  }
}
