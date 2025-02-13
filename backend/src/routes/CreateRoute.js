const express = require("express")
const router = express.Router()
const { AuthencationMiddleware } = require("../middleware/AuthenticationMiddleware");
const { UploadByMulter } = require("../config/multer.config");
const { CreateController } = require("../controllers");


router.route("/get-message/:id")
.get(CreateController.getMessageByIdController)

// authenication middleware
router.use(AuthencationMiddleware)


// for add message with image
router.route("/message")
// /api/v1/create/message [post]201
.post(UploadByMulter.array("images",30),CreateController.AddMessageController)
// /api/v1/create/message [get]200
.get(CreateController.getAllMessagesController)
router.route("/message/:id")
// /api/v1/create/message [get]200
.delete(CreateController.deleteMessageById)

module.exports = router