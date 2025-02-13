const express = require("express")
const ApiError = require("./utils/ApiError")
const { HandlingErrorMiddleware } = require("./middleware")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(cors())

// create static path for upload folder
app.use("/api/v1/static/",express.static(path.join(__dirname,"uploads/")))


app.use("/api/v1",require("./routes"))
// app.get("/",(req,res)=>{
//     return res.send("Hello world")
// })
app.use("*",(req,res)=>{
   throw new ApiError(404,"Not Found")
})

app.use(HandlingErrorMiddleware)

module.exports = app