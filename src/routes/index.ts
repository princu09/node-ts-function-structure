import express from "express";
import authRoutes from "./authRoutes";
const app = express();

app.use("/auth", authRoutes);

export default app;
