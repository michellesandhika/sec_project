export const validatePassword = (password) => {
    const lowercase = /[a-z]/g
    const uppercase = /[A-Z]/g
    const numbers = /[0-9]/g

    return lowercase.test(password) && uppercase.test(password) && numbers.test(password);
};