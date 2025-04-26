import { Response } from "express";
export const sendSuccessResponse = (
    res: Response, 
    status: number, 
    message: string, 
    data: any = {}
  ) => {
    return res.status(status).json({
      message,
      data
    });
  };
  
  export const sendErrorResponse = (
    res: Response, 
    status: number, 
    error: string, 
  ) => {
    return res.status(status).json({
      error,
    });
  };