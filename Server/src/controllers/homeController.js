import { Json } from 'sequelize/lib/utils'
import db from '../models/index'
import { createNewUser } from '../services/CRUDservice'
import userService from '../services/userService'
const CRUDservice = require("../services/CRUDservice")

let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', { data: JSON.stringify(data) })
    } catch (error) {
        console.log(error)
    }
    return res.render('homepage.ejs')

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser()
    console.log("-------------------------")
    //console.log(data);    
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message)
    return res.send("Post crud from server")
}

let getEditCRUD =async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let userData = await CRUDservice.getUserInforByid(userId)
        return res.send(userData)
    }
    else
        return res.send("user not found")
}
let postCreateNewuser = async(req,res)=>{
    console.log("post createNewUser in homecontroller");
    let message = await userService.createNewUser(req.body)
    return res.send(message)
}
module.exports = {
    getHomepage: getHomepage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    postCreateNewuser:postCreateNewuser,
}