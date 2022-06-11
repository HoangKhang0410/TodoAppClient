import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:3001/api/v1/task/',
});

export default axiosConfig;
