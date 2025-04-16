import { User } from '@core/modules/user/entities/user';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract getAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
}
