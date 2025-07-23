import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  FindConflictingVisitProps,
  ScheduledVisitRepository,
} from '@core/modules/scheduled-visit/application/ports/repositories/schedule-visit.repository';
import { ScheduledVisit } from '@core/modules/scheduled-visit/entities/scheduled-visit';
import { ScheduledVisitMapping } from './mapping/scheduled-visit-mapping';

@Injectable()
export class PrismaScheduledVisitRepository
  implements ScheduledVisitRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async create(visit: ScheduledVisit): Promise<void> {
    const data = ScheduledVisitMapping.toPrisma(visit);
    await this.prisma.scheduledVisit.create({
      data,
    });
  }

  async findById(id: string): Promise<ScheduledVisit | null> {
    const visit = await this.prisma.scheduledVisit.findUnique({
      where: { id },
    });
    return visit ? ScheduledVisitMapping.toDomain(visit) : null;
  }

  async save(visit: ScheduledVisit): Promise<void> {
    const data = ScheduledVisitMapping.toPrisma(visit);
    await this.prisma.scheduledVisit.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.scheduledVisit.delete({
      where: { id },
    });
  }

  async findConflictingVisit({
    company_id,
    date,
  }: FindConflictingVisitProps): Promise<ScheduledVisit | null> {
    const visit = await this.prisma.scheduledVisit.findFirst({
      where: {
        company_id,
        scheduled_at: date,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    return visit ? ScheduledVisitMapping.toDomain(visit) : null;
  }

  async findPendingByCompany(company_id: string): Promise<ScheduledVisit[]> {
    const visits = await this.prisma.scheduledVisit.findMany({
      where: {
        company_id,
        status: 'PENDING',
      },
    });

    return visits.map(ScheduledVisitMapping.toDomain);
  }

  async findSuggestedByCustomer(
    customer_id: string,
  ): Promise<ScheduledVisit[]> {
    const visits = await this.prisma.scheduledVisit.findMany({
      where: {
        customer_id,
        status: 'SUGGESTED',
      },
    });

    return visits.map(ScheduledVisitMapping.toDomain);
  }
}
