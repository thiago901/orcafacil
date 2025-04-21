export type UploadFileProviderProps = {
  file: Express.Multer.File;
  fileName: string;
};

export abstract class UploadFileProvider {
  abstract upload(data: UploadFileProviderProps): Promise<void>;
}
