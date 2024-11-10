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
import CustomerLayout from './pages/Customer/Layout';
import { AnimatePresence } from 'framer-motion';
import { AnimateRouteX, AnimateRouteY } from './components/ui/AnimateRoute';

// Lazy-loaded components
const Login = lazy(() => import('./pages/Login/Login'));
const Unauthorized = lazy(() => import('./components/error/Unauthorized'));
const NotFound = lazy(() => import('./components/error/NotFound'));
const Home = lazy(() => import('./pages/Home/Home'));
const AddVendor = lazy(() => import('./pages/Vendor/AddVendor/AddVendor'));
// const AddVendorPurchase = lazy(() => import('./pages/Vendor/AddVendorPurchase/AddVendorPurchase'));
const Report = lazy(() => import('./pages/Report/Report'));
const Setting = lazy(() => import('./pages/Setting/Setting'));
const UserDashboard = lazy(() => import('./pages/UserDashboard/UserDashboard'));
const Sale = lazy(() => import('./pages/Sale/Sale'));
const Testing = lazy(() => import('./pages/Testing/Testing'));
const AddNewInventory = lazy(() => import('./pages/Inventory/AddNewInventory/AddNewInventory'));
const AddVendorPurchase = lazy(() => import('./pages/Inventory/AddVendorPurchase/AddVendorPurchase'));
const Stock = lazy(() => import('./pages/Inventory/Stock/Stock'))
const CreateKiosk = lazy(() => import('./pages/Kiosk/CreateKiosk'));
const ExistingKiosksTable = lazy(() => import('./pages/Kiosk/ExistingKiosksTable'));
const CreateUser = lazy(() => import('./pages/User/CreateUser'));
const UserTable = lazy(() => import('./pages/User/UserTable'));
const CustomerTable = lazy(() => import('./pages/Customer/ExistingCustomers/CustomerTable'));
const CreateCustomer = lazy(() => import('./pages/Customer/CreateCustomer/CreateCustomer'));
const LandingPage = lazy(() => import('./pages/Landing'));
const ProductsPage = lazy(() => import('./pages/Public/ProductsPage'));


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

    CUSTOMER = '/customer',//for naming purpose
    ADD_NEW_CUSTOMER = 'add-new-customer',
    EXISTED_CUSTOMERS = 'existing-customers',

    INVENTORY = '/inventory',//for naming purpose
    ADD_NEW_INVENTORY = 'add-new-inventory',

    STOCK = 'stock',
    
    ADD_VENDOR_PURCHASE = '/add-vendor-purchase',

    VENDOR = '/vendor',//for naming purpose
    ADD_VENDOR = 'add-vendor',

    SALE = '/sale',
}

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const currentRoute = location.pathname;
        let title = '';
        switch (currentRoute) {
            
            case RoutesEnum.LOGIN: title = 'Login'; break;
            case RoutesEnum.UNAUTHORIZED: title = 'Unauthorized'; break;
            case RoutesEnum.DASHBOARD: title = 'Dashboard'; break;

            case RoutesEnum.USER: title = 'User'; break;
            case `${RoutesEnum.USER}/${RoutesEnum.CREATE_USER}`: title = 'User'; break;
            case `${RoutesEnum.USER}/${RoutesEnum.EXISTING_USERS}`:
                title = 'User'; break;

            case RoutesEnum.KIOSK:
                title = 'Kiosk'; break;

            case RoutesEnum.VENDOR:
                title = 'Vendor'; break;

            case RoutesEnum.REPORT:
                title = 'Report'; break;

            case RoutesEnum.SETTING:
                title = 'Setting'; break;

            case RoutesEnum.USER_DASHBOARD:
                title = 'User Dashboard'; break;

            case `${RoutesEnum.VENDOR}/${RoutesEnum.ADD_VENDOR}`:
                title = 'Vendor'; break;

            case `${RoutesEnum.INVENTORY}/${RoutesEnum.ADD_NEW_INVENTORY}`:
                title = 'Inventory'; break;
            case `${RoutesEnum.INVENTORY}/${RoutesEnum.STOCK}`:
                title = 'Inventory'; break;
            // case `${RoutesEnum.INVENTORY}/${RoutesEnum.ADD_VENDOR_PURCHASE}`:
            //     title = 'Inventory'; break;

            case `${RoutesEnum.CUSTOMER}/${RoutesEnum.ADD_NEW_CUSTOMER}`:
                title = 'Customer'; break;
            case `${RoutesEnum.CUSTOMER}/${RoutesEnum.EXISTED_CUSTOMERS}`:
                title = 'Customer'; break;

            case `${RoutesEnum.KIOSK}/${RoutesEnum.ADD_NEW_KIOSK}`:
                title = 'Kiosk'; break;
            case `${RoutesEnum.KIOSK}/${RoutesEnum.EXISTED_KIOSKS}`:
                title = 'Kiosk'; break;

            case `${RoutesEnum.ADD_VENDOR_PURCHASE}`:
                title = 'Vendor Purchases'; break;

            case RoutesEnum.SALE:
                title = 'Sale';
                break;
            default:
                title = 'Not Found';
                break;
        }
        dispatch(setTitle({ title }));
    }, [location, dispatch]);

    return (
        <Suspense fallback={<FullPageLoader />}>
            <AnimatePresence mode='wait'>

                {/* <Routes> */}
                <Routes location={location} key={location.key}>

                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path={RoutesEnum.LOGIN} element={<AnimateRouteY fullPath={RoutesEnum.LOGIN} element={<Login />} />} />
                    <Route path={RoutesEnum.UNAUTHORIZED} element={<Unauthorized />} />
                    <Route path={RoutesEnum.TESTING} element={<Testing />} />

                    {/* Protected Routes for Admins */}
                    <Route element={<ProtectedRoute requiredRoles={[Role.SUPER_ADMIN, Role.ADMIN]} />}>
                        <Route path="/" element={<Sidebar />}>
                            <Route path={RoutesEnum.DASHBOARD} element={<Home />} />

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

                            <Route path={RoutesEnum.CUSTOMER} element={<CustomerLayout />} >
                                <Route path={RoutesEnum.ADD_NEW_CUSTOMER} element={<AnimateRouteX fullPath={`${RoutesEnum.CUSTOMER}/${RoutesEnum.ADD_NEW_CUSTOMER}`} element={<CreateCustomer />} />} />
                                <Route path={RoutesEnum.EXISTED_CUSTOMERS} element={<AnimateRouteX fullPath={`${RoutesEnum.CUSTOMER}/${RoutesEnum.EXISTED_CUSTOMERS}`} element={<CustomerTable />} />} />
                            </Route>

                            <Route path={RoutesEnum.VENDOR} element={<VendorLayout />} >
                                <Route path={RoutesEnum.ADD_VENDOR} element={<AddVendor />} />
                            </Route>

                        </Route>
                    </Route>

                    {/* Protected Routes for Users */}
                    <Route element={<ProtectedRoute requiredRoles={[Role.USER]} />}>
                        <Route path="/" element={<UserSidebar />}>
                            <Route path={RoutesEnum.USER_DASHBOARD} element={<UserDashboard />} />
                            <Route path={RoutesEnum.SALE} element={<Sale />} />
                            <Route path={RoutesEnum.ADD_VENDOR_PURCHASE} element={<AddVendorPurchase />} />
                            <Route path={RoutesEnum.INVENTORY} element={<InventoryLayout />} >
                                <Route path={RoutesEnum.ADD_NEW_INVENTORY} element={<AddNewInventory />} />
                                <Route path={RoutesEnum.STOCK} element={<Stock />} />
                            </Route>
                        </Route>
                    </Route>

                    {/* Not Found Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};

export default App;
