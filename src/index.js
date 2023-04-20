const express = require("express")
const app =express()
const port =8080;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./database/connect");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./Routes/Authentication/Register"));
app.use("/", require("./Routes/Authentication/Signin"));
app.use("/", require("./Routes/Videos/VideoSearch"));
app.use("/", require("./Routes/Videos/VideoUpload"));

app.listen(port ,()=>{
    console.log(`backend server running on ${port}`);
})
module.exports =app