import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { UploadFileProvider } from '../ports/provider/upload-file';

import { EstimateRequestFile } from '../../entities/estimate-request-file';
import { EstimateRequestFileRepository } from '../ports/repositories/estimate-request-repository-file';

interface RequestProps {
  files: Express.Multer.File[];
  estimate_request_id: string;
}

type ResponseProps = Either<null, null>;

@Injectable()
export class UploadEstimateRequestFilesUseCase {
  constructor(
    private readonly uploadFileProvider: UploadFileProvider,
    private readonly estimateRequestFileRepository: EstimateRequestFileRepository,
  ) {}

  async execute({
    files,
    estimate_request_id,
  }: RequestProps): Promise<ResponseProps> {
    const all_files: EstimateRequestFile[] = [];
    for (const file of files) {
      const { path } = await this.uploadFileProvider.upload({
        file,
        fileName: file.originalname,
      });
      all_files.push(
        EstimateRequestFile.create({
          url: path,
          estimate_request_id,
        }),
      );
    }
    await this.estimateRequestFileRepository.save(all_files);
    return right(null);
  }
}
