import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-security-ce24b.cloudfunctions.net/stripe'
    // baseURL: 'http://localhost:5001/security-ce24b/us-central1/stripe'
});

export default instance;