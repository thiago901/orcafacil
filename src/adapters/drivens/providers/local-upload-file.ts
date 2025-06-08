import { Injectable } from '@nestjs/common';

import { EnvService } from '../infra/envs/env.service';

import {
  UploadFileProvider,
  UploadFileProviderProps,
  UploadFileProviderResponse,
} from '@core/modules/estimate-request/application/ports/provider/upload-file';
import { join } from 'node:path';
import { promises as fs } from 'fs';
import { randomUUID } from 'node:crypto';

@Injectable()
export class LocalUploadFileProvider implements UploadFileProvider {
  constructor(private readonly env: EnvService) {}
  delete(fileUrl: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async upload({
    file,
    fileName,
  }: UploadFileProviderProps): Promise<UploadFileProviderResponse> {
    const tempFolder = join(process.cwd(), 'temp');

    // Garante que a pasta existe
    await fs.mkdir(tempFolder, { recursive: true });

    const extension = file.originalname.split('.').pop();
    const finalFileName = `${fileName ?? randomUUID()}.${extension}`;
    const filePath = join(tempFolder, finalFileName);

    await fs.writeFile(filePath, file.buffer);

    return {
      path: `http://localhost:${this.env.get('PORT')}/temp/${finalFileName}`,
    };
  }
}
