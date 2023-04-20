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

router.get("/myvidoes", async(req, res) => {
  const UserID = req.user._id;
  const myvidoes = await VideoSchema.find({UserID: UserID})
  res.status(200).json(myvidoes);
})

router.get("/home", async (req, res) => {
  try{
    const homeVideos = await VideoSchema.aggregate([{$sample: {size:36}}]);
    res.status(200).json(homeVideos);
  } 
  catch(error){
    res.status(404).json({status: "Failed", message: error.message});
  }
})

module.exports = router;
