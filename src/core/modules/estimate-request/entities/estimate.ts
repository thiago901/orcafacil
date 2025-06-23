import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { Optional } from '@core/common/entities/optional';

import { WatchedEstimateItem } from './watched-estimate-item';

type AddressProp = {
  street: string;
  number: string;
  postal_code: string;
  neighborhood: string;
  state: string;
  city: string;
};

export type EstimateCustomerProps = {
  name: string;
  phone: string;
  email: string;
  document: string;
  address: AddressProp;
};
export type EstimateCompanyProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  avatar?: string | null;
  address: AddressProp;
};
export interface EstimateProps {
  company: EstimateCompanyProps;
  company_id: string;
  customer: EstimateCustomerProps;
  description: string;
  total: number;
  items?: WatchedEstimateItem;
  expire_at: Date;
  created_at: Date;
  updated_at: Date | null;
}

export class Estimate extends Entity<EstimateProps> {
  static create(
    props: Optional<EstimateProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new Estimate(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
      },
      id,
    );
  }

  get company() {
    return this.props.company;
  }
  get customer() {
    return this.props.customer;
  }
  get description() {
    return this.props.description;
  }
  get expire_at() {
    return this.props.expire_at;
  }
  get items() {
    return this.props.items;
  }
  set items(items: WatchedEstimateItem | undefined) {
    this.props.items = items;
  }
  get total() {
    return this.props.total;
  }
  set total(total: number) {
    this.props.total = total;
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
}
