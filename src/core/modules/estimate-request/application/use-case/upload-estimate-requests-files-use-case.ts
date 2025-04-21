import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { UploadFileProvider } from '../ports/provider/upload-file';

interface RequestProps {
  files: Express.Multer.File[];
}

type ResponseProps = Either<null, null>;

@Injectable()
export class UploadEstimateRequestFilesUseCase {
  constructor(private readonly uploadFileProvider: UploadFileProvider) {}

  async execute({ files }: RequestProps): Promise<ResponseProps> {
    for (const file of files) {
      await this.uploadFileProvider.upload({
        file,
        fileName: file.originalname,
      });
    }

    return right(null);
  }
}
