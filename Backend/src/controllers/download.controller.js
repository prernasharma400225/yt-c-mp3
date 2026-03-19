import { convertToMP3 } from "../services/ytdlp.service.js";
import Download from "../models/download.model.js";
import fs from "fs";

export const downloadMP3 = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    const filePath = await convertToMP3(url);

    await Download.create({
      url,
      fileName: filePath,
    });

    res.download(filePath, "audio.mp3", () => {
      fs.unlinkSync(filePath);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Conversion failed" });
  }
};

export const getHistory = async (req, res) => {
  const data = await Download.find().sort({ createdAt: -1 });
  res.json(data);
};