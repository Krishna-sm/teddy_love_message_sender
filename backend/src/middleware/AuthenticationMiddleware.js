const { JWTAuthService } = require("../services")

exports.AuthencationMiddleware =async(req,res,next)=>{

            try {
                const headers = req.headers['authorization'] || ''

                if (!headers || !headers.startsWith("Bearer")) {
                    throw new Error('please Login First')
                }

                const token = headers.split(' ')[1]
          
                const decode = JWTAuthService.verifyToken(token)
                req.user = decode.id
                next()
               
            } catch (error) {
                next(error)
            }
}