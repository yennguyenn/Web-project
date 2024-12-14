import db from '../models/index'

import userService from '../services/userService'

let postCreateNewuser = async(req,res)=>{
    console.log("post createNewUser in userController");
    let message = await userService.createNewUser(req.body)
    return res.send(message)
}

let handleLogin = async(req,res)=>{
    console.log("run con handleLogin in userContrller");
    let email = req.body.email
    let password = req.body.password

    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message: "Missing inputs parameter"
        })
    }

    let userData = await userService.handleLogin(email,password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.erressage,
        userData: userData
    })
}

let getUserById = async(req,res)=>{
    console.log(req.query.id);
    
    let userData = await userService.getUserById(req.query.id)
    return res.status(200).json(userData)   
}

module.exports = {
    postCreateNewuser:postCreateNewuser,
    handleLogin:handleLogin,
    getUserById : getUserById,
}