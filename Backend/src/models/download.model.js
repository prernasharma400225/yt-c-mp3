import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
  url: String,
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Download", downloadSchema);