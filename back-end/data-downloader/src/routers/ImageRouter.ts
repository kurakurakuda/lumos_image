import express, { RequestHandler } from 'express';
import { downloadHandler, imageListGetHandler } from '../handlers/ImageHandler';

export const router = express
  .Router()
  .get('/', imageListGetHandler as RequestHandler)
  .get('/:id/download', downloadHandler as RequestHandler);
