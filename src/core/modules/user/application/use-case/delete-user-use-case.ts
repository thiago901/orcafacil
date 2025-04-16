import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { UserRepository } from '../ports/repositories/user-repository';

interface RequestProps {
  id: string;
}

type ResponseProps = Either<Error, null>;

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    await this.userRepository.delete(id);
    return right(null);
  }
}
