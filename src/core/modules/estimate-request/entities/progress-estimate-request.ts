import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export type ProgressEstimateRequestType =
  | 'CREATED'
  | 'PROPOSALS_WAITING'
  | 'PROPOSALS_RECEIVED'
  | 'PROPOSALS_ACCEPTED'
  | 'VISIT_CREATED'
  | 'VISIT_REQUESTED'
  | 'VISIT_CONFIRMED'
  | 'VISIT_SUGGESTED'
  | 'VISIT_WAITING'
  | 'VISIT_COMPLETED'
  | 'PAYMENT_REQUESTED'
  | 'PAYMENT_COMPLETED'
  | 'WAITING'
  | 'FINISHED';

export interface EstimateRequestProps {
  estimate_request_id: string;
  title: string;
  proposal_id: string;
  description: string;
  type: ProgressEstimateRequestType;
  props: object | null;
  created_at: Date;
}

export class ProgressEstimateRequest extends Entity<EstimateRequestProps> {
  static create(
    props: Optional<EstimateRequestProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    return new ProgressEstimateRequest(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );
  }

  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;
  }
  get estimate_request_id() {
    return this.props.estimate_request_id;
  }

  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }

  get type() {
    return this.props.type;
  }

  get created_at() {
    return this.props.created_at;
  }
  get proporties() {
    return this.props.props;
  }
  get proposal_id() {
    return this.props.proposal_id;
  }
}
