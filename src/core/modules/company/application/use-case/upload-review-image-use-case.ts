import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import {
  UploadFileProvider,
  UploadFileProviderResponse,
} from '@core/modules/estimate-request/application/ports/provider/upload-file';

import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { CompanyReviewFile } from '../../entities/company-review-file';
import { CompanyReviewRepository } from '../ports/repositories/company-review-repository';
import { CompanyReviewFileRepository } from '../ports/repositories/company-review-file-repository';

interface RequestProps {
  files: Express.Multer.File[];
  company_review_id: string;
}

type ResponseProps = Either<
  null,
  {
    company_review_files: CompanyReviewFile[];
  }
>;

@Injectable()
export class UploadReviewImageUseCase {
  constructor(
    private readonly uploadFileProvider: UploadFileProvider,
    private readonly companyReviewRepository: CompanyReviewRepository,
    private readonly companyReviewFileRepository: CompanyReviewFileRepository,
  ) {}

  async execute({
    files,
    company_review_id,
  }: RequestProps): Promise<ResponseProps> {
    const company_review =
      await this.companyReviewRepository.findById(company_review_id);
    if (!company_review) {
      throw new ResourceNotFoundError();
    }
    const promisses: Promise<UploadFileProviderResponse>[] = [];
    for (const file of files) {
      promisses.push(
        this.uploadFileProvider.upload({
          file,
          fileName: file.originalname,
        }),
      );
    }
    const responses = await Promise.all(promisses);

    const review_files: CompanyReviewFile[] = [];
    for (const response of responses) {
      const { path } = response;
      const review_file = CompanyReviewFile.create({
        company_review_id: company_review.id.toString(),
        url: path,
      });
      await this.companyReviewFileRepository.create(review_file);
      review_files.push(review_file);
    }

    return right({ company_review_files: review_files });
  }
}
