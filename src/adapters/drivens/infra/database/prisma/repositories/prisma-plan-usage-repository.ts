import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PlanUsage } from '@core/modules/plan/entities/plan-usage';
import { PlanUsageRepository } from '@core/modules/plan/application/ports/providers/plan-usage-repository';
import { PlanUsageMapping } from './mapping/plan-usage-mapping';

@Injectable()
export class PrismaPlanUsageRepository implements PlanUsageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserPlanAndPeriod(
    userPlanId: string,
    resource: string,
    period: Date,
  ): Promise<PlanUsage | null> {
    const usage = await this.prisma.planUsage.findUnique({
      where: {
        user_plan_id_resource_period: {
          user_plan_id: userPlanId,
          resource,
          period,
        },
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
