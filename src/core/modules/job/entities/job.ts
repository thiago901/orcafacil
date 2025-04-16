import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface JobProps {
  company_id: string;
  proposal_id: string;
}

export class Job extends Entity<JobProps> {
  static create(props: JobProps, id?: UniqueEntityID) {
    return new Job(props, id);
  }

  get company_id() {
    return this.props.company_id;
  }

  get proposal_id() {
    return this.props.proposal_id;
  }
}
