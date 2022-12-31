import IUploadDto from '../dto/interface/IUploadDto';

export const ValidateUploadRequest = (req: IUploadDto): string[] => {
  const errors: string[] = [];
  if (!req.contents || req.contents.length === 0) {
    errors.push('contents');
  }

  if (req.fileType !== 'png') {
    errors.push('fileType');
  }
  return errors;
};
