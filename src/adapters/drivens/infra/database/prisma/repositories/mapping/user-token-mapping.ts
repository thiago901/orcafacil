import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import {
  UserToken,
  UserTokenType,
} from '@core/modules/user/entities/user-token';

import { UserToken as UserTokenPrisma } from '@prisma/client';

type UserTokenComplete = UserTokenPrisma;
export class UserTokenMapping {
  static toDomain({
    id,
    created_at,
    expires_at,
    token,
    type,
    used,
    user_id,
  }: UserTokenComplete) {
    return UserToken.create(
      {
        created_at,
        used,
        expires_at,
        token,
        type: type as UserTokenType,
        user_id,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(user_token: UserToken) {
    return {
      id: user_token.id.toString(),
      created_at: user_token.created_at,
      expires_at: user_token.expires_at,
      token: user_token.token,
      used: user_token.used,
      type: user_token.type,
      user_id: user_token.user_id,
    };
  }
}
