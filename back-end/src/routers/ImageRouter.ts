import express, { RequestHandler } from 'express';
import {
  downloadHandler,
  imageListGetHandler,
  uploadHandler
} from '../handlers/ImageHandler';
import { processProducer } from '../producers/UploadResultProducer';

export const router = express
  .Router()
  .get('/', imageListGetHandler as RequestHandler)
  .post('/', uploadHandler as RequestHandler)
  .get('/:id/download', downloadHandler as RequestHandler)
  .post('/producer', processProducer as RequestHandler);
