const express= require("express")
const router = express.Router()

// Sample route

const routes = [
    {
        path:"/auth",
        routes:require("./AuthRoute")
    }
]

routes.forEach(route => {
    router.use(route.path, route.routes)
})

module.exports = router