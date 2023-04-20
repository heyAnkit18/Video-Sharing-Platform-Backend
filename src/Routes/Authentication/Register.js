const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const bodyparser = require("body-parser");
const User = require("../../models/UserSchema")
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post('/Register',async(req,res)=>{
    const{name,email,phone,profession,password}=req.body


    if(name && email && phone && profession && password){
            const data = await User.findOne({email:email});
            if(data){
                res.status(400).json({
                    status:"failure",
                    message:"email  all ready existed"               
                 })
            }
            else{
                   await User.create({name,email,phone,profession,password})
                res.status(200).json({
                    status:"sucess", 
                    message:"The Registation Sucessful"

                })
            }

        }
       
    else{
        res.status(500).json({
            status:"failure",
            message:"All Fields Are Mandotory"
        })
    }

})

module.exports = router