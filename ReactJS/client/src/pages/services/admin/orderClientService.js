import axios from '../../axios'

let getOrdersCreated = () => {
    return axios.get('/api/admin/show-order')
}

export {
    getOrdersCreated
} 