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