import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticate";
import { CreateWorkspaceSchema } from "./workspace.types";
import { createWorkspace, listMyWorkspaces } from "./workspace.service";

export async function createWorkspaceHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const input = CreateWorkspaceSchema.parse(req.body);
    const workspace = await createWorkspace(input, req.user!.id);
    res.status(201).json(workspace);
  } catch (err) {
    next(err);
  }
}

export async function listWorkspacesHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const workspaces = await listMyWorkspaces(req.user!.id);
    res.status(200).json(workspaces);
  } catch (err) {
    next(err);
  }
}