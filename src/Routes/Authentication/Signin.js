
const express = require("express")
const router = express.Router()
const  bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/UserSchema")
const cookieParser = require("cookie-parser")
const JwtAuth =require("./JwtVerify")
router.use(cookieParser())





router.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body
    if(!email || !password){
        res.status(400).json({
            status:"failure",
            message:"All Fields are mandotory"
        })
    }
    
        const user = await User.findOne({email : email});
        if(user) {
            const isMatch = await bcrypt.compare(password,user.password)
           if(isMatch){
            const token = await user.generateAuthToken();
            // res.status(200).json({
            //     token:token,
            //     status:"sucess",
            //     message:"User Login Sucessfully"
            // })
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
               });
               res.status(200).send({token:token,userId:user._id})

               
            }else{
               res.status(400).send("invalid password")
            }
            
            }else{
                res.status(404).json({
                    status:"failure",
                    message:"user not found"
                })
            }
     
    }
       
catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
})


router.post("/logout",JwtAuth,async (req,res)=>{

    try{
        res.clearCookie("jwtoken");
        req.user.tokens=[];
        await req.user.save();
        res.status(200).send({msg:"logout succesfully",user:req.user.name});

        
        

    }catch(error){
        
        res.status(501).send({msg:"err in logout",error:error.message})
    }

})










module.exports = router