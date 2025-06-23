import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRepository } from '../ports/repositories/estimate-repository';
import { Estimate } from '../../entities/estimate';

interface RequestProps {
  company_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimates: Estimate[];
  }
>;

@Injectable()
export class GetAllEstimateByCompanyUseCase {
  constructor(private readonly estimateRepository: EstimateRepository) {}

  async execute({ company_id }: RequestProps): Promise<ResponseProps> {
    const estimates = await this.estimateRepository.getAllByCompany(company_id);

    return right({ estimates });
  }
}
