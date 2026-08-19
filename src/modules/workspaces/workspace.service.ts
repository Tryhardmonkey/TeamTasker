import { createWorkspaceWithOwner, findWorkspacesForUser } from "./workspace.repository";
import { CreateWorkspaceInput, WorkspaceResponse } from "./workspace.types";
import { requireRole } from "./workspace.authorization";
import { addMemberToWorkspace } from "./workspace.repository";
import { findUserByEmail } from "../users/user.repository";
import { AddMemberInput } from "./workspace.types";
import { NotFoundError, ConflictError } from "../../shared/errors";

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

export async function addMember(
  workspaceId: string,
  requesterId: string,
  input: AddMemberInput
) {
  await requireRole(workspaceId, requesterId, "ADMIN");

  const userToAdd = await findUserByEmail(input.email);
  if (!userToAdd) {
    throw new NotFoundError("No user found with that email");
  }

  try {
    return await addMemberToWorkspace(workspaceId, userToAdd.id, input.role);
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new ConflictError("User is already a member of this workspace");
    }
    throw err;
  }
}