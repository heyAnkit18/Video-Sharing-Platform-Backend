const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const connect =()=>{
    mongoose.connect(process.env.DATABASE)
    .then(()=>{
        console.log("database is connected")
    })
    .catch((e)=>{
        console.log(e)
    })
}

connect()

module.exports = connect;