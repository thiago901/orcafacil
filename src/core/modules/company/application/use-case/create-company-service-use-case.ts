import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { CompanyService } from '../../entities/company-service';
import { CompanyServiceRepository } from '../ports/repositories/company-service-repository';

type RequestProps = {
  name: string;
  category_id: string;
  company_id: string;
  category_name: string;
};
type ResponseProps = Either<
  null,
  {
    service: CompanyService;
  }
>;

@Injectable()
export class CreateCompanyServiceUseCase {
  constructor(
    private readonly companyServiceRepository: CompanyServiceRepository,
  ) {}

  async execute({
    name,
    category_id,
    company_id,
    category_name,
  }: RequestProps): Promise<ResponseProps> {
    const service = CompanyService.create({
      category_id: category_id,
      category_name,
      company_id,
      name,
    });

    await this.companyServiceRepository.create(service);

    return right({ service });
  }
}
