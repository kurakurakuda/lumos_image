interface IQueueResultDto {
  clientId: string;
  correlationId: string;
  result: string;
  failureReason?: string;
}

export default IQueueResultDto;
