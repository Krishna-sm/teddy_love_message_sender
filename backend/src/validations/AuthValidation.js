const {body} = require("express-validator")
class AuthValidation{
            static UserSchema = [
                body("name").notEmpty().withMessage("Name is Required"),
                body("email").isEmail().withMessage("Invalid Email").notEmpty().withMessage("EMail is Rquired"),
                body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long")
            ]
            static LoginSchema = [
                body("email").isEmail().withMessage("Invalid Email").notEmpty().withMessage("EMail is Rquired"),
                body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long")
            ]
}

module.exports = AuthValidation