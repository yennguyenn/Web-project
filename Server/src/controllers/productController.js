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
        }else{
            message = await productservice.showProduct()
            res.status(200).json(message)
        }    
}

let handleGetProductById =async (req, res) => {
    console.log("run handleGetProductById in product controller");
    let message = await productservice.findProductById(req.query.id)
    res.status(200).json(message)
}

let handleShowProduct = async(req,res) =>{
    console.log("run handleShowRProduct in productController");
    let message = await productservice.showProduct()
    res.status(200).json(message)
}

let handlegetProductByKeyWord = async(req,res) =>{
    console.log("run handlegetProductByKeyWord in productController");
    let message = await productservice.findProductsByKeyword(req.query.keyword)
    res.status(200).json(message)
}

let handleHotProduct = async (req,res)=>{
    console.log("run handleHotProduct in productController");
    let message  = await productservice.getProductById(1)
    res.status(200).json(message)
}

let handleGetNewProduct = async(req,res)=>{
    console.log("run handleGetNewProduct in productController");
    let message = await productservice.getProductById(1);
    res.status(200).json(message)
    
}

module.exports={
    handleGetProductById:handleGetProductById,
    handleProductRequest : handleProductRequest,
    handlegetProductByKeyWord : handlegetProductByKeyWord,
    handleShowProduct : handleShowProduct,
    handleHotProduct: handleHotProduct,
    handleGetNewProduct:handleGetNewProduct,
}