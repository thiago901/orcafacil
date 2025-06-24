import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

type RequestProps = {
  categories?: string[];
  location?: {
    lat: string;
    long: string;
    meters: number;
  };
};
type ResponseProps = Either<
  null,
  {
    companies: Company[];
  }
>;

@Injectable()
export class ListAllCompaniesUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    categories,
    location,
  }: RequestProps): Promise<ResponseProps> {
    const companies = await this.companyRepository.getAll({
      categories,
      location,
    });

    return right({ companies });
  }
}
