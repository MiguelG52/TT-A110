import { Response } from 'express';

export const sendAuthError = (res: Response, message: string, code = 401) => {
  return res.status(code).json({ error: message });
};