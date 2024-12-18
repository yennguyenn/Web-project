import productservice from "../services/productservice"

let handleProductRequest = async (req,res)=>{
    console.log("run in product controller in product contrller");
    let message = null ;
    if(req.query.categoryid){
        message =await productservice.findProductsByProductType(req.query.categoryid)
        res.status(200).json(message)
    }else
        if(req.query.productid){
            message =await productservice.findProductById(req.query.productid)
            res.status(200).json(message)
        }else
            res.status(500).json({
                errCode: 1,
                errMessage: "missing parameter"
            })    
}

let handleGetProductById =async (req, res) => {
    console.log("run handleGetProductById in product controller");
    let message = await productservice.findProductById(req.query.id)
    res.status(200).json(message)
}

module.exports={
    handleGetProductById:handleGetProductById,
    handleProductRequest : handleProductRequest,
}