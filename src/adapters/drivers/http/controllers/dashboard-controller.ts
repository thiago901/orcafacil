import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { Public } from '@adapters/drivens/infra/auth/public';

import { PrismaService } from '@adapters/drivens/infra/database/prisma/prisma.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('/dashboard')
@UseInterceptors(LoggingInterceptor)
export class DashboardController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/:company_id')
  @Public()
  async getDashboard(@Param('company_id') company_id: string) {
    const userId = company_id;
    console.log('userId', userId);

    const company = await this.prisma.company.findFirst({
      where: { id: userId },
      include: { address: true },
    });

    if (!company || !company.address) {
      throw new NotFoundException('Empresa não encontrada ou sem endereço.');
    }

    const { latitude, longitude } = company.address;

    const [total, accepted, rejected, pending, totalAcceptedAmount] =
      await Promise.all([
        this.prisma.proposal.count({ where: { company_id: company.id } }),
        this.prisma.proposal.count({
          where: { company_id: company.id, approved_at: { not: null } },
        }),
        this.prisma.proposal.count({
          where: { company_id: company.id, reject_at: { not: null } },
        }),
        this.prisma.proposal.count({
          where: {
            company_id: company.id,
            approved_at: null,
            reject_at: null,
          },
        }),
        this.prisma.proposal.aggregate({
          where: {
            company_id: company.id,
            approved_at: { not: null },
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

    // Buscar orçamentos próximos com query raw

    const nearbyEstimateRequests = await this.prisma.$queryRawUnsafe<any[]>(`
      SELECT "id"
      FROM "estimate_request"
      WHERE ST_DWithin(
        "location",
        ST_SetSRID(ST_MakePoint(${Number(longitude)}, ${Number(latitude)}), 4326)::geography,
        ${Number(20000)}
      )
    `);
    const proposalsLastWeek = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) as total
    FROM proposals
    WHERE company_id = '${company.id}' AND created_at > NOW() - INTERVAL '7 days'
    GROUP BY day ORDER BY day
  `);
    return {
      result: {
        totalProposals: total,
        acceptedProposals: accepted,
        rejectedProposals: rejected,
        pendingProposals: pending,
        acceptanceRate: total > 0 ? accepted / total : 0,
        totalAcceptedAmount: totalAcceptedAmount._sum.amount ?? 0,
        nearbyEstimateRequestsCount: nearbyEstimateRequests.length,
        proposalsLastWeek: proposalsLastWeek.map((item) => ({
          day: item.day,
          total: Number(item.total),
        })),
      },
    };
  }
}
