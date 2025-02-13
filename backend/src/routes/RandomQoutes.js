const express = require("express")
const QuotesJson = require("../api/quotes.json")
 
const router = express.Router()

router.get("/random",(req,res)=>{

    const total= QuotesJson.length
    const randomIndex = Math.floor(Math.random() * total)
    const randomQuote = QuotesJson[randomIndex]
    res.json({
        id:Date.now(),
        quote: randomQuote.quote,
        author: randomQuote.author
    })


})

module.exports = router