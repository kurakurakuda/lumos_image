class UploadResultDto {
  clientId: string;
  correlationId: string;
  result: string;
  failureReason?: string;

  constructor(
    clientId: string,
    correlationId: string,
    result: string,
    reason?: string
  ) {
    this.clientId = clientId;
    this.correlationId = correlationId;
    this.result = result;
    this.failureReason = reason;
  }
}

export default UploadResultDto;
