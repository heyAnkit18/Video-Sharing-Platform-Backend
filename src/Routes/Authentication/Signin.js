
const express = require("express")
const router = express.Router()
const  bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/UserSchema")
const cookieParser = require("cookie-parser")
router.use(cookieParser())
const JwtAuth =require("./JwtVerify")




router.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body
    if(!email || !password){
        res.status(400).json({
            status:"failure",
            message:"All Fields are mandotory"
        })
    }
    
        let user = await User.findOne({email : email});
        if(user) {
            const isMatch = await bcrypt.compare(password,user.password)
           if(isMatch){
            const token = jwt.sign({userId : user["_id"]},process.env.SECRET_KEY)
            res.status(200).json({
                token:token,
                status:"sucess",
                message:"User Login Sucessfully"
            })
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
               });
               res.status(200).send({data:token,userId:user._id})

               
            }else{
               res.status(400).send("invalid password")
            }
            
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
        res.status(200).send({msg:"logout succesfully",user:req.user});

        
        

    }catch(error){
        
        res.status(501).send({msg:"err in logout",error:error.message})
    }

})










module.exports = router