import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';

import { UserRepository } from '../ports/repositories/user-repository';

import { TokenProvider } from '../ports/providers/token-provider';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

interface RequestProps {
  id: string;
}

type ResponseProps = Either<Error, { token: string }>;

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(id, {
      relations: {
        companies: true,
        user_plans: {
          where: {
            status: 'active',
          },
        },
      },
    });

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const token = await this.tokenProvider.sign({
      sub: user.id.toString(),
      email: user.email,
      phone: user.phone,
      name: user.name,
      company_id: user.company?.id.toString(),
      role: user.role,
      plan_id: user.plan?.plan_id,
      active: user.active,
      avatar: user.avatar,
    });

    return right({ token });
  }
}
