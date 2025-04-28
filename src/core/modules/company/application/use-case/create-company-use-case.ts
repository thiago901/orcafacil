import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

type RequestProps = {
  name: string;
  owner_id: string;
  about: string | null;
};
type ResponseProps = Either<
  null,
  {
    company: Company;
  }
>;

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    name,
    owner_id,
    about,
  }: RequestProps): Promise<ResponseProps> {
    const company = Company.create({
      avatar: null,
      name,
      owner_id,
      ratting: 0,
      about,
    });
    await this.companyRepository.save(company);

    return right({ company });
  }
}
