import { Request, Response, NextFunction } from "express";
import { RegisterSchema, LoginSchema } from "./auth.types";
import { register, login } from "./auth.service";
import { AuthenticatedRequest } from "../../middleware/authenticate";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const input = RegisterSchema.parse(req.body);
    const result = await register(input);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const input = LoginSchema.parse(req.body);
    const result = await login(input);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export function getMe(req: AuthenticatedRequest, res: Response) {
  res.status(200).json({ user: req.user });
}