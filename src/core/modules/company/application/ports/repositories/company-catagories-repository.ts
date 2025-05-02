import { Category } from '@core/modules/company/entities/category';

export abstract class CompanyCategoryRepository {
  abstract listAll(): Promise<Category[]>;
}
