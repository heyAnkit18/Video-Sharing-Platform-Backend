const express = require("express");
const router = express.Router();
const Video = require("../../models/VideoSchema");

router.get("/search", async (req, res) => {
    const searchText = req.query.q;
    try{
        const videoList = await Video.find({Title: {$regex: searchText}}).limit(40)
        res.status(200).json(videoList);
    } 
    catch(error){
        res.status().json({status: "Failed", message: error.message})
    }
})

module.exports = router;