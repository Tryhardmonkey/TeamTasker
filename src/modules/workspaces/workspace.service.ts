import { createWorkspaceWithOwner, findWorkspacesForUser } from "./workspace.repository";
import { CreateWorkspaceInput, WorkspaceResponse } from "./workspace.types";

export async function createWorkspace(
  input: CreateWorkspaceInput,
  ownerId: string
): Promise<WorkspaceResponse> {
  const workspace = await createWorkspaceWithOwner(input.name, ownerId);
  return workspace;
}

export async function listMyWorkspaces(userId: string): Promise<WorkspaceResponse[]> {
  return findWorkspacesForUser(userId);
}