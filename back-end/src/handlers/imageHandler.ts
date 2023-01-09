import { Request, Response } from 'express';
import ContentDto from '../dto/ContentDto';
import ImageDto from '../dto/ImageDto';
import ImageListDto from '../dto/ImageListDto';
import IUploadDto from '../dto/interface/IUploadDto';
import { ValidateUploadRequest } from '../services/RequestValidator';
import {
  BuildBadRequestResponse,
  BuildNotFoundResponse,
  BuildSystemErrorResponse
} from '../services/ErrorResponseBuilder';
import {
  insertImageMetaData,
  findImages,
  findImageById
} from '../repository/ImageRepository';
import { v4 } from 'uuid';
import { buildImagePath, download, upload } from '../services/StorageService';

export const imageListGetHandler = async (req: Request, res: Response) => {
  try {
    const entities = await findImages();
    const images: ImageDto[] = entities.map(e => new ImageDto(e));
    return res.json(new ImageListDto(images));
  } catch (err) {
    console.log(err);
    return BuildSystemErrorResponse(
      res,
      'System Error during getting image data'
    );
  }
};

export const uploadHandler = async (
  req: Request<unknown, unknown, IUploadDto>,
  res: Response
) => {
  const reqBody = req.body;
  if (ValidateUploadRequest(reqBody).length > 0) {
    return BuildBadRequestResponse(res, 'fileType or contents are invalid');
  }

  const contents = reqBody.contents;
  const fileType = reqBody.fileType;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const id: string = v4();
  const path = buildImagePath(`${id}.${fileType}`);

  try {
    const result = await insertImageMetaData(id, path, fileType);
    await upload(path, contents);
    return res.json(new ImageDto(result));
  } catch (err) {
    console.log(err);
    return BuildSystemErrorResponse(
      res,
      'System Error during uploading image to strorage'
    );
  }
};

export const downloadHandler = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const entity = await findImageById(id);
    if (!entity) {
      return BuildNotFoundResponse(res, `The id ${id} is not found in db`);
    }
    const base64Data = await download(entity.path);
    return res.json(new ContentDto(id, 'png', base64Data));
  } catch (err) {
    console.log(err);
    return BuildSystemErrorResponse(
      res,
      'System Error during downloading image from strorage'
    );
  }
};
