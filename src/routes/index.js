import HomePage from "../pages/HomePage";
import ScannerPage from "../pages/ScannerPage";
import SignInPage from "../pages/SignInPage";
import AddStudentPage from "../pages/AddStudentPage";
import CreateCoursePage from "../pages/CreateCoursePage";
import StudentManagementPage from "../pages/StudentManagementPage";
import ClassAssignmentPage from "../pages/ClassAssignmentPage";
import ClassManagementPage from "../pages/ClassManagementPage";
import AddTeacherPage from "../pages/AddTeacherPage";

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
        path: '/scanner',
        page: ScannerPage,
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
        path: '/create-course',
        page: CreateCoursePage,
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
        path: '/add-teacher',
        page: AddTeacherPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
]