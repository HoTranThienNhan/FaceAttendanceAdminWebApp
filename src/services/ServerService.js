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

export const addNew = async (studentId) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/add_new?studentId=${studentId}`);
    return res.data;
}

export const refreshScan = async (newuser) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh_scan?newuser=${newuser}`);
    return res.data;
}

export const rescan = async (studentId) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/rescan?studentId=${studentId}`);
    return res.data;
}

export const readd = async (studentId) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/readd?studentId=${studentId}`);
    return res.data;
}

export const getAllStudents = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_students`);
    return res.data;
}

export const updateStudent = async (id, fullname, phone, address, email) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_student?id=${id}&fullname=${fullname}&phone=${phone}&address=${address}&email=${email}`);
    return res.data;
}


export const createCourse = async (id, name, description, active) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/create_course?id=${id}&name=${name}&description=${description}&active=${active}`);
    return res.data;
}

export const updateCourse = async (id, name, description) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_course?id=${id}&name=${name}&description=${description}`);
    return res.data;
}

export const updateStatusCourse = async (id, active) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_status_course?id=${id}&active=${active}`);
    return res.data;
}

export const getAllCourses = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_courses`);
    return res.data;
}