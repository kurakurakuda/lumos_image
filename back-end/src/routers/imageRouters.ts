import express from 'express';
import {
  downloadHandler,
  imageListGetHandler,
  uploadHandler
} from '../handlers/imageHandler';
export const router = express
  .Router()
  .get('/', imageListGetHandler)
  .post('/', uploadHandler)
  .get('/:id/download', downloadHandler);
