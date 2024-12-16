import axios from '../axios'

let handleUserAddToCart = (token, productid) => {
    return axios.put('/api/protected/add-to-cart', { productid } , {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleUserShowCart = (token) => {
    return axios.get('/api/protected/show-cart', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleShowProductDetail = (productid) => {
    return axios.get(`/api/product?productid=${ productid }`)
}

let handleUserRemoveFromCart = (token, productid) => {
    return axios.delete('/api/protected/delete-from-cart', {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: {
            productid: productid
        }
    })
}

let handleUserIncreaseItem = (token, productid) => {
    return axios.put('/api/protected/increase-quantity', { productid } , {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleUserDecreaseItem = (token, productid) => {
    return axios.put('/api/protected/decrease-quantity', { productid } , {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleUserAddLargeItem = (token, productid, quantity) => {
    return axios.put('/api/protected/add-large-quantity', { productid, quantity } , {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleUserUpdateItem = (token, productid, quantity) => {
    return axios.put('/api/protected/update-quantity', { productid, quantity } , {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleUserRemoveAllProduct = (token) => {
    return axios.delete('/api/protected/remove-all-product', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

let handleGetTotalQuantity = (token) => {
    return axios.get('/api/protected/get-total-quantity', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export {
    handleUserAddToCart,
    handleUserShowCart,
    handleShowProductDetail,
    handleUserRemoveFromCart,
    handleUserIncreaseItem,
    handleUserDecreaseItem,
    handleUserAddLargeItem,
    handleUserUpdateItem,
    handleUserRemoveAllProduct,
    handleGetTotalQuantity
}