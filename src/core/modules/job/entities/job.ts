import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Estimate } from '@core/modules/estimate-request/entities/estimate';
import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';
import { Proposal } from '@core/modules/proposal/entities/proposal';

export type JobStatus = 'BACKLOG' | 'IN_PROGRESS' | 'FINISHED';
export interface JobProps {
  company_id: string;
  proposal_id: string;
  estimate_request_id: string;
  estimate_id: string;
  created_at: Date;
  updated_at: Date | null;
  proposal?: Proposal;
  estimate_request?: EstimateRequest;
  estimate?: Estimate;
  status: JobStatus;
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
  get estimate_request_id() {
    return this.props.estimate_request_id;
  }
  get estimate_id() {
    return this.props.estimate_id;
  }
  get status() {
    return this.props.status;
  }
  set status(status: JobStatus) {
    this.props.status = status;
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
  get estimate_request() {
    return this.props.estimate_request;
  }
  get estimate() {
    return this.props.estimate_request;
  }
}
