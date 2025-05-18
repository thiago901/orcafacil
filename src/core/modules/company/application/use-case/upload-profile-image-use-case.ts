import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { UploadFileProvider } from '@core/modules/estimate-request/application/ports/provider/upload-file';

import { CompanyRepository } from '../ports/repositories/company-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { Company } from '../../entities/company';

interface RequestProps {
  file: Express.Multer.File;
  company_id: string;
}

type ResponseProps = Either<
  null,
  {
    company: Company;
  }
>;

@Injectable()
export class UploadProfileImageUseCase {
  constructor(
    private readonly uploadFileProvider: UploadFileProvider,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute({ file, company_id }: RequestProps): Promise<ResponseProps> {
    const company = await this.companyRepository.findById(company_id);
    if (!company) {
      throw new ResourceNotFoundError();
    }

    const { path } = await this.uploadFileProvider.upload({
      file,
      fileName: file.originalname,
    });
    company.avatar = path;
    await this.companyRepository.save(company);
    return right({ company });
  }
}
