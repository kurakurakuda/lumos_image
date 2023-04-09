interface IQueueResultDto {
  correlationId: string;
  result: string;
  failureReason?: string;
}

export default IQueueResultDto;
