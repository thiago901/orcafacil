import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EnvService } from '../infra/envs/env.service';
import { lookup } from 'mime-types';
import {
  UploadFileProvider,
  UploadFileProviderProps,
  UploadFileProviderResponse,
} from '@core/modules/estimate-request/application/ports/provider/upload-file';
import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

@Injectable()
export class FirebaseUploadFileProvider implements UploadFileProvider {
  constructor(private readonly env: EnvService) {
    const serviceAccount = JSON.parse(this.env.get('FIREBASE_CREDENTIALS'));
    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      '\n',
    );

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: this.env.get('FIREBASE_BUCKET_STORAGE_NAME'),
        databaseURL: this.env.get('FIREBASE_DATABASE_URL'),
      });
    }
  }

  async upload({
    file,
    fileName,
  }: UploadFileProviderProps): Promise<UploadFileProviderResponse> {
    const bucket = admin.storage().bucket();

    const name = path.basename(fileName, path.extname(fileName));
    const ext = path.extname(fileName);

    const finalFileName = `${name}-${randomUUID()}${ext}`;
    const bucketRepo = bucket.file(`orcafacil/${'dev'}/${finalFileName}`);

    const contentType = lookup(finalFileName) || 'application/octet-stream';

    await bucketRepo.save(file.buffer, {
      metadata: {
        contentType,
      },
      public: true,
    });

    return {
      path: `https://storage.googleapis.com/${bucket.name}/${bucketRepo.name}`,
    };
  }
}
