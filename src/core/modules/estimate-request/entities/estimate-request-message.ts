import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export type SenderType = 'CLIENT' | 'COMPANY';
export interface EstimateRequestMessageProps {
  content: string;
  sender: SenderType;
  read: boolean;
  type: string;
  estimate_request_id: string;
  company_id: string;
  company_name: string;
  proposal_id: string;
  user_id: string;
  user_name: string;
  created_at: Date;
  updated_at: Date;
}

export class EstimateRequestMessage extends Entity<EstimateRequestMessageProps> {
  static create(
    props: Optional<
      EstimateRequestMessageProps,
      'created_at' | 'updated_at' | 'read'
    >,
    id?: UniqueEntityID,
  ) {
    return new EstimateRequestMessage(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
        read: props.read ?? false,
      },
      id,
    );
  }

  get content() {
    return this.props.content;
  }
  get type() {
    return this.props.type;
  }
  get sender() {
    return this.props.sender;
  }
  get company_id() {
    return this.props.company_id;
  }
  get company_name() {
    return this.props.company_name;
  }
  get user_name() {
    return this.props.user_name;
  }
  get read() {
    return this.props.read;
  }
  get proposal_id() {
    return this.props.proposal_id;
  }

  get estimate_request_id() {
    return this.props.estimate_request_id;
  }
  get user_id() {
    return this.props.user_id;
  }

  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
}
