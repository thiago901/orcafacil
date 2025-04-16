import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

import { UserRepository } from '../ports/repositories/user-repository';

interface RequestProps {
  email: string;
}

type ResponseProps = Either<Error, { message: string }>;

@Injectable()
export class RecoverPasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new ResourceNotFoundError('User not found'));
    }

    // Aqui você pode gerar um token de recuperação de senha e enviar para o email do usuário

    // Por enquanto, estamos apenas retornando uma mensagem
    return right({ message: 'Password recovery instructions sent' });
  }
}
