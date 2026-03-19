import express from "express";
import {
  downloadMP3,
  getHistory,
} from "../controllers/download.controller.js";

const router = express.Router();

router.post("/", downloadMP3);
router.get("/history", getHistory);

export default router;