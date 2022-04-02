export const validatePassword = (password) => {
    const lowercase = /[a-z]/g
    const uppercase = /[A-Z]/g
    const numbers = /[0-9]/g

    return lowercase.test(password) && uppercase.test(password) && numbers.test(password);
};

export const createIPFSLink = (ipfsLink, fileName) => {
  const ipfsHttp = "https://ipfs.io/ipfs/"
  return ipfsHttp + ipfsLink + "/" + fileName
}