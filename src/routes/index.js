import HomePage from "../pages/HomePage";
import ScannerPage from "../pages/ScannerPage";
import SignInPage from "../pages/SignInPage";
import AddNewPage from "../pages/AddNewPage";

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
]