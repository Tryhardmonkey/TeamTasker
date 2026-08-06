import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../users/user.repository";
import { RegisterInput, AuthResponse } from "./auth.types";
import { ConflictError } from "../../shared/errors";

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