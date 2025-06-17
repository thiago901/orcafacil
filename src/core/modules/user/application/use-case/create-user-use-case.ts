import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';
import { User } from '../../entities/user';
import { UserRepository } from '../ports/repositories/user-repository';
import { HashProvider } from '../ports/providers/hash-provider';
import { ResourceNotCreatedError } from '@core/common/errors/common/resource-not-created-error';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';
import { UserTokenRepository } from '../ports/repositories/user-token-repository';
import { UserToken } from '../../entities/user-token';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { EmailProvider } from '@core/common/application/ports/providers/email-provider';
import * as path from 'node:path';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';
import { UserPlanRepository } from '@core/modules/plan/application/ports/repositories/user-plan-repository';
import { UserPlan } from '@core/modules/plan/entities/user-plan';

interface RequestProps {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  password: string;
  role: string;
}

type ResponseProps = Either<ResourceAlreadyExistsError, { user: User }>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly userTokenRepository: UserTokenRepository,
    private readonly userPlanRepository: UserPlanRepository,
    private readonly emailProvider: EmailProvider,
    private readonly env: EnvService,
  ) {}

  async execute({
    name,
    email,
    phone,
    password,
    avatar,
    role,
  }: RequestProps): Promise<ResponseProps> {
    const user = User.create({
      name,
      email,
      phone,
      role,
      active: false,
      avatar: avatar ? avatar : null,
      password: await this.hashProvider.hash(password),
    });

    try {
      const existUser = await this.userRepository.findByEmail(email);
      if (existUser) {
        return left(new ResourceAlreadyExistsError());
      }

      await this.userRepository.save(user);
      const user_plan = UserPlan.create({
        status: 'active',
        user_id: user.id.toString(),
        plan_id: 'free',
        plan_type: 'monthly',
        price: 0,
        start_date: new Date(),
      });
      await this.userPlanRepository.create(user_plan);

      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const user_token = UserToken.create({
        expires_at: sevenDaysFromNow,
        token: new UniqueEntityID().toString(),
        type: 'ACTIVATION',
        used: false,
        user_id: user.id.toString(),
      });
      await this.userTokenRepository.create(user_token);
      await this.emailProvider.send({
        to: user.email,
        subject: 'Bem Vindo à OrçaLink',
        templatePath: path.resolve(
          process.cwd(),
          'src/core/common/views/email-verification.hbs',
        ),
        variables: {
          userName: user.name,
          verificationLink: `${this.env.get('WEB_APPLICATION_URL')}/user/activation/${user_token.token}`,
        },
      });

      return right({ user });
    } catch (error: any) {
      console.log('error', error);

      return left(new ResourceNotCreatedError());
    }
  }
}
