import HomePage from "../pages/HomePage";
import ScannerPage from "../pages/ScannerPage";
import SignInPage from "../pages/SignInPage";
import AddStudentPage from "../pages/AddStudentPage";
import CreateCoursePage from "../pages/CreateCoursePage";
import StudentManagementPage from "../pages/StudentManagementPage";
import ClassAssignmentPage from "../pages/ClassAssignmentPage";
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
        path: '/signin',
        page: SignInPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/addstudent',
        page: AddStudentPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/studentmanagement',
        page: StudentManagementPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/createcourse',
        page: CreateCoursePage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/classassignment',
        page: ClassAssignmentPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
    {
        path: '/addteacher',
        page: AddTeacherPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivate: false,
        exact: false,
    },
]