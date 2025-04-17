import { Company } from '@core/modules/company/entities/company';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
type RequestProps = {
  owner_id: string;
};
type ResponseProps = Either<
  null,
  {
    companies: Company[];
  }
>;

@Injectable()
export class ListAllCompaniesByOwnerUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({ owner_id }: RequestProps): Promise<ResponseProps> {
    const companies = await this.companyRepository.getAllByOwner(owner_id);

    return right({ companies });
  }
}
