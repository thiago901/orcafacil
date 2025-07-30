import { Job } from '@core/modules/job/entities/job';

export abstract class JobRepository {
  abstract create(job: Job): Promise<void>;
  abstract save(job: Job): Promise<void>;
  abstract findByCompanyId(company_id: string): Promise<Job[]>;
  abstract findById(id: string): Promise<Job | null>;
  abstract findByProposalId(proposal_id: string): Promise<Job | null>;
}
