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

import { ChatEmitter } from '@adapters/drivers/web-socket/emitters/chat-emitter';
import { EstimateRequestRepository } from '../ports/repositories/estimate-request-repository';

interface RequestProps {
  content: string;
  estimate_request_id: string;
  sender: SenderType;
  type: string;
  company_id: string;
  proposal_id: string;
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
    private readonly estimateRequestRepository: EstimateRequestRepository,
    private readonly realtimeMessageNotificationProvider: ChatEmitter,
  ) {}

  async execute({
    content,
    estimate_request_id,
    sender,
    company_id,
    type,
    proposal_id,
  }: RequestProps): Promise<ResponseProps> {
    const estimateRequest =
      await this.estimateRequestRepository.findById(estimate_request_id);

    const company = await this.companyRepository.findById(company_id);
    if (!estimateRequest || !company) {
      throw new ResourceNotFoundError();
    }
    const user = await this.userRepository.findById(estimateRequest.user_id);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    const message = EstimateRequestMessage.create({
      content,
      estimate_request_id,
      company_id,
      user_name: user.name,
      company_name: company.name,
      sender,
      user_id: user.id.toString(),
      proposal_id,
      type,
    });

    await this.estimateRequestMessageRepository.create(message);
    await this.realtimeMessageNotificationProvider.sendMessage(
      proposal_id,
      'message:recieve',
      {
        message: {
          content: message.content,
          estimate_request_id: message.estimate_request_id,
          company_id: message.company_id,
          user_name: message.user_name,
          company_name: message.company_name,
          sender: message.sender,
          read: message.read,
          type: message.type,
          created_at: message.created_at,
          updated_at: message.updated_at,

          id: message.id.toString(),
        },
      },
    );
    return right({ estimate_request_message: message });
  }
}
