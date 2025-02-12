 
const JWTAuthService = require("./jwt")
const { UserModel } = require("../models")
const ApiError = require("../utils/ApiError")


class AuthService{

    static async UserRegisterService(body){

        const checkExist = await UserModel.findOne({email:body.email.toLowerCase()})
        
        if(checkExist){
            throw new ApiError(400,"User Already Exist With this email Account")
        }


        await UserModel.create(body)


        return {
            "msg":"Register Successfully",

        }
    }

    static async UserLoginService(body){

        const checkExist = await UserModel.findOne({email:body.email.toLowerCase()})
        
        if(!checkExist){
            throw new ApiError(400,"User Not Found")
        }
         
        const isMatch = await checkExist.comparePassword(body.password)
        
        if(!isMatch){
            throw new ApiError(401,"Password Is Not Correct")
        }
            // token

                const token= await JWTAuthService.generateToken(checkExist._id)


        return {
            "msg":"Login Successfully", 
            token

        }
    }


    static async UserProfileService(id){
        const user = await UserModel.findById(id)
        .select("name email")
        
        if(!user){
            throw new ApiError(404,"User Not Found")
        }
        return user
    }
  

}

module.exports = AuthService