import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || "Внутрішня помилка сервера";
  
  let status = 500;
  let code = "INTERNAL_SERVER_ERROR";

  if (message.startsWith("VALIDATION:")) {
    status = 400;
    code = "VALIDATION_ERROR";
  } else if (message.startsWith("NOT_FOUND:")) {
    status = 404;
    code = "NOT_FOUND";
  }

  res.status(status).json({
    error: {
      code,
      message: message.split(":").pop(),
    }
  });
};