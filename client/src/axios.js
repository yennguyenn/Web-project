import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
});

// Set up interceptor for axios
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error('Error in response:', error);
        return Promise.reject(error);
    }
);



export default instance;