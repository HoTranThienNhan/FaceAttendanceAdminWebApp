import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import AddStudentPage from "../pages/AddStudentPage";
import CourseManagementPage from "../pages/CourseManagementPage";
import StudentManagementPage from "../pages/StudentManagementPage";
import ClassAssignmentPage from "../pages/ClassAssignmentPage";
import ClassManagementPage from "../pages/ClassManagementPage";
import TeacherManagementPage from "../pages/TeacherManagementPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/add-student',
        page: AddStudentPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/student-management',
        page: StudentManagementPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/course-management',
        page: CourseManagementPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/class-assignment',
        page: ClassAssignmentPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/class-management',
        page: ClassManagementPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/teacher-management',
        page: TeacherManagementPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
]