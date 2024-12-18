import jwt from 'jsonwebtoken'


require("dotenv").config()

const createJWT =(payload)=>{
    let key = process.env.JWT_SECRET
    let token
    try {
        token = jwt.sign(payload,key)    

        console.log(token);
        
    } catch (error) {
        console.log(error);
    }
    
    return token   
}

const verifyToken = (token) =>{
    let key = process.env.JWT_SECRET
    let data = null

    try {
        let decoded = jwt.verify(token, key)
        data = decoded;
    } catch (error) {
        console.log(error);
        
    }
    console.log(data);
    return data
}

module.exports = {
    createJWT : createJWT,
    verifyToken : verifyToken
}