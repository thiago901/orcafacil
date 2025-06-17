import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PlanUsage } from '@core/modules/plan/entities/plan-usage';
import {
  FindByUserPlanAndPeriodParams,
  PlanUsageRepository,
} from '@core/modules/plan/application/ports/repositories/plan-usage-repository';
import { PlanUsageMapping } from './mapping/plan-usage-mapping';

@Injectable()
export class PrismaPlanUsageRepository implements PlanUsageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserPlanAndPeriod({
    period,
    resource,
    user_plan_id,
  }: FindByUserPlanAndPeriodParams): Promise<PlanUsage | null> {
    const usage = await this.prisma.planUsage.findFirst({
      where: {
        period,
        resource,
        user_plan_id,
      },
    });

    return usage ? PlanUsageMapping.toDomain(usage) : null;
  }

  async create(planUsage: PlanUsage): Promise<void> {
    await this.prisma.planUsage.create({
      data: PlanUsageMapping.toPrisma(planUsage),
    });
  }

  async save(planUsage: PlanUsage): Promise<void> {
    await this.prisma.planUsage.update({
      where: { id: planUsage.id.toString() },
      data: PlanUsageMapping.toPrisma(planUsage),
    });
  }
}
