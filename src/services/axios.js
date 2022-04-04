import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5001/security-ce24b/us-central1/services'
    baseURL: 'https://us-central1-security-ce24b.cloudfunctions.net/services'
});

export default instance;