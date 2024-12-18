import { where, Op } from "sequelize";
import db from "../models";

let findProductById = async (productId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!productId) resolve({
                errCode: 1,
                errMessage: "null product Id "
            });
            console.log(productId);

            let product = await getProductById(productId);

            if (!product) resolve({
                errCode: 2,
                errMessage: "Product does not exist"
            });

            resolve({
                errCode: 0,
                product: product

            });
        } catch (error) {
            reject(error);
        }
    });
};

let findProductsByProductType = async (productTypeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productTypeId) resolve({
                errCode:  1,
                errMessage:"missing productTypeId"
            });

            let products = await db.Product.findAll({
                where: {categoryId : productTypeId}
            });

            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
};

// New function: Find products by keyword
let findProductsByKeyword = async (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!keyword) resolve({
                errCode: 1,
                errMessage: "Keyword is required"
            });

            let products = await db.Product.findAll({
                where: {
                    [Op.or]: [
                        { productName: { [Op.like]: `%${keyword}%` } },
                        { description: { [Op.like]: `%${keyword}%` } }
                    ]
                }
            });

            resolve({
                errCode: 0,
                products: products
            });
        } catch (error) {
            reject(error);
        }
    });
};


// show product 
let showProduct = async () =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let products = db.Product.findAll()

            resolve (products)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    findProductById: findProductById,
    findProductsByProductType: findProductsByProductType,
    findProductsByKeyword: findProductsByKeyword,
    showProduct :showProduct,
};

// Support method
let getProductById = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId) return null;

            let product = await db.Product.findOne({
                where: { productId: productId }
            });
            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
};
