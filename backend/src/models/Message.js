const mongoose = require("mongoose")
const schema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   title:{
    type:String,
    required:true,
    trim:true
   },
   content:{
    type:String,
    required:true,
    trim:true
   },
   images:{
    type:Array,
    default:[]
   }
},{
    timestamps:true,
    versionKey:false
})

const MessageModel = mongoose.model("message",schema)

module.exports = MessageModel