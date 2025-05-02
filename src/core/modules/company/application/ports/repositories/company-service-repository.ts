import { CompanyService } from '@core/modules/company/entities/company-service';

export abstract class CompanyServiceRepository {
  abstract getAllByCompanyId(company_id: string): Promise<CompanyService[]>;
}
