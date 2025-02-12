const { AuthService } = require("../services")
const CatchAsync = require("../utils/CatchAsync")

class AuthController{
    static UserRegisterController = CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.UserRegisterService(req.body)
        return res.status(201).send(res_obj)
    })
    static UserLoginController = CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.UserLoginService(req.body)
        return res.send(res_obj)
    })
    static UserProfileController = CatchAsync(async(req,res)=>{
        const res_obj = await AuthService.UserProfileService(req.user)
        return res.send(res_obj)
    })
}

module.exports = AuthController