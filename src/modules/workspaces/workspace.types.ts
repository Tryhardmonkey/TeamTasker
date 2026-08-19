import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(1).max(100),
});

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;

export interface WorkspaceResponse {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
}

export const AddMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(["ADMIN", "MEMBER"]),
});

export type AddMemberInput = z.infer<typeof AddMemberSchema>;