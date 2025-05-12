import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { JobRepository } from '@core/modules/job/application/ports/repositories/job-repository';
import { Job } from '@core/modules/job/entities/job';
import { JobMapping } from './mapping/job-mapping';

@Injectable()
export class PrismaJobsRepository implements JobRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(job: Job): Promise<void> {
    const data = JobMapping.toPrisma(job);
    await this.prisma.job.update({
      data,
      where: {
        id: data.id,
      },
    });
  }
  async findByCompanyId(company_id: string): Promise<Job[]> {
    const jobs = await this.prisma.job.findMany({
      where: {
        company_id,
      },
    });

    return jobs.map((company) => JobMapping.toDomain(company));
  }

  async listAll(): Promise<Job[]> {
    const jobs = await this.prisma.job.findMany({});

    return jobs.map((company) => JobMapping.toDomain(company));
  }
  async findById(id: string): Promise<Job | null> {
    const job = await this.prisma.job.findFirst({
      where: {
        id,
      },
      include: {
        proposal: {
          include: {
            estimateRequest: true,
          },
        },
      },
    });
    if (!job) {
      return null;
    }
    console.log('job', job);

    return JobMapping.toDomain(job as any);
  }
  async create(job: Job): Promise<void> {
    const data = JobMapping.toPrisma(job);
    await this.prisma.job.create({
      data,
    });
  }
}
