<<<<<<< HEAD



=======
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


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

    if(this.isModified("password")){

        this.password=await bcrypt.hash(this.password,12);
        // this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();

});


const User = mongoose.model("users",userSchema)
module .exports= User

>>>>>>> fbd556a14e328829d3de69c2d9715fc44ccb159a

