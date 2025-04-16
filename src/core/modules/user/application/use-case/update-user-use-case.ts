import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { User } from '../../entities/user';
import { UserRepository } from '../ports/repositories/user-repository';

interface RequestProps {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

type ResponseProps = Either<Error, { user: User }>;

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id,
    name,
    email,
    phone,
    password,
  }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    // user.name = name;

    await this.userRepository.save(user);
    return right({ user });
  }
}
