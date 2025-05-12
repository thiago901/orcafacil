import { PrismaService } from '../prisma.service';
import { ProposalMapping } from './mapping/proposal-mapping';

import { Injectable } from '@nestjs/common';

import { ProposalRepository } from '@core/modules/proposal/application/ports/repositories/proposal-repository';
import { Proposal } from '@core/modules/proposal/entities/proposal';

@Injectable()
export class PrismaProposalRepository implements ProposalRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByEstimateRequestId(
    estimate_request_id: string,
  ): Promise<Proposal[]> {
    const proposals = await this.prisma.proposal.findMany({
      where: { estimate_request_id },
      include: {
        company: true,
      },
    });

    return proposals.map((proposal) =>
      ProposalMapping.toDomain(proposal as any),
    );
  }
  async findByCompanyId(company_id: string): Promise<Proposal[]> {
    const proposals = await this.prisma.proposal.findMany({
      where: { company_id },
      include: {
        estimateRequest: true,
      },
    });

    return proposals.map((proposal) =>
      ProposalMapping.toDomain(proposal as any),
    );
  }
  async create(proposal: Proposal): Promise<void> {
    const data = ProposalMapping.toPrisma(proposal);

    await this.prisma.proposal.create({
      data,
    });
  }
  async save(proposal: Proposal): Promise<void> {
    const data = ProposalMapping.toPrisma(proposal);

    await this.prisma.proposal.update({
      where: { id: proposal.id.toString() },
      data,
    });
  }

  async findById(id: string): Promise<Proposal | null> {
    const proposal = await this.prisma.proposal.findUnique({
      where: { id },
    });

    if (!proposal) {
      return null;
    }

    return ProposalMapping.toDomain(proposal);
  }
}
