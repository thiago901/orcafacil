import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { CompanyCategoryRepository } from '../ports/repositories/company-catagories-repository';
import { Category } from '../../entities/category';

type ResponseProps = Either<
  null,
  {
    categories: Category[];
  }
>;

@Injectable()
export class ListAllCompaniesCategoriesUseCase {
  constructor(
    private readonly companyCategoryRepository: CompanyCategoryRepository,
  ) {}

  async execute(): Promise<ResponseProps> {
    const categories = await this.companyCategoryRepository.listAll();

    return right({ categories });
  }
}
