import axios from "axios";

export const getTest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/test`);
    return res.data;
}

export const signIn = async (username, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/signin_admin?username=${username}&password=${password}`);
    return res.data;
}

export const createScan = async (newuser) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/create_scan?newuser=${newuser}`)
        .catch((error) => {
            throw new Error(error.response.data.message)
        });
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

export const getAllUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_users`);
    return res.data;
}

export const getAllStudents = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_students`);
    return res.data;
}

export const getAvailableStudents = async (teacherid, courseid) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_available_students?teacherid=${teacherid}&courseid=${courseid}`);
    return res.data;
}

export const updateStudent = async (id, fullname, phone, address, email) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_student?id=${id}&fullname=${fullname}&phone=${phone}&address=${address}&email=${email}`);
    return res.data;
}


export const createCourse = async (id, name, description, active) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/create_course?id=${id}&name=${name}&description=${description}&active=${active}`)
        .catch((error) => {
            throw new Error(error.response.data.message)
        });
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

export const getAllActiveCourses = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_active_courses`);
    return res.data;
}

export const getAllTeachers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_teachers`);
    return res.data;
}

export const addTeacher = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/add_teacher`, data)
        .catch((error) => {
            throw new Error(error.response.data.message)
        });
    return res.data;
}

export const updateTeacher = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_teacher`, data);
    return res.data;
}

export const createClass = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/create_class`, data)
        .catch((error) => {
            throw new Error(error.response.data.message)
        });
    return res.data;
}

export const getAllClasses = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_classes`, data);
    return res.data;
}

export const getAllStudentsByClass = async (classid) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_students_by_class?classid=${classid}`);
    return res.data;
}

export const getStudentImage = async (studentid) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_student_image?studentid=${studentid}`);
    return res.data;
}

export const getAllClassTime = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_class_time`);
    return res.data;
}

export const getClassTimeByClassId = async (classid) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_class_time_by_class_id?classid=${classid}`);
    return res.data;
}