import { where } from "sequelize"
import db from "../models"

let findProductById = async (productId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!productId) resolve({
                errCode: 1,
                errMessage: "null product Id "
            })
            console.log(productId);

            let product = await getProductById(productId)

            if (!product) resolve({
                errCode: 2,
                errMessage: "Product does not exist"
            })

            resolve({
                errCode: 0,
                product: product

            })
        } catch (error) {
            reject(error)
        }
    })
}

let findProductsByProductType = async (productTypeId)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            if(!productTypeId) resolve({
                errCode:  1,
                errMessage:"missint productTypeId"
            })

            let products = await db.Product.findAll({
                where:{productTypeId : productTypeId}
            })

            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    findProductById: findProductById,
    findProductsByProductType: findProductsByProductType
}

// suport method

let getProductById = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId) return null;

            let product = await db.Product.findOne({
                where: { productId: 1 }
            })
            resolve(product)
        } catch (error) {
            reject(error)
        }
    })
}

