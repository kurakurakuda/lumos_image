import { Request, Response } from 'express';
import ContentDto from '../dto/ContentDto';
import ImageDto from '../dto/ImageDto';
import ImageListDto from '../dto/ImageListDto';
import {
  BuildNotFoundResponse,
  BuildSystemErrorResponse
} from '../services/ErrorResponseBuilder';
import { findImages, findImageById } from '../repository/ImageRepository';
import { download } from '../services/StorageService';

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
