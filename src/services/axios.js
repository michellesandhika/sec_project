import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-security-ce24b.cloudfunctions.net'
    // baseURL: 'http://localhost:5001/security-ce24b/us-central1'
});

export default instance;