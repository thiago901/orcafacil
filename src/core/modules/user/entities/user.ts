import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';
import { Company } from '@core/modules/company/entities/company';

export interface UserProps {
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  password: string;
  created_at: Date;
  updated_at: Date;
  company?: Company | null;
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
  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get avatar(): string | null {
    return this.props.avatar;
  }

  set avatar(avatar: string | null) {
    this.props.avatar = avatar;
    this.touch();
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

  get password() {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
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

  get company() {
    return this.props.company;
  }
}
