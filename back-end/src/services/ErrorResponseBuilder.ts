import { Response } from 'express';
import ErrorRes from '../dto/ErrorRes';

export const BuildBadRequestResponse = (res: Response, desc: string) => {
  return res.status(400).json(new ErrorRes('BAD_REQUEST', desc));
};

export const BuildSystemErrorResponse = (res: Response, desc: string) => {
  return res.status(500).json(new ErrorRes('SYSTEM_ERROR', desc));
};
