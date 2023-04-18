
const express = require("express")
const app =express()
const port =5000

const mongoose = require("mongoose")
const url ="mongodb+srv://ankitkumarjune18:videosharingproject@cluster0.s1bbyn2.mongodb.net/test"

mongoose.connect(url).then(()=>{
    console.log("database is connected")
}).catch((e)=>{
    console.log(e)
})

app.listen(port ,()=>{
    console.log(`backend server running on ${port}`)
})