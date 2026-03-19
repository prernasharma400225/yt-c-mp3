import ytDlp from "yt-dlp-exec";

export const convertToMP3 = async (url) => {
  try{
    const filename = `audio-${Date.now()}.mp3`;
    await ytDlp(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: filename,
      noCheckCertificates: true,
      preferFreeFormats: true,
    });
    return filename;
  }
  catch (error) {
    console.error("❌ yt-dlp error:", error);
    throw error;

  }
}