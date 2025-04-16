import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface ProposalProps {
  amount: number;
  description: string;
  estimate_request_id: string;
  company_id: string;
  created_at: Date;
  updated_at: Date;
  aproved_at?: Date;
}

export class Proposal extends Entity<ProposalProps> {
  static create(props: ProposalProps, id?: UniqueEntityID) {
    return new Proposal(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
      },
      id,
    );
  }

  get amount() {
    return this.props.amount;
  }

  get description() {
    return this.props.description;
  }

  get estimate_request_id() {
    return this.props.estimate_request_id;
  }

  get company_id() {
    return this.props.company_id;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  get aproved_at() {
    return this.props.aproved_at;
  }
}
