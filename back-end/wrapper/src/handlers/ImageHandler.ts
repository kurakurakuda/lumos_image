import { Request, Response } from 'express';
import IUploadDto from '../dto/interface/IUploadDto';
import { BuildSystemErrorResponse } from '../services/ErrorResponseBuilder';
import { uploadProducer } from '../producers/UploadRequestProducer';
import UploadResultDto from '../dto/UploadResultDto';

export const uploadHandler = async (
  req: Request<unknown, unknown, IUploadDto>,
  res: Response
) => {
  const reqBody = req.body;
  const correlationId = reqBody.correlationId;

  try {
    await uploadProducer(reqBody);
    return res
      .status(202)
      .json(new UploadResultDto(reqBody.clientId, correlationId, 'ACCEPTED'));
  } catch (err) {
    console.log(err);
    return BuildSystemErrorResponse(
      res,
      'System Error during uploading image to strorage'
    );
  }
};
