export const containsNumber = (str) => {
    return /\d/.test(str);
}

export const containsOnlyNumber = (str) => {
    return /^\d+$/.test(str);
}

export const isValidPhoneNumber = (str) => {
    const regex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8,9})$/;
    return regex.test(str);
}

export const isValidEmail = (str) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str);
}
