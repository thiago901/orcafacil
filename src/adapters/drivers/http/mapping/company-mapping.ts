import { Company } from '@core/modules/company/entities/company';

export class CompanyMapping {
  static toView({ id, avatar, name, ratting }: Company) {
    return {
      id: id.toString(),
      avatar,
      name,
      ratting,
    };
  }
}
