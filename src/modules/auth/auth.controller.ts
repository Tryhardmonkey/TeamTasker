import { Request, Response, NextFunction } from "express";
import { RegisterSchema } from "./auth.types";
import { register } from "./auth.service";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const input = RegisterSchema.parse(req.body);
    const result = await register(input);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}