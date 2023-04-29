import { Response } from 'express';
import ErrorRes from '../dto/ErrorRes';

export const BuildSystemErrorResponse = (res: Response, desc: string) => {
  return res.status(500).json(new ErrorRes('SYSTEM_ERROR', desc));
};
