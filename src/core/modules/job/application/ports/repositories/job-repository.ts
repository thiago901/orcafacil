import { Job } from '@core/modules/job/entities/job';

export abstract class JobRepository {
  abstract save(user: Job): Promise<void>;
  abstract findByCompanyId(companyId: number): Promise<Job[]>;
}
