const mongoose = require('mongoose');
const bcrypt  = require('bcryptjs');

const userSchema = mongoose.Schema({
   fullName:{
    type:String,
    required:true,
    trim:true,
   },

   email:{
    type:String,
    required:true,
    trim:true,
    
    validate:{
        validator:(value)=>{
            const result =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return result.test(value);
        },
        message : "Please enter a valid email address",
    }
     
},

   state:{
    type:String,
    default: "",

   },
   city:{
    type:String,
    default: "",

   },
   locality:{
    type:String,
    default: "",
   },

   password:{
    type:String,
    required:true,
    validate:{
        validator:(value)=>{
            //check if password is at least 8 characters long
            return value.length >=8;
        },
        message :"Password must be at least 8 characters long",
    }
    

   },
});
//pre-save hook to hash the password before saving to the database

userSchema.pre("save", async function(next){
    const user = this;
    //only has the password if it has been modified
 
    if(user.isModified("password")){
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password,salt);
    }
 })
const User =mongoose.model("User", userSchema);

module.exports = User;