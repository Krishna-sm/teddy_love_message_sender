const ApiError = require("../utils/ApiError")

const HandlingErrorMiddleware = (err,req,res,next)=>{

    const error_obj = {
         message :err.message,

        "status":500,
        stack:err.stack
    }

    if(err instanceof ApiError){
        error_obj.message = err.message
        error_obj.status = err.status
    } 
    
    res.status(error_obj.status).json(error_obj)
}

module.exports = HandlingErrorMiddleware