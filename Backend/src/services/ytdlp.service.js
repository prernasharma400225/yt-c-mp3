import ytDlp from "yt-dlp-exec";
import path from "path";

export const convertToMP3 = async (url) => {
  try {
    const fileName = `audio-${Date.now()}.mp3`;

    await ytDlp(url, {
      format: "bestaudio",
      output: fileName,
      extractAudio: true,
      audioFormat: "mp3",
      ffmpegLocation: "C:\\Users\\presh\\Downloads\\ffmpeg-8.1-essentials_build\\ffmpeg-8.1-essentials_build\\bin",
    });

    return path.resolve(fileName);
  } catch (error) {
    console.error("❌ ERROR:", error);
    throw error;
  }
};