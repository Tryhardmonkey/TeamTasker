import express from "express";
import healthRoutes from "./modules/health/health.routes";

const app = express();
app.use(express.json());
app.use("/health", healthRoutes);

export default app;