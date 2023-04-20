const express = require("express");
<<<<<<< HEAD
require("../database/connect.js");
const JwtAuth = require("../Authentication/JwtVerify.js");
const VideoSchema = require("../models/VideoSchema.js");

const router = express.Router();

router.post("/VideoUpload", JwtAuth, async (req, res) => {
=======
require("../../database/connect.js");
const JwtAuth = require("../Authentication/JwtVerify.js");
const VideoSchema = require("../../models/VideoSchema.js");


const router = express.Router();

router.post("/VideoUpload",auth ,async (req, res) => {
>>>>>>> 06a85a962a0d1a46fb30c5734f43fe7ff8842b81
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

router.get("/myvidoes", JwtAuth, async(req, res) => {
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
