const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is Required"],
        trim:true

    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique: true,
        lower:true,
        trim:true

    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        trim:true
    }


},{
    versionKey: false,
    timestamps: true
})

// pre middleware for hash password 
Schema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

// method to compare password

Schema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
} 


module.exports = mongoose.model("User",Schema)
