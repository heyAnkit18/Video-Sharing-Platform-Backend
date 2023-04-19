const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Describtion: {
      type: String,
      required: true,
    },
    ImageURL: {
      type: String,
      required: true,
    },
    VideoURL: {
      type: String,
      required: true,
    },
    Views: {
      type: Number,
      default: 0,
    },
    Category: {
      type: String,
      required: true,
    },
    Visiblity: {
      type: String,
      required: true,
    },
    UserID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const video = new mongoose.model("video", VideoSchema);
module.exports = video;
