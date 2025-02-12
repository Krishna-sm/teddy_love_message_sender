const express= require("express");
const { AuthValidation } = require("../validations");
const { ValidationMiddleware } = require("../middleware");
const { AuthController } = require("../controllers");
const { AuthencationMiddleware } = require("../middleware/AuthenticationMiddleware");
const router = express.Router()
 
//  /api/v1/auth/register POST[201]
router.post('/register',AuthValidation.UserSchema, ValidationMiddleware, AuthController.UserRegisterController );

//  /api/v1/auth/login POST[200]
router.post('/login',AuthValidation.LoginSchema, ValidationMiddleware, AuthController.UserLoginController );

//  /api/v1/auth/profile GET[200]
router.get('/profile',AuthencationMiddleware,AuthController.UserProfileController );

module.exports = router;