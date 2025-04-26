export type UploadFileProviderProps = {
  file: Express.Multer.File;
  fileName: string;
};
export type UploadFileProviderResponse = {
  path: string;
};

export abstract class UploadFileProvider {
  abstract upload(
    data: UploadFileProviderProps,
  ): Promise<UploadFileProviderResponse>;
}
