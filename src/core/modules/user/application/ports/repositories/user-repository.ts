import { User } from '@core/modules/user/entities/user';

export type UserRepositoryOptions = {
  relations?: any;
};
export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract getAll(): Promise<User[]>;
  abstract findById(
    id: string,
    options?: UserRepositoryOptions,
  ): Promise<User | null>;
  abstract findByEmail(
    email: string,
    options?: UserRepositoryOptions,
  ): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
}
