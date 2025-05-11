import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';

export interface ProposalProps {
  amount: number;
  description: string;
  estimate_request_id: string;
  company_id: string;
  company?: Company;
  created_at: Date;
  updated_at: Date | null;
  approved_at: Date | null;
  reject_at: Date | null;
}

export class Proposal extends Entity<ProposalProps> {
  static create(
    props: Optional<
      ProposalProps,
      'approved_at' | 'updated_at' | 'created_at' | 'reject_at'
    >,
    id?: UniqueEntityID,
  ) {
    return new Proposal(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? null,
        approved_at: props.approved_at ?? null,
        reject_at: props.reject_at ?? null,
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

  get approved_at() {
    return this.props.approved_at;
  }
  set approved_at(value: Date | null) {
    this.props.approved_at = value;
    this.touch();
  }
  get reject_at() {
    return this.props.reject_at;
  }
  set reject_at(value: Date | null) {
    this.props.reject_at = value;
    this.touch();
  }
  get company() {
    return this.props.company;
  }

  private touch() {
    this.props.updated_at = new Date();
  }
}
