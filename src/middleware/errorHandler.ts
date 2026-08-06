import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    error: "InternalServerError",
    message: "Something went wrong",
  });
}