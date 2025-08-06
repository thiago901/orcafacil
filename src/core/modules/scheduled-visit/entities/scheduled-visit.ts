import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';
import { Customer } from '@core/modules/user/entities/customer';

export interface ScheduledVisitProps {
  customer_id: string;
  company_id: string;
  estimate_request_id: string;
  scheduled_at: Date;
  suggested_at?: Date | null;
  notes?: string | null;
  proposal_id: string;
  customer?: Customer | null;
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'SUGGESTED'
    | 'RESCHEDULED'
    | 'CANCELED'
    | 'COMPLETED';
  created_at: Date;
  updated_at: Date | null;
}

export class ScheduledVisit extends Entity<ScheduledVisitProps> {
  static create(
    props: Optional<
      ScheduledVisitProps,
      'created_at' | 'updated_at' | 'status'
    >,
    id?: UniqueEntityID,
  ) {
    return new ScheduledVisit(
      {
        status: props.status ?? 'PENDING',
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
        ...props,
      },
      id,
    );
  }

  get customer_id() {
    return this.props.customer_id;
  }
  get estimate_request_id() {
    return this.props.estimate_request_id;
  }
  get company_id() {
    return this.props.company_id;
  }
  get scheduled_at() {
    return this.props.scheduled_at;
  }
  set scheduled_at(value: Date) {
    this.props.scheduled_at = value;
    this.touch();
  }

  get suggested_at() {
    return this.props.suggested_at;
  }
  set suggested_at(value: Date | null | undefined) {
    this.props.suggested_at = value;
    this.touch();
  }

  get proposal_id() {
    return this.props.proposal_id;
  }
  get notes() {
    return this.props.notes;
  }
  set notes(value: string | null | undefined) {
    this.props.notes = value;
    this.touch();
  }

  get status() {
    return this.props.status;
  }
  set status(value: ScheduledVisitProps['status']) {
    this.props.status = value;
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }
  get customer() {
    return this.props.customer;
  }

  private touch() {
    this.props.updated_at = new Date();
  }
}
