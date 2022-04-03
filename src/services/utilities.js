export const validatePassword = (password) => {
    const lowercase = /[a-z]/g
    const uppercase = /[A-Z]/g
    const numbers = /[0-9]/g
    return lowercase.test(password) && uppercase.test(password) && numbers.test(password);
};

export const createIPFSLink = (ipfsLink, fileName) => {
    const ipfsHttp = 'https://ipfs.io/ipfs/'
    return ipfsHttp + ipfsLink + '/' + fileName
};

export const verifyCaptcha = async (token) => {
    const url = 'https://www.google.com/recaptcha/api/siteverify';

    const verified = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: `secret=${process.env.REACT_APP_CAPTCHA_SECRET_KEY}&response=${token}`
    });

    console.log('successfully verified captcha:', verified.json().success)
    return verified.json().success;
};