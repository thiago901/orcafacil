import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';

import { UserRepository } from '../ports/repositories/user-repository';
import { ResourceNotCreatedError } from '@core/common/errors/common/resource-not-created-error';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';

import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { SupportProvider } from '@core/common/application/ports/providers/suport-provider';

interface RequestProps {
  user_id: string;
  title: string;
  body: string;
  label: string;
}

type ResponseProps = Either<ResourceAlreadyExistsError, null>;

@Injectable()
export class SendMessageSupportUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly supportProvider: SupportProvider,
  ) {}

  async execute({
    user_id,
    body,
    title,
    label,
  }: RequestProps): Promise<ResponseProps> {
    try {
      const user = await this.userRepository.findById(user_id);
      if (!user) {
        return left(new ResourceNotFoundError());
      }
      await this.supportProvider.send({
        body,
        email: user.email,
        labels: [label, user.role],
        title: `[Usuario: ${user.email}] ${title}`,
      });
      return right(null);
    } catch (error: any) {
      console.log('error', error);

      return left(new ResourceNotCreatedError());
    }
  }
}
