class UploadResultDto {
  correlationId: string;
  result: string;
  failureReason?: string;

  constructor(correlationId: string, result: string, reason?: string) {
    this.correlationId = correlationId;
    this.result = result;
    this.failureReason = reason;
  }
}

export default UploadResultDto;
