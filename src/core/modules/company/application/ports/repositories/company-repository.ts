import { Company } from '@core/modules/company/entities/company';

export abstract class CompanyRepository {
  abstract create(user: Company): Promise<void>;
  abstract save(user: Company): Promise<void>;
  abstract getAll(): Promise<Company[]>;
  abstract getAllByOwner(owner_id: string): Promise<Company[]>;
  abstract findById(id: string): Promise<Company | null>;
}
