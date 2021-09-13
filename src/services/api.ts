import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ar36vz06dj.execute-api.us-east-1.amazonaws.com/develop'
});

export default api;