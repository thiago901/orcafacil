import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

type RequestProps = {
  id: string;
};
type ResponseProps = Either<
  null,
  {
    company: Company;
  }
>;

@Injectable()
export class FindCompanyByIdUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new ResourceNotFoundError();
    }

    return right({ company });
  }
}
