import { Module } from '@nestjs/common';
import { CreateSessionUseCase } from './application/use-case/create-session-use-case';
import { CreateUserUseCase } from './application/use-case/create-user-use-case';
import { DeleteUserUseCase } from './application/use-case/delete-user-use-case';
import { FindUserByIdUseCase } from './application/use-case/find-user-by-id-use-case';
import { ListAllUsersUseCase } from './application/use-case/list-all-users-use-case';
import { RecoverPasswordUseCase } from './application/use-case/recover-password-use-case';
import { UpdateUserUseCase } from './application/use-case/update-user-use-case';
import { UserRepository } from './application/ports/repositories/user-repository';
import { PrismaUserRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-user-repository';

@Module({
  imports: [],

  providers: [
    CreateSessionUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    ListAllUsersUseCase,
    RecoverPasswordUseCase,
    UpdateUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    CreateSessionUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    ListAllUsersUseCase,
    RecoverPasswordUseCase,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
