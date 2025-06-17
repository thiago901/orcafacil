import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export interface PlanUsageProps {
  user_plan_id: string;
  user_id: string;
  resource: string; // Exemplo: 'proposalsPerMonth'
  count: number;
  period: Date | null; // Ex: Primeiro dia do mês
  created_at: Date;
  updated_at: Date;
}

export class PlanUsage extends Entity<PlanUsageProps> {
  static create(
    props: Optional<PlanUsageProps, 'count' | 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new PlanUsage(
      {
        count: props.count ?? 0,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
        ...props,
      },
      id,
    );
  }

  get user_plan_id() {
    return this.props.user_plan_id;
  }

  get resource() {
    return this.props.resource;
  }

  get count() {
    return this.props.count;
  }

  set count(value: number) {
    this.props.count = value;
    this.touch();
  }

  increment(value = 1) {
    this.props.count += value;
    this.touch();
  }

  get user_id() {
    return this.props.user_id;
  }
  get period() {
    return this.props.period;
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
