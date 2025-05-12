import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Proposal } from '@core/modules/proposal/entities/proposal';

export interface JobProps {
  company_id: string;
  proposal_id: string;
  created_at: Date;
  updated_at: Date | null;
  proposal?: Proposal;
}

export class Job extends Entity<JobProps> {
  static create(
    props: Optional<JobProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new Job(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
      },
      id,
    );
  }

  get company_id() {
    return this.props.company_id;
  }

  get proposal_id() {
    return this.props.proposal_id;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
  get proposal() {
    return this.props.proposal;
  }
}
