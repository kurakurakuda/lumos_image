import express, { RequestHandler } from 'express';
import { uploadHandler } from '../handlers/ImageHandler';

export const router = express
  .Router()
  .post('/', uploadHandler as RequestHandler);
