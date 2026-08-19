import { findWorkspaceMembership } from "./workspace.repository";
import { ForbiddenError } from "../../shared/errors";

const ROLE_RANK = { MEMBER: 0, ADMIN: 1, OWNER: 2 } as const;
type Role = keyof typeof ROLE_RANK;

export async function requireRole(
  workspaceId: string,
  userId: string,
  minimumRole: Role
) {
  const membership = await findWorkspaceMembership(workspaceId, userId);

  if (!membership) {
    throw new ForbiddenError("You are not a member of this workspace");
  }

  if (ROLE_RANK[membership.role as Role] < ROLE_RANK[minimumRole]) {
    throw new ForbiddenError(`Requires ${minimumRole} role or higher`);
  }

  return membership;
}