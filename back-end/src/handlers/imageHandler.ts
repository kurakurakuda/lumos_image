import { Request, Response } from 'express';
import ContentDto from '../dto/ContentDto';
import ImageDto from '../dto/ImageDto';
import ImageListDto from '../dto/ImageListDto';
import fs from 'fs';
import ErrorRes from '../dto/ErrorRes';
import uploadIF from '../dto/interface/UploadIF';

export const imageListGetHandler = (req: Request, res: Response) => {
  const images: ImageDto[] = [];
  for (let i = 0; i < 5; i += 1) {
    const now = new Date().toISOString();
    images.push(new ImageDto(i.toString(), now));
  }
  res.json(new ImageListDto(images));
};

export const uploadHandler = async (
  req: Request<unknown, unknown, uploadIF>,
  res: Response
) => {
  const reqBody = req.body;
  const contents = reqBody.contents;
  const now = new Date().toISOString();
  const filePath = 'C:\\Users\\kris3\\OneDrive\\デスクトップ\\test2.png';
  try {
    const buffer = Buffer.from(contents, 'base64');
    await fs.promises.writeFile(filePath, buffer);
  } catch (err) {
    res
      .status(500)
      .json(
        new ErrorRes('500', 'System Error during uploading image to strorage')
      );
  }
  res.json(new ImageDto('1', now));
};
export const downloadHandler = async (req: Request, res: Response) => {
  const filePath = 'C:\\Users\\kris3\\OneDrive\\デスクトップ\\test.png';
  const id: string = req.params.id;
  try {
    const base64Data = await fs.promises.readFile(filePath, {
      encoding: 'base64'
    });
    res.json(new ContentDto(id, 'png', base64Data));
  } catch (err) {
    res
      .status(500)
      .json(
        new ErrorRes(
          '500',
          'System Error during downloading image from strorage'
        )
      );
  }
};
