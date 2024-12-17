import bcryptjs from "bcryptjs"
import db from "../models"
import { where } from "sequelize"
//import User from "../models/user"
const salt = bcryptjs.genSaltSync(10)

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);

            //check null data
            if (!data.email) resolve({
                errCode: 1,
                messagse: "email can not be null "
            })
            if (!data.password) resolve({
                errCode: 1,
                messagse: "password can not be null "
            })

            //check exit user information
            let isExit = await getUserByEmail(data.email)
            console.log(isExit);

            if (await getUserByEmail(data.email)) {
                console.log(getUserByEmail(data.email));

                resolve({
                    errCode: 1,
                    messagse: "email has been exit"
                })
            }

            if (await findUserByPhonenumber(data.phonenumber)) resolve({
                errCode: 1,
                messagse: "phone has been exit"
            })

            //create new user
            let hashPassword = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender == '1' ? true : false,
                roleId: data.roleId,
            })
            let user = await db.User.findOne({
                where: { email: data.email }
            })
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })

}

// handle Login API
let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await getUserByEmail(email)
            let userData = {}
            if (user) {
                if( bcryptjs.compareSync(password,user.password)){
                    userData.errCode = 0 ,
                    delete user.password
                    userData.errMessage = 'OK',
                    userData.user = user
                }else{
                    userData.errCode = 2 ,
                    userData.errCode = "wrong password"
                }
                
            } else {
                userData.errCode = 1
                userData.errMessage = "your email does't exit"
                
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            console.log("run deleteUser in userService");
            let user = await getUserById(userId)

            if(!user) resolve({
                errCode : 2,
                errMessage: "user does not exist"
            })

            let isSuccesss =  await db.User.destroy({
                where:{userId : userId} 
            })

            if(isSuccesss) resolve({
                errCode:0,
                messagse: "delete success"
            })
            else
                resolve({
                    error:2,
                    errMessage:"delete fail"
                })
            
        } catch (e ) {
            reject(e)
        }
    })
}

let updateUser = (userData) =>{

}

// suport method 

let getUserById = (id)=>{
    return new Promise(async(resolve,reject) => {
        try {
            const date = Date.now()
            console.log("run in getUserById at userService " +date);
            
            let user = await db.User.findOne({
                where:{userId : id},
                raw:true
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
        
    })
}

let comparePassword = (password)=>{
    return new Promise( async(resolve,reject) =>{
        try {
            let hashPassword = await hashUserPassword(password)
           
        } catch (error) {
            reject(error)
        }
    })
}

let getUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
                attributes: {
                    include: ['email','roleId'],
                },  
                raw: true,
            })
            console.log(user);
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

let findUserByPhonenumber = (phonenumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phonenumber: phonenumber },
                raw: true,
            })
            resolve (user)
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("chay chuong trinh ben trong hash password");
            let hashPassword = await bcryptjs.hashSync(password, salt)
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    handleLogin: handleLogin,
    getUserById:getUserById,
    deleteUser : deleteUser,
    updateUser : updateUser,
}