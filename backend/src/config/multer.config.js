const multer = require("multer")
const path  = require("path")

const uplodPath = path.join(__dirname,"../uploads/")
exports.UploadByMulter = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uplodPath);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
    limits: { fileSize: 5000000 }, // 5MB
    fileFilter: function (req, file, cb) {
        // only images can be accepted

        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
})