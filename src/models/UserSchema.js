const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    profession:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})
    

// userSchema.pre('save', async function() {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     this.conformpassword = await bcrypt.hash(this.conformpassword, salt);

//     console.log(this.password)

//   });
userSchema.pre("save",async function(next){
    const salt = 12

    if(this.isModified("password")){

        this.password=await bcrypt.hash(this.password,salt);
        // this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();

});
userSchema.methods.generateAuthToken=async function(){
    try{
     let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
     this.tokens=this.tokens.concat({token:token});
     await this.save()
     return token;
    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model("users",userSchema)
module .exports= User


