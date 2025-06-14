import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';
import { User } from '../../entities/user';
import { UserRepository } from '../ports/repositories/user-repository';
import * as fns from 'date-fns';
import { ResourceNotCreatedError } from '@core/common/errors/common/resource-not-created-error';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';
import { UserTokenRepository } from '../ports/repositories/user-token-repository';

import { EmailProvider } from '@core/common/application/ports/providers/email-provider';
import * as path from 'node:path';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';
import { TokenExpiredError } from '../errors/token-expired-error';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  token: string;
}

type ResponseProps = Either<ResourceAlreadyExistsError, { user: User }>;

@Injectable()
export class ActivateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokenRepository,
    private readonly emailProvider: EmailProvider,
    private readonly env: EnvService,
  ) {}

  async execute({ token }: RequestProps): Promise<ResponseProps> {
    try {
      const user_token = await this.userTokenRepository.findByToken(token);
      if (!user_token) {
        return left(new ResourceNotFoundError());
      }
      const today = new Date();
      const isExpired = fns.isAfter(today, user_token.expires_at);
      if (isExpired) {
        return left(new TokenExpiredError());
      }

      const user = await this.userRepository.findById(user_token.user_id);

      if (!user) {
        return left(new ResourceNotFoundError());
      }
      if (!user_token.used) {
        return right({ user });
      }
      user.active = true;
      await this.userRepository.save(user);

      await this.emailProvider.send({
        to: user.email,
        subject: 'Conta ativada na OrçaLink',
        templatePath: path.resolve(
          process.cwd(),
          'src/core/common/views/email-activated.hbs',
        ),
        variables: {
          userName: user.name,
          dashboardLink: `${this.env.get('WEB_APPLICATION_URL')}`,
        },
      });
      user_token.used = true;
      await this.userTokenRepository.save(user_token);
      return right({ user });
    } catch (error: any) {
      console.log('error', error);

      return left(new ResourceNotCreatedError());
    }
  }
}
