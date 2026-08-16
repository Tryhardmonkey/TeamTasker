import { prisma } from "../../config/database";

export function createWorkspaceWithOwner(name: string, ownerId: string) {
  return prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: { name, ownerId },
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: ownerId,
        role: "OWNER",
      },
    });

    return workspace;
  });
}

export function findWorkspacesForUser(userId: string) {
  return prisma.workspace.findMany({
    where: {
      members: { some: { userId } },
    },
  });
}

export function findWorkspaceMembership(workspaceId: string, userId: string) {
  return prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: { workspaceId, userId },
    },
  });
}