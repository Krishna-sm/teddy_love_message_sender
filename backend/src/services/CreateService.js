const ApiError = require("../utils/ApiError")
const {MessageModel} = require("../models")
const path = require("path")
const QuotesJson = require("../api/quotes.json")
const fs = require("fs")
class CreateService{
    static async  AddMessageService(body,user,files){

        if(files.length<=0){
            throw new ApiError(400,"Please upload files")
        }

        const images = files.map((cur)=>cur.filename)

        await MessageModel.create({
            user,
            title:body.title,
            content: body.message,
            images

        })
        return {
            "message":"Message Create Successfully !"
        }
           
    }

    static async getAllMessagesService(user){
        const message =  await MessageModel.find({user})
            .select("title content images")
        ;
        return message
    }

    static async deleteMessageByIdService(user,id){
        const message =  await MessageModel.findOneAndDelete({user,_id:id})
        if(!message){
            throw new ApiError(404,"Message Not Found")
        }
        // delete all image from upload foldder in src directory

            message.images.forEach((cur,i)=>{
                    if(fs.existsSync(path.join(__dirname,"../uploads/",cur))){
                        console.log("if exists");
                        
                        fs.unlinkSync(path.join(__dirname,"../uploads/",cur))
                    }
            })

        ;
        return {
            "message":"Delete Successfully"
        }
    }


    static async getMessageByIdService(id){
        
    const total= QuotesJson.length
    const randomIndex = Math.floor(Math.random() * total)
    const randomQuote = QuotesJson[randomIndex]
 
        const message =  await MessageModel.findById(id)
        if(!message){
            throw new ApiError(404,"Message Not Found")
        }
        ;
        return {
            "message":message,
            "quote":randomQuote
        }
    }
    

}

module.exports = CreateService