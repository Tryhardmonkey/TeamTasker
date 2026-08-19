import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { createWorkspaceHandler, listWorkspacesHandler, addMemberHandler } from "./workspace.controller";

const router = Router();

router.post("/", authenticate, createWorkspaceHandler);
router.get("/", authenticate, listWorkspacesHandler);
router.post("/:workspaceId/members", authenticate, addMemberHandler);

export default router;