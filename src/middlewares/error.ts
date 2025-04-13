import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/exception";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err.message || "Erro interno do servidor";

  res.status(statusCode).json({ success: false, error: message });
}
