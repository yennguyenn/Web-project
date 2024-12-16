import axios from '../axios'

let handleCreateReview = (token, productid, rating, comment) => {
    return axios.post('/api/protected/create-review', { productid, rating, comment }, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
}

export {
    handleCreateReview
}