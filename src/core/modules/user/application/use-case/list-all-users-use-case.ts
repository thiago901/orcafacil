import { User } from '@core/modules/user/entities/user';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { UserRepository } from '../ports/repositories/user-repository';

type ResponseProps = Either<
  null,
  {
    users: User[];
  }
>;

@Injectable()
export class ListAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<ResponseProps> {
    const users = await this.userRepository.getAll();

    return right({ users });
  }
}
