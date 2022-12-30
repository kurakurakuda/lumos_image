import { Request, Response } from 'express';
import ContentDto from '../dto/ContentDto';
import ImageDto from '../dto/ImageDto';
import ImageListDto from '../dto/ImageListDto';

export const imageListGetHandler = (req: Request, res: Response) => {
  const images: ImageDto[] = [];
  for (let i = 0; i < 5; i += 1) {
    const now = new Date().toISOString();
    images.push(new ImageDto(i.toString(), now));
  }
  res.json(new ImageListDto(images));
};

export const uploadHandler = (req: Request, res: Response) => {
  res.json({ result: 'SUCCESS' });
};
export const downloadHandler = (req: Request, res: Response) => {
  res.json(new ContentDto('id', 'png', 'contents.....'));
};
