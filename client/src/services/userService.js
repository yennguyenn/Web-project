import axios from '../axios' 

let handleLoginApi = (username, password) => {
    return axios.post('/api/login', 
    { username, password },  {
        headers: { 
            'Content-Type': 'application/json'
        },
    }) 
} 

let handleRegisterApi = (userData) => {
    return axios.post('/api/register', userData) 
} 

let handleShowProfile = (token) => {
    return axios.get('/api/protected/show-profile', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }) 
} 

let handleUpdateProfile = (token, data) => {
    return axios.put('/api/protected/update-profile', data, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }) 
} 

let handleGetVerifyCode = (username, email) => {
    return axios.post('/api/reset-password/request', { username, email }) 
} 

let handleCheckVerifyCode = (username, code)  => {
    return axios.post('/api/reset-password/enter-code', { username, code })
}

let handleResetPassword = (username, code, password) => {
    return axios.put('/api/reset-password', { username, code, password }) 
}

let handleChangePassword = (token, oldpassword, newpassword) => {
    return axios.put('/api/protected/change-password', { oldpassword, newpassword },{
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
}

let handleDeleteUserAccount = (token) => {
    return axios.delete('/api/protected/delete-account', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
}

export {
    handleLoginApi,
    handleRegisterApi,
    handleShowProfile,
    handleUpdateProfile,
    handleGetVerifyCode,
    handleCheckVerifyCode,
    handleResetPassword,
    handleChangePassword,
    handleDeleteUserAccount
} 

