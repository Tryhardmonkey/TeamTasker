import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../users/user.repository";
import { RegisterInput, AuthResponse } from "./auth.types";
import { ConflictError } from "../../shared/errors";
import jwt from "jsonwebtoken";
import { LoginInput, LoginResponse } from "./auth.types";
import { UnauthorizedError } from "../../shared/errors";

const SALT_ROUNDS = 10;

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new ConflictError("Email already in use");
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await createUser({
    email: input.email,
    passwordHash,
    name: input.name,
  });

  return {
    user: { id: user.id, email: user.email, name: user.name },
  };
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function login(input: LoginInput): Promise<LoginResponse> {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  return {
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
  };
}