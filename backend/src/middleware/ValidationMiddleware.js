const {validationResult} = require("express-validator");
const ApiError = require("../utils/ApiError");
const ValidationMiddleware = async(req,res,next)=>{
    try {
            const  errors = await validationResult(req);

                if(!errors.isEmpty()){
                    next(new ApiError(400,errors.array()[0].msg))
                    return
                }
                next()


    } catch (error) {
        next(error)
    }
}

module.exports = ValidationMiddleware;