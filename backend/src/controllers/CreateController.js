const { CreateService } = require("../services")
const CatchAsync = require("../utils/CatchAsync")


class CreateController{
    static  AddMessageController = CatchAsync(async(req,res)=>{


        const res_obj = await CreateService.AddMessageService(req.body,req.user,req.files)
        return res.status(201).send(res_obj)
    })
    static  getAllMessagesController = CatchAsync(async(req,res)=>{


        const res_obj = await CreateService.getAllMessagesService(req.user)
        return res.status(200).send(res_obj)
    })

    static  deleteMessageById = CatchAsync(async(req,res)=>{


        const res_obj = await CreateService.deleteMessageByIdService(req.user,req.params.id)
        return res.status(200).send(res_obj)
    })

    
    static  getMessageByIdController = CatchAsync(async(req,res)=>{


        const res_obj = await CreateService.getMessageByIdService(req.params.id)
        return res.status(200).send(res_obj)
    })
    
    

    


}

module.exports = CreateController