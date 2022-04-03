import axios from './axios';

export const verifyCaptcha = async (value) => {
    const response = await axios({ 
        method: 'POST', 
        url: `/verify?token=${value}`,
    });

    return response.data;
};

export const createIPFSLink = (ipfsLink, fileName) => {
    const ipfsHttp = 'https://ipfs.io/ipfs/'
    return ipfsHttp + ipfsLink + '/' + fileName
};