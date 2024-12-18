import express from "express"
import homeControllers from "../controllers/homeController";
import userControllers from "../controllers/userController";
import prodcutControllers from"../controllers/productController";

let router = express.Router();

let initWebRouters = (app)=>{
    router.get('/',homeControllers.getHomepage)
    router.get('/about',homeControllers.getAboutPage)
    router.get('/crud',homeControllers.getCRUD)
    router.get('/get-crud',homeControllers.displayGetCRUD)
    router.post('/post-crud',homeControllers.postCRUD)
    router.get('/edit-crud',homeControllers.getEditCRUD)

    //User API 
    router.get("/api/getUserById", userControllers.getUserById)
    router.post('/api/register',userControllers.postCreateNewuser)
    router.post('/api/login',userControllers.handleLogin)
    router.delete('/api/deleteUser',userControllers.handleDeleteUser)
    router.put('/api/updateUser',userControllers.handleUpdateUser)

    //Product API
    router.get('/api/product',prodcutControllers.handleProductRequest)
    //router.get('/api/product')
    return app.use("/",router)
}

module.exports = initWebRouters