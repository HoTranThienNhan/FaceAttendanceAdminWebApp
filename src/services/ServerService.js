import axios from "axios";

export const getTest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/test`);
    return res.data;
}

export const signIn = async (username, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/signin?username=${username}&password=${password}`);
    return res.data;
}

export const createScan = async (newuser) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/create_scan?newuser=${newuser}`);
    return res.data;
}