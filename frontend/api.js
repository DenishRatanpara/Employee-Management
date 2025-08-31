import axios from 'axios'

const api = axios.create({
    baseURL: "https://employee-management-n56p.onrender.com",
    withCredentials: true
})

export default api