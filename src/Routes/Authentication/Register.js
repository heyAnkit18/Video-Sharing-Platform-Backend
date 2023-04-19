const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser");
const User = require("../../models/UserSchema")
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post('/Registor',async(req,res)=>{
    const{name,email,phone,profession,password,confirmpassword}=req.body

    if(name && email && phone && profession && password && confirmpassword){
        if(password === confirmpassword){
            const data = await User.findOne({name:name,email:email,phone:phone,profession:profession,password:password,confirmpassword:confirmpassword});
            if(data!==null){
                res.status(400).json({
                    status:"failure",
                    message:"phone number all ready existed"               
                 })
            }
            else{
                   await User.create({name,email,phone,profession,password,confirmpassword})
                res.status(200).json({
                    status:"sucess", 
                    message:"The Registation Sucessful"

                })
            }

        }
        else{
            res.status(400).json({
                status:"failure",
                message:"password does not matched"
            })
        }
    }
    else{
        res.status(5000).json({
            status:"failure",
            message:"All Fields Are Mandotory"
        })
    }

})

module.exports = router