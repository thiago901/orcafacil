import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export interface CustomerProps {
  name: string;
  email: string;
  phone: string;
  document: string;
  user_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export class Customer extends Entity<CustomerProps> {
  static create(
    props: Optional<CustomerProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new Customer(
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

  get document(): string {
    return this.props.document;
  }
  get user_id(): string {
    return this.props.user_id;
  }

  get email() {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get phone() {
    return this.props.phone;
  }
  set phone(phone: string) {
    this.props.phone = phone;
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
