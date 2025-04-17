import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';
import { User } from '../../entities/user';
import { UserRepository } from '../ports/repositories/user-repository';
import { HashProvider } from '../ports/providers/hash-provider';
import { ResourceNotCreatedError } from '@core/common/errors/common/resource-not-created-error';

interface RequestProps {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  password: string;
}

type ResponseProps = Either<Error, { user: User }>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({
    name,
    email,
    phone,
    password,
    avatar,
  }: RequestProps): Promise<ResponseProps> {
    const user = User.create({
      name,
      email,
      phone,
      avatar: avatar ? avatar : null,
      password: await this.hashProvider.hash(password),
    });

    try {
      await this.userRepository.save(user);
      return right({ user });
    } catch (error: any) {
      console.log('error', error);

      return left(new ResourceNotCreatedError());
    }
  }
}
