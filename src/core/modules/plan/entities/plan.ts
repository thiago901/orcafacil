import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export interface PlanProps {
  name: string;
  description: string | null;
  resources: any;
  actived: boolean;
  price_month: number;
  price_year: number;
  price_id_month?: string | null;
  price_id_year?: string | null;
  created_at: Date;
  updated_at: Date;
}

export class Plan extends Entity<PlanProps> {
  static create(
    props: Optional<PlanProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new Plan(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
    this.touch();
  }
  get resources() {
    return this.props.resources;
  }
  get actived() {
    return this.props.actived;
  }
  get price_month() {
    return this.props.price_month;
  }
  get price_year() {
    return this.props.price_year;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
  get description() {
    return this.props.description;
  }
  get price_id_month() {
    return this.props.price_id_month;
  }
  get price_id_year() {
    return this.props.price_id_year;
  }

  private touch() {
    this.props.updated_at = new Date();
  }
}
