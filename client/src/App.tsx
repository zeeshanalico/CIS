import FullPageLoader from './components/ui/FullPageLoader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './layout/Sidebar';
import UserSidebar from './layout/UserSidebar';
import { lazy, Suspense, useEffect } from 'react';
import { Role } from './types/Roles';
import { setTitle } from './store/slices/globalSlice.ts/globalSlice';
import { useDispatch } from 'react-redux';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Vendor/Layout';

// Lazy-loaded components
const Login = lazy(() => import('./pages/Login/Login'));
const Unauthorized = lazy(() => import('./components/error/Unauthorized'));
const NotFound = lazy(() => import('./components/error/NotFound'));
const Home = lazy(() => import('./pages/Home/Home'));
const User = lazy(() => import('./pages/User/User'));
const Kiosk = lazy(() => import('./pages/Kiosk/Kiosk'));
const Vendor = lazy(() => import('./pages/Vendor/Vendor'));
const AddVendor = lazy(() => import('./pages/Vendor/AddVendor/AddVendor'));
const AddVendorPurchase = lazy(() => import('./pages/Vendor/AddVendorPurchase/AddVendorPurchase'));
const Report = lazy(() => import('./pages/Report/Report'));
const Setting = lazy(() => import('./pages/Setting/Setting'));
const UserDashboard = lazy(() => import('./pages/UserDashboard/UserDashboard'));
const Inventory = lazy(() => import('./pages/Inventory/Inventory'));
const Testing = lazy(() => import('./pages/Testing/Testing'));

// Enum for route paths
export enum RoutesEnum {
    LOGIN = '/login',
    UNAUTHORIZED = '/unauthorized',
    DASHBOARD = '/dashboard',
    USER = '/user',
    KIOSK = '/kiosk',
    TESTING = '/testing',
    NOT_FOUND = '*',
    USER_DASHBOARD = '/userdashboard',
    REPORT = '/report',
    SETTING = '/setting',
    INVENTORY = '/inventory',
    VENDOR = '/vendor',
    ADD_VENDOR = 'add-vendor',//
    ADD_VENDOR_PURCHASE = 'add-purchase'
}

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const currentRoute = location.pathname;
        let title = '';
        switch (currentRoute) {
            case RoutesEnum.LOGIN:
                title = 'Login';
                break;
            case RoutesEnum.UNAUTHORIZED:
                title = 'Unauthorized';
                break;
            case RoutesEnum.DASHBOARD:
                title = 'Dashboard';
                break;
            case RoutesEnum.USER:
                title = 'User';
                break;
            case RoutesEnum.KIOSK:
                title = 'Kiosk';
                break;
            case RoutesEnum.VENDOR:
                title = 'Vendor';
                break;
            case RoutesEnum.REPORT:
                title = 'Report';
                break;
            case RoutesEnum.SETTING:
                title = 'Setting';
                break;
            case RoutesEnum.USER_DASHBOARD:
                title = 'User Dashboard';
                break;
            case RoutesEnum.INVENTORY:
                title = 'Inventory';
                break;
            default:
                title = 'Not Found';
                break;
        }
        dispatch(setTitle({ title }));
    }, [location, dispatch]);

    return (
        <Suspense fallback={<FullPageLoader />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to={RoutesEnum.LOGIN} replace />} />
                <Route path={RoutesEnum.LOGIN} element={<Login />} />
                <Route path={RoutesEnum.UNAUTHORIZED} element={<Unauthorized />} />
                <Route path={RoutesEnum.TESTING} element={<Testing />} />

                {/* Protected Routes for Admins */}
                <Route element={<ProtectedRoute requiredRoles={[Role.SUPER_ADMIN, Role.ADMIN]} />}>
                    <Route path="/" element={<Sidebar />}>
                        <Route path={RoutesEnum.DASHBOARD} element={<Home />} />
                        <Route path={RoutesEnum.USER} element={<User />} />
                        <Route path={RoutesEnum.KIOSK} element={<Kiosk />} />
                        <Route path={RoutesEnum.REPORT} element={<Report />} />
                        <Route path={RoutesEnum.SETTING} element={<Setting />} />
                        {/* <Route path={RoutesEnum.VENDOR} element={<Vendor />} /> */}

                        <Route path={RoutesEnum.VENDOR} element={<Layout />} >
                            <Route path={RoutesEnum.ADD_VENDOR} element={<AddVendor />} />
                            <Route path={RoutesEnum.ADD_VENDOR_PURCHASE} element={<AddVendorPurchase />} />
                        </Route>

                    </Route>
                </Route>

                {/* Protected Routes for Users */}
                <Route element={<ProtectedRoute requiredRoles={[Role.USER]} />}>
                    <Route path="/" element={<UserSidebar />}>
                        <Route path={RoutesEnum.USER_DASHBOARD} element={<UserDashboard />} />
                        <Route path={RoutesEnum.INVENTORY} element={<Inventory />} />
                    </Route>
                </Route>

                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default App;
