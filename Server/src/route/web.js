import express from "express"
import homeControllers from "../controllers/homeController";
import userControllers from "../controllers/userController";

let router = express.Router();

let initWebRouters = (app)=>{
    router.get('/',homeControllers.getHomepage)
    router.get('/about',homeControllers.getAboutPage)
    router.get('/crud',homeControllers.getCRUD)
    router.get('/get-crud',homeControllers.displayGetCRUD)
    router.post('/post-crud',homeControllers.postCRUD)
    router.get('/edit-crud',homeControllers.getEditCRUD)

    //get API
    router.get("/api/getUserById", userControllers.getUserById)

    //post API
    router.post('/api/createNewUser',userControllers.postCreateNewuser)
    router.post('/api/login',userControllers.handleLogin)


    return app.use("/",router)
}

module.exports = initWebRouters