import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRouters from "./route/web"
import connectDB from "./config/connectDB"
import jwtAction from "./middleware/JWTaction"
import cookieParser from "cookie-parser"
import db from "./models"

const cors = require('cors')
require("dotenv").config()
let app = express()

//config app
app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin',process.env.REACT_URL)
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
}) 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
// app.use(cors(corsOptions))

//config cookie parser 
app.use(cookieParser())

viewEngine(app)
initWebRouters(app)

connectDB()

db.sequelize.sync({alter:true})
.then(()=>{
    console.log("sync database success");
    
}).catch((error)=>{
    console.error(error)
})

let port = process.env.PORT || 6969

app.listen(port, ()=>{
    console.log("chay tren "+ port)
})
