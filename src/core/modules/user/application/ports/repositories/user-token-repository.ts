import { UserToken } from '@core/modules/user/entities/user-token';

export abstract class UserTokenRepository {
  abstract create(user_token: UserToken): Promise<void>;
  abstract save(user_token: UserToken): Promise<void>;
  abstract findById(id: string): Promise<UserToken | null>;
  abstract findByToken(token: string): Promise<UserToken | null>;
  abstract delete(id: string): Promise<void>;
}
