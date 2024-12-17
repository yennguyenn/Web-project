import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRouters from "./route/web"
import connectDB from "./config/connectDB"
const cors = require('cors')
require("dotenv").config()
let app = express()

//config app 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
viewEngine(app)
initWebRouters(app)

connectDB()

let port = process.env.PORT || 6969

app.listen(port, ()=>{
    console.log("chay tren "+ port)
})
