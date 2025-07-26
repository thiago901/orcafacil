import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';

import { UserRepository } from '../ports/repositories/user-repository';

import { HashProvider } from '../ports/providers/hash-provider';
import { TokenProvider } from '../ports/providers/token-provider';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { CustomerRepository } from '../ports/repositories/customers-repository';

interface RequestProps {
  email: string;
  password: string;
}

type ResponseProps = Either<Error, { token: string }>;

@Injectable()
export class CreateSessionUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly tokenProvider: TokenProvider,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute({ email, password }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findByEmail(email, {
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
    const customer = await this.customerRepository.findByUserId(
      user.id.toString(),
    );
    if (!customer) {
      return left(new InvalidCredentialsError());
    }
    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
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
      customer_id: customer.id.toString(),
    });

    return right({ token });
  }
}
