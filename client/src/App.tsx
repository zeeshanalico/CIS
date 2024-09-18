import FullPageLoader from './components/ui/FullPageLoader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './layout/Sidebar';
import UserSidebar from './layout/UserSidebar';
import { lazy, Suspense, useEffect } from 'react';
import { Role } from './types/Roles';
import { setTitle } from './store/slices/globalSlice.ts/globalSlice';
import { useDispatch } from 'react-redux';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import VendorLayout from './pages/Vendor/Layout';
import InventoryLayout from './pages/Inventory/Layout';
import KioskLayout from './pages/Kiosk/Layout';
import UserLayout from './pages/User/Layout';


// Lazy-loaded components
const Login = lazy(() => import('./pages/Login/Login'));
const Unauthorized = lazy(() => import('./components/error/Unauthorized'));
const NotFound = lazy(() => import('./components/error/NotFound'));
const Home = lazy(() => import('./pages/Home/Home'));
const User = lazy(() => import('./pages/User/User'));
const AddVendor = lazy(() => import('./pages/Vendor/AddVendor/AddVendor'));
const AddVendorPurchase = lazy(() => import('./pages/Vendor/AddVendorPurchase/AddVendorPurchase'));
const Report = lazy(() => import('./pages/Report/Report'));
const Setting = lazy(() => import('./pages/Setting/Setting'));
const UserDashboard = lazy(() => import('./pages/UserDashboard/UserDashboard'));
const Testing = lazy(() => import('./pages/Testing/Testing'));
const AddNewInventory = lazy(() => import('./pages/Inventory/AddNewInventory/AddNewInventory'));
const Stock = lazy(() => import('./pages/Inventory/Stock/Stock'))
const CreateKiosk = lazy(() => import('./pages/Kiosk/CreateKiosk'));
const ExistingKiosksTable = lazy(() => import('./pages/Kiosk/ExistingKiosksTable'));
const CreateUser = lazy(() => import('./components/form/CreateUser'));
const UserTable = lazy(() => import('./pages/User/UserTable'));


export enum RoutesEnum {
    LOGIN = '/login',
    UNAUTHORIZED = '/unauthorized',
    DASHBOARD = '/dashboard',
    TESTING = '/testing',
    NOT_FOUND = '*',
    USER_DASHBOARD = '/userdashboard',
    REPORT = '/report',
    SETTING = '/setting',

    USER = '/user',//for naming purpose
    CREATE_USER = 'create-user',
    EXISTING_USERS = 'existing-users',

    KIOSK = '/kiosk',//for naming purpose
    ADD_NEW_KIOSK = 'add-new-kiosk',
    EXISTED_KIOSKS = 'exsited-kiosks',

    INVENTORY = '/inventory',//for naming purpose
    ADD_NEW_INVENTORY = 'add-new-inventory',
    STOCK = 'stock',

    VENDOR = '/vendor',//for naming purpose
    ADD_VENDOR = 'add-vendor',
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
            case `${RoutesEnum.USER}/${RoutesEnum.CREATE_USER}`:
                title = 'User';
                break;
            case `${RoutesEnum.USER}/${RoutesEnum.EXISTING_USERS}`:
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
            case `${RoutesEnum.VENDOR}/${RoutesEnum.ADD_VENDOR}`:
                title = 'Vendor';
                break;
            case `${RoutesEnum.VENDOR}/${RoutesEnum.ADD_VENDOR_PURCHASE}`:
                title = 'Vendor';
                break;
            case `${RoutesEnum.INVENTORY}/${RoutesEnum.ADD_NEW_INVENTORY}`:
                title = 'Inventory';
                break;
            case `${RoutesEnum.INVENTORY}/${RoutesEnum.STOCK}`:
                title = 'Inventory';
                break;
            case `${RoutesEnum.KIOSK}/${RoutesEnum.ADD_NEW_KIOSK}`:
                title = 'Kiosk';
                break;
            case `${RoutesEnum.KIOSK}/${RoutesEnum.EXISTED_KIOSKS}`:
                title = 'Kiosk';
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
                        {/* <Route path={RoutesEnum.USER} element={<User />} /> */}
                        <Route path={RoutesEnum.USER} element={<UserLayout />} >
                            <Route path={RoutesEnum.CREATE_USER} element={<CreateUser />} />
                            <Route path={RoutesEnum.EXISTING_USERS} element={<UserTable />} />
                        </Route>



                        <Route path={RoutesEnum.REPORT} element={<Report />} />
                        <Route path={RoutesEnum.SETTING} element={<Setting />} />

                        <Route path={RoutesEnum.KIOSK} element={<KioskLayout />} >
                            <Route path={RoutesEnum.ADD_NEW_KIOSK} element={<CreateKiosk />} />
                            <Route path={RoutesEnum.EXISTED_KIOSKS} element={<ExistingKiosksTable />} />
                        </Route>

                        <Route path={RoutesEnum.VENDOR} element={<VendorLayout />} >
                            <Route path={RoutesEnum.ADD_VENDOR} element={<AddVendor />} />
                            <Route path={RoutesEnum.ADD_VENDOR_PURCHASE} element={<AddVendorPurchase />} />
                        </Route>

                    </Route>
                </Route>

                {/* Protected Routes for Users */}
                <Route element={<ProtectedRoute requiredRoles={[Role.USER]} />}>
                    <Route path="/" element={<UserSidebar />}>
                        <Route path={RoutesEnum.USER_DASHBOARD} element={<UserDashboard />} />
                        <Route path={RoutesEnum.INVENTORY} element={<InventoryLayout />} >
                            <Route path={RoutesEnum.ADD_NEW_INVENTORY} element={<AddNewInventory />} />
                            <Route path={RoutesEnum.STOCK} element={<Stock />} />
                        </Route>
                    </Route>
                </Route>

                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default App;
