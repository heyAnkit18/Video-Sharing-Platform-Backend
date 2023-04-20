const jwt = require("jsonwebtoken")
const User = require("../../models/UserSchema")

const JwtAuth = async(req,res,next)=>{

    try{
        const token=req.body.newToken;
        console.log(token)

        const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
        if(!verifyUser){
            res.sendStatus(402);
        }
        const user=await User.findOne({_id:verifyUser._id});
        console.log(user)
        req.token=token;
        req.user=user;
        next();
    }catch(error){
       res.status(401).send(error)
    }
    
}
module.exports =JwtAuth