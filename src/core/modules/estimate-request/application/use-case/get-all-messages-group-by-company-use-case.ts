import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { EstimateRequestMessageRepository } from '../ports/repositories/estimate-request-repository-message';
import { SenderType } from '../../entities/estimate-request-message';

interface RequestProps {
  estimate_request_id: string;
}

type ResponseProps = Either<
  null,
  {
    estimate_request_messages: EstimateRequestMessage[];
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
export class GetAllMessagesGroupByCompanyUseCase {
  constructor(
    private readonly estimateRequestMessageRepository: EstimateRequestMessageRepository,
  ) {}

  async execute({ estimate_request_id }: RequestProps): Promise<ResponseProps> {
    const messages =
      await this.estimateRequestMessageRepository.findByEstimateId(
        estimate_request_id,
      );

    const agruped = messages.reduce((acc, cur) => {
      const message = {
        id: cur.id.toString(),
        content: cur.content,
        sender: cur.sender,
        type: cur.type,
        read: cur.read,
        created_at: cur.created_at,
        updated_at: cur.updated_at,
      };
      const item = {
        company: {
          id: cur.company_id,
          name: cur.company_name,
        },
        user: {
          name: cur.user_name,
        },
        estimate_request: {
          id: cur.estimate_request_id,
        },
        unread_amount: !message.read ? 1 : 0,
        messages: [] as MessageProps[],
      };
      const messageIndex = acc.findIndex(
        (item) => item.company.id === cur.company_id,
      );
      if (messageIndex >= 0) {
        acc[messageIndex].unread_amount += item.unread_amount;
        acc[messageIndex].messages.push(message);
      } else {
        item.messages.push(message);
        acc.push(item);
      }

      return acc;
    }, [] as EstimateRequestMessage[]);

    return right({ estimate_request_messages: agruped });
  }
}
