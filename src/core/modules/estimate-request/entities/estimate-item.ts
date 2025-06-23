import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { Optional } from '@core/common/entities/optional';

export type EstimateItemsTypeProps = 'MATERIAL' | 'SERVICE' | 'OTHER';
export type EstimateItemsTypeUnitProps =
  | 'UNITS'
  | 'HOURS'
  | 'LITERS'
  | 'KILOGRAMS';

export interface EstimateItemsProps {
  type: EstimateItemsTypeProps;
  name: string;
  description: string;
  unit: EstimateItemsTypeUnitProps;
  price: number;
  quantity: number;
  total: number;

  estimate_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export class EstimateItem extends Entity<EstimateItemsProps> {
  static create(
    props: Optional<EstimateItemsProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new EstimateItem(
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
  get type() {
    return this.props.type;
  }
  get description() {
    return this.props.description;
  }
  get unit() {
    return this.props.unit;
  }
  get price() {
    return this.props.price;
  }
  get quantity() {
    return this.props.quantity;
  }

  get total() {
    return this.props.total;
  }

  get estimate_id() {
    return this.props.estimate_id;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
}
