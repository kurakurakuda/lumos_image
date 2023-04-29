interface IUploadDto {
  clientId: string;
  correlationId: string;
  fileType: string;
  contents: string;
}

export default IUploadDto;
