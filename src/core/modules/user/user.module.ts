import { Module } from '@nestjs/common';
import { CreateSessionUseCase } from './application/use-case/create-session-use-case';
import { CreateUserUseCase } from './application/use-case/create-user-use-case';
import { DeleteUserUseCase } from './application/use-case/delete-user-use-case';
import { FindUserByIdUseCase } from './application/use-case/find-user-by-id-use-case';
import { ListAllUsersUseCase } from './application/use-case/list-all-users-use-case';
import { RecoverPasswordUseCase } from './application/use-case/recover-password-use-case';
import { UpdateUserUseCase } from './application/use-case/update-user-use-case';
import { UploadProfileImageUseCase } from './application/use-case/upload-profile-image-use-case';
import { RefreshSessionUseCase } from './application/use-case/refresh-session-use-case';
import { ActivateUserUseCase } from './application/use-case/acivate-user-use-case';
import { SendMessageSupportUseCase } from './application/use-case/send-message-support-use-case';

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

    UploadProfileImageUseCase,
    RefreshSessionUseCase,
    ActivateUserUseCase,
    SendMessageSupportUseCase,
  ],
  exports: [
    CreateSessionUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    ListAllUsersUseCase,
    RecoverPasswordUseCase,
    UpdateUserUseCase,
    UploadProfileImageUseCase,
    RefreshSessionUseCase,
    ActivateUserUseCase,
    SendMessageSupportUseCase,
  ],
})
export class UserModule {}
