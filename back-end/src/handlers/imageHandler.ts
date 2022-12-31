import { Request, Response } from 'express';
import ContentDto from '../dto/ContentDto';
import ImageDto from '../dto/ImageDto';
import ImageListDto from '../dto/ImageListDto';
import fs from 'fs';
import IUploadDto from '../dto/interface/IUploadDto';
import { ValidateUploadRequest } from '../services/RequestValidator';
import {
  BuildBadRequestResponse,
  BuildSystemErrorResponse
} from '../services/ErrorResponseBuilder';

export const imageListGetHandler = (req: Request, res: Response) => {
  const images: ImageDto[] = [];
  for (let i = 0; i < 5; i += 1) {
    const now = new Date().toISOString();
    images.push(new ImageDto(i.toString(), now));
  }
  return res.json(new ImageListDto(images));
};

export const uploadHandler = async (
  req: Request<unknown, unknown, IUploadDto>,
  res: Response
) => {
  const reqBody = req.body;
  const contents = reqBody.contents;
  const fileType = reqBody.fileType;
  if (ValidateUploadRequest(reqBody).length > 0) {
    return BuildBadRequestResponse(res, 'fileType or contents are invalid');
  }
  const now = new Date().toISOString();
  const filePath = 'C:\\Users\\kris3\\OneDrive\\デスクトップ\\test2.png';
  try {
    const buffer = Buffer.from(contents, 'base64');
    await fs.promises.writeFile(filePath, buffer);
  } catch (err) {
    return BuildSystemErrorResponse(
      res,
      'System Error during uploading image to strorage'
    );
  }
  return res.json(new ImageDto('1', now));
};

export const downloadHandler = async (req: Request, res: Response) => {
  const filePath = 'C:\\Users\\kris3\\OneDrive\\デスクトップ\\test.png';
  const id: string = req.params.id;
  try {
    const base64Data = await fs.promises.readFile(filePath, {
      encoding: 'base64'
    });
    return res.json(new ContentDto(id, 'png', base64Data));
  } catch (err) {
    return BuildSystemErrorResponse(
      res,
      'System Error during downloading image from strorage'
    );
  }
};
