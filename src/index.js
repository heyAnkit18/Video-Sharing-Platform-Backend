
const express = require("express")
const app =express()
const port =5000

const mongoose = require("mongoose")



app.listen(port ,()=>{
    console.log(`backend server running on ${port}`)
})