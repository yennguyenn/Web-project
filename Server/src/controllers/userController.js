import db from '../models/index'

import userService from '../services/userService'

let postCreateNewuser = async(req,res)=>{
    console.log("post createNewUser in userController");
    let message = await userService.createNewUser(req.body)
    console.log(message);
    
    return res.send(message)
}

let handleLogin = async(req,res)=>{
    console.log("run con handleLogin in userContrller");
    let {email,username,password} = req.body
    if(!email && username ) email = username

    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message: "Missing inputs parameter"
        })
    }

    let userData = await userService.handleLogin(email,password)
    console.log(userData);
    //res.cookies("jwt",userData.token,{httpOnly:true, maxAge: 60*60*1000})
    return res.status(200).json(userData)
}

let handleDeleteUser = async (req,res) =>{
    console.log("run handleDeleteUser in userController");
    let message = await userService.deleteUser(req.body.userId)
    return res.send(message)
}

let handleUpdateUser = async (req,res) =>{
    console.log("run handleUpdate in userController");
    let message = await userService.updateUser(req.body)
    return res.send(message)
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
    handleDeleteUser : handleDeleteUser,
    handleUpdateUser : handleUpdateUser,
}