import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
}