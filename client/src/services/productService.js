import axios from '../axios'

let getProductsByCategory = (categoryid) => {
    return axios.get(`/api/product?categoryid=${categoryid}`)
}

let getProductsBySubcategory = (subcategoryid) => {
    return axios.get(`/api/product?subcategoryid=${subcategoryid}`)
}

let getProductById = (productid) => {
    return axios.get(`/api/product?productid=${productid}`)
}

let getHotProduct = async () => {
    let response = await axios.get('/api/hot-product')
    return response
}

let getNewProduct = async () => {
    let response = await axios.get('/api/new-product')
    return response
}

let getAllReviews = (productid) => {
    return axios.get(`/api/product/review?productid=${productid}`)
}

let getProductByKeyword = (keyword) => {
    return axios.get(`/api/search-product?keyword=${keyword}`)
}

let getAllProducts = async () => {
    return axios.get('/api/admin/show-product')
    
}

export {
    getProductsByCategory, 
    getProductById, 
    getProductsBySubcategory,
    getHotProduct,
    getNewProduct,
    getAllReviews,
    getProductByKeyword,
    getAllProducts
}
