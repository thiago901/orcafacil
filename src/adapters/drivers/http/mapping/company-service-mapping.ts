import { CompanyService } from '@core/modules/company/entities/company-service';

export class CompanyServiceMapping {
  static toView({
    id,
    category_id,
    company_id,
    created_at,
    name,
    updated_at,
    category,
  }: CompanyService) {
    return {
      id: id.toString(),
      category_id,
      company_id,
      created_at,
      name,
      updated_at,
      category: {
        id: category?.id.toString(),
        name: category?.name,
      },
    };
  }
}
