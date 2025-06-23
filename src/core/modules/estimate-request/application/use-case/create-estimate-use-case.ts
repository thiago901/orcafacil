import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRepository } from '../ports/repositories/estimate-repository';
import {
  Estimate,
  EstimateCompanyProps,
  EstimateCustomerProps,
} from '../../entities/estimate';
import { EstimateItem } from '../../entities/estimate-item';

import { WatchedEstimateItem } from '../../entities/watched-estimate-item';

interface RequestProps {
  company: EstimateCompanyProps;
  customer: EstimateCustomerProps;
  description: string;
  expire_at: Date;
  items: EstimateItem[];
}

type ResponseProps = Either<
  null,
  {
    estimate: Estimate;
  }
>;

@Injectable()
export class CreateEstimateUseCase {
  constructor(private readonly estimateRepository: EstimateRepository) {}

  async execute({
    company,
    customer,
    description,
    expire_at,

    items,
  }: RequestProps): Promise<ResponseProps> {
    const watchedItems = new WatchedEstimateItem(items);
    const estimate = Estimate.create({
      company,
      customer,
      description,
      expire_at,
      company_id: company.id,
      items: watchedItems,
      total: watchedItems.currentItems.reduce((acc, cur) => acc + cur.total, 0),
    });

    await this.estimateRepository.create(estimate);

    return right({ estimate });
  }
}
