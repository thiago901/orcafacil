import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { CompanyServiceRepository } from '../ports/repositories/company-service-repository';
import { CompanyService } from '../../entities/company-service';

type RequestProps = {
  company_id: string;
};
type ResponseProps = Either<
  null,
  {
    companies: CompanyService[];
  }
>;

@Injectable()
export class ListAllCompaniesServicesByCompanyUseCase {
  constructor(
    private readonly companyServiceRepository: CompanyServiceRepository,
  ) {}

  async execute({ company_id }: RequestProps): Promise<ResponseProps> {
    const companies =
      await this.companyServiceRepository.getAllByCompanyId(company_id);

    return right({ companies });
  }
}
