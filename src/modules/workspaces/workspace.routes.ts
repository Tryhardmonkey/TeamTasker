import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { createWorkspaceHandler, listWorkspacesHandler } from "./workspace.controller";

const router = Router();

router.post("/", authenticate, createWorkspaceHandler);
router.get("/", authenticate, listWorkspacesHandler);

export default router;