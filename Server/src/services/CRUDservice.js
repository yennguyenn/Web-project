import bcypt from 'bcryptjs'
import db from '../models/index'
const salt = bcypt.genSaltSync(10)

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            
            let hashPasswordFromCrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromCrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                gender: data.gender == '1' ? true : false,
                phonenubmer: data.phonenumber,
                roleId: data.roleId,
            })
            resolve("create a new user success")
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser= ()=>{
    return new Promise((resolve,reject)=>{
        try {
            let user= db.User.findAll();
            resolve(user)
        } catch (error) {
            
        }
    })
}

let getUserInforByid = (userId) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where:{id:userId},
                raw : true
            })
            if(user){
                resolve(user)
            }else
                resolve([])
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("chay chuong trinh ben trong hash password");

            let hashPassword = await bcypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser : getAllUser, 
    getUserInforByid:getUserInforByid,
}