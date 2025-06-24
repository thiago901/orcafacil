import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRequestMessageRepository } from '../ports/repositories/estimate-request-repository-message';
import { SenderType } from '../../entities/estimate-request-message';

import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  estimate_request_id: string;
  company_id: string;
}

type ResponseProps = Either<
  ResourceNotFoundError,
  {
    estimate_request_message: EstimateRequestMessage | null;
  }
>;

type MessageProps = {
  id: string;
  content: string;
  sender: SenderType;
  type: string;
  created_at: Date;
  updated_at: Date;
  read: boolean;
};
type EstimateRequestMessage = {
  company: {
    id: string;
    name: string;
  };
  user: {
    name: string;
  };
  estimate_request: {
    id: string;
  };
  unread_amount: number;
  messages: MessageProps[];
};
@Injectable()
export class GetAllMessagesGroupByEstimateIdCompanyIdUseCase {
  constructor(
    private readonly estimateRequestMessageRepository: EstimateRequestMessageRepository,
  ) {}

  async execute({
    estimate_request_id,
    company_id,
  }: RequestProps): Promise<ResponseProps> {
    const messages =
      await this.estimateRequestMessageRepository.findByEstimateIdAndCompanyId(
        estimate_request_id,
        company_id,
      );
    if (!messages.length) {
      return right({
        estimate_request_message: null,
      });
    }
    const agruped = messages.reduce(
      (acc, cur) => {
        const message = {
          id: cur.id.toString(),
          content: cur.content,
          sender: cur.sender,
          type: cur.type,
          read: cur.read,
          created_at: cur.created_at,
          updated_at: cur.updated_at,
        };

        acc.unread += cur.read ? 0 : 1;
        acc.messages.push(message);

        return acc;
      },
      {
        unread: 0,
        messages: [] as MessageProps[],
      },
    );

    return right({
      estimate_request_message: {
        estimate_request: {
          id: messages[0].estimate_request_id,
        },
        company: {
          id: messages[0].company_id,
          name: messages[0].company_name,
          avatar: messages[0].company_name,
        },
        user: {
          id: messages[0].user_id,
          name: messages[0].user_name,
        },
        messages: agruped.messages,
        unread_amount: agruped.unread,
      },
    });
  }
}
