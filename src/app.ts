import express from "express";
import healthRoutes from "./modules/health/health.routes";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler); // must be registered LAST, after all routes

export default app;