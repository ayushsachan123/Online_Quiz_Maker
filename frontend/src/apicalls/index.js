import axios from 'axios'

const axiosInstance = axios.create({
     baseURL: 'https://online-quiz-maker.onrender.com',
    headers: {
       'authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance