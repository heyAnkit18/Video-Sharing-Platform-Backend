
const express = require("express")
const app =express()
const port =5000
const UserRegister = require("./Routes/Authentication/Register")


app.use("/",UserRegister)


app.listen(port ,()=>{
    console.log(`backend server running on ${port}`)
})