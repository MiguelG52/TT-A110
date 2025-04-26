import { Response } from 'express';

export const sendAuthError = (res: Response, message: string, code = 401) => {
  res.status(code).json({ error: message });
  return 
};