import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

import { User } from './user';

export type UserTokenType = 'ACTIVATION' | 'RESET_PASSWORD';
export interface UserTokenProps {
  type: UserTokenType;
  token: string;
  user_id: string;
  expires_at: Date;
  used: boolean;
  created_at: Date;
  user?: User;
}
export class UserToken extends Entity<UserTokenProps> {
  static create(
    props: Optional<UserTokenProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    return new UserToken(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );
  }

  get type() {
    return this.props.type;
  }

  get token(): string {
    return this.props.token;
  }

  get user_id() {
    return this.props.user_id;
  }

  get user() {
    return this.props.user;
  }

  get expires_at() {
    return this.props.expires_at;
  }
  get used() {
    return this.props.used;
  }
  set used(used: boolean) {
    this.props.used = used;
  }

  get created_at() {
    return this.props.created_at;
  }
}
