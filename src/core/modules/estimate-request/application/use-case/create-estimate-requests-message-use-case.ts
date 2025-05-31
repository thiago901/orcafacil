import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRequestMessageRepository } from '../ports/repositories/estimate-request-repository-message';
import {
  EstimateRequestMessage,
  SenderType,
} from '../../entities/estimate-request-message';
import { CompanyRepository } from '@core/modules/company/application/ports/repositories/company-repository';
import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  content: string;
  estimate_request_id: string;
  sender: SenderType;
  type: string;
  company_id: string;
  user_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimate_request_message: EstimateRequestMessage;
  }
>;

@Injectable()
export class CreateEstimateRequestMessageUseCase {
  constructor(
    private readonly estimateRequestMessageRepository: EstimateRequestMessageRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    content,
    estimate_request_id,
    sender,
    company_id,
    user_id,
    type,
  }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(user_id);
    const company = await this.companyRepository.findById(company_id);
    if (!user || !company) {
      throw new ResourceNotFoundError();
    }
    const message = EstimateRequestMessage.create({
      content,
      estimate_request_id,
      company_id,
      user_name: user.name,
      company_name: company.name,
      sender,
      type,
    });

    await this.estimateRequestMessageRepository.create(message);

    return right({ estimate_request_message: message });
  }
}
