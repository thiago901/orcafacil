import { File } from '@core/modules/file/entities/file';
import { FileRepository } from '../ports/repositories/file-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

type ResponseProps = Either<
  null,
  {
    files: File[];
  }
>;

@Injectable()
export class ListAllFilesUseCase {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(): Promise<ResponseProps> {
    const files = await this.fileRepository.getAll();

    return right({ files });
  }
}
