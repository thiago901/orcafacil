import { User } from '@core/modules/user/entities/user';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { UserRepository } from '../ports/repositories/user-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

type RequestProps = {
  id: string;
};
type ResponseProps = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return right({ user });
  }
}
