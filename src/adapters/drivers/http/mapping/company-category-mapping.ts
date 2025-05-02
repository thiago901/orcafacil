import { Category } from '@core/modules/company/entities/category';

export class CompanyCatagoryMapping {
  static toView({ id, created_at, name, updated_at }: Category) {
    return {
      id: id.toString(),

      created_at,
      name,
      updated_at,
    };
  }
}
