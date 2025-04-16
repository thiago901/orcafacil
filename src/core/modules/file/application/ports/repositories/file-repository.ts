import { File } from '@core/modules/file/entities/file';

export abstract class FileRepository {
  abstract save(user: File): Promise<void>;
  abstract getAll(): Promise<File[]>;
}
