import axios from '../../axios'

let getUsersCreated = () => {
    return axios.get('/api/admin/show-client')
}

export {
    getUsersCreated
}