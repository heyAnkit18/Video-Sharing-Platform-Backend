const express = require("express");
require("../../database/connect.js");

const VideoSchema = require("../../models/VideoSchema.js");
const auth=require("../middleware/auth.js");

const router = express.Router();

router.post("/VideoUpload",auth ,async (req, res) => {
  const UserID = req.user._id;

  const { Title, Describtion, ImageURL, VideoURL, Category, Visiblity } =
    req.body;
  const data = new VideoSchema({
    UserID: UserID,
    Title: Title,
    Describtion: Describtion,
    ImageURL: ImageURL,
    VideoURL: VideoURL,
    Category: Category,
    Visiblity: Visiblity,
  });
  try {
    const NewVideo = await data.save();
    res.status(200).send("Congratulations! Video uploaded");
  } catch (e) {
    res.status(404).send("error");
  }
});
