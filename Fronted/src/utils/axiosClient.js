

import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://coding-practice-platfrom-backend-qx4h.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

