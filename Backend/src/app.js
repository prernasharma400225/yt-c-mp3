import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import downloadRouter from "./routes/download.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/download", downloadRouter);

export default app;