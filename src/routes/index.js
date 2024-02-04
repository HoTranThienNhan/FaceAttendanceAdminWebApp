import HomePage from "../pages/HomePage";
import ScannerPage from "../pages/ScannerPage";
import SignInPage from "../pages/SignInPage";
import AddNewPage from "../pages/AddNewPage";
import CreateCoursePage from "../pages/CreateCoursePage";
import StudentManagementPage from "../pages/StudentManagementPage";
import ClassAssignmentPage from "../pages/ClassAssignmentPage";

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
        path: '/addnew',
        page: AddNewPage,
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
]