import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { UploadFileProvider } from '@core/modules/estimate-request/application/ports/provider/upload-file';

import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { User } from '../../entities/user';
import { UserRepository } from '../ports/repositories/user-repository';

interface RequestProps {
  file: Express.Multer.File;
  user_id: string;
}

type ResponseProps = Either<
  null,
  {
    user: User;
  }
>;

@Injectable()
export class UploadProfileImageUseCase {
  constructor(
    private readonly uploadFileProvider: UploadFileProvider,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ file, user_id }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    if (user.avatar) {
      await this.uploadFileProvider.delete(user.avatar);
    }
    const { path } = await this.uploadFileProvider.upload({
      file,
      fileName: file.originalname,
    });
    user.avatar = path;
    await this.userRepository.save(user);
    return right({ user });
  }
}
