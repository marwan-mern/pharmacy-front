import axios from 'axios';

export default axios.create({
    // baseURL:"https://pharmacytestapp.herokuapp.com"
    baseURL:"https://marwan-pharmacy-app.onrender.com"
})

// PORT = 27017
// CONNECTION_URL = mongodb://127.0.0.1:27017/Pharmacy

// export default axios.create({
//     baseURL:"http://localhost:27017"
// })