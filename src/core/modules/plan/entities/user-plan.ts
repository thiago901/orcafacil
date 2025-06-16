import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export interface UserPlanProps {
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired';
  plan_type: 'monthly' | 'yearly';
  price: number;
  start_date: Date;
  end_date?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export class UserPlan extends Entity<UserPlanProps> {
  static create(
    props: Optional<UserPlanProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new UserPlan(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
      },
      id,
    );
  }

  get user_id() {
    return this.props.user_id;
  }

  get plan_id() {
    return this.props.plan_id;
  }

  get status() {
    return this.props.status;
  }

  set status(status: 'active' | 'cancelled' | 'expired') {
    this.props.status = status;
    this.touch();
  }

  get plan_type() {
    return this.props.plan_type;
  }

  get price() {
    return this.props.price;
  }

  get start_date() {
    return this.props.start_date;
  }

  get end_date() {
    return this.props.end_date;
  }

  set end_date(date: Date | null | undefined) {
    this.props.end_date = date;
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private touch() {
    this.props.updated_at = new Date();
  }
}
