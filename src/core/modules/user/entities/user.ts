import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export interface UserProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export class User extends Entity<UserProps> {
  static create(
    props: Optional<UserProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new User(
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

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get password() {
    return this.props.password;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }
}
