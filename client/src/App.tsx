import FullPageLoader from './components/ui/FullPageLoader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './layout/Sidebar';
import { LazyExoticComponent, lazy, Suspense, useEffect, FC } from 'react';
import { Role } from './types/Roles';
import { setTitle } from './store/slices/globalSlice.ts/globalSlice';
import { useDispatch } from 'react-redux';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import useRouteHistory from './components/hooks/useRouteHistory';
interface RouteInfo {
    label: string;
    path: RoutesEnum;
    element: LazyExoticComponent<FC<{}>>;
    isPrivate: boolean;
    roles?: Role[]
}

export enum RoutesEnum {
    LOGIN = '/login',
    UNAUTHORIZED = '/unauthorized',
    DASHBOARD = '/dashboard',
    USER = '/user',
    KIOSK = '/kiosk',
    USER_DASHBOARD = '/userdashboard',
    TESTING = '/testing',
    NOT_FOUND = '*',
}

const routes: RouteInfo[] = [
    {
        label: 'Login',
        path: RoutesEnum.LOGIN,
        element: lazy(() => import('./pages/Login/Login')),
        isPrivate: false
    },
    {
        label: 'Unauthorized',
        path: RoutesEnum.UNAUTHORIZED,
        element: lazy(() => import('./components/error/Unauthorized')),
        isPrivate: false
    },
    {
        label: 'Not Found',
        path: RoutesEnum.NOT_FOUND,
        element: lazy(() => import('./components/error/NotFound')),
        isPrivate: false
    },
    {
        label: 'Dashboard',
        path: RoutesEnum.DASHBOARD,
        element: lazy(() => import('./pages/Home/Home')),
        roles: [Role.SUPER_ADMIN, Role.ADMIN],
        isPrivate: true
    },
    {
        label: 'User',
        path: RoutesEnum.USER,
        element: lazy(() => import('./pages/User/User')),
        roles: [Role.SUPER_ADMIN, Role.ADMIN],
        isPrivate: true
    },
    {
        label: 'Kiosk',
        path: RoutesEnum.KIOSK,
        element: lazy(() => import('./pages/Kiosk/Kiosk')),
        roles: [Role.SUPER_ADMIN, Role.ADMIN],
        isPrivate: true
    },
    //role:USER
    {
        label: 'User Dashboard',
        path: RoutesEnum.USER_DASHBOARD,
        element: lazy(() => import('./pages/UserDashboard/UserDashboard')),
        roles: [Role.USER],
        isPrivate: true
    },
    {
        label: 'Testing',
        path: RoutesEnum.TESTING,
        element: lazy(() => import('./pages/Testing/Testing')),
        isPrivate: false
    }
];

const App = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    // const routeHistory = useRouteHistory();
    // console.log(routeHistory);

    useEffect(() => {
        const currentRoute = routes.find(route => route.path === location.pathname);
        if (currentRoute) {
            dispatch(setTitle({ title: currentRoute.label }));
        }
    }, [location, dispatch]);
    return (
        <Suspense fallback={<FullPageLoader />}>
            <Routes>

                {routes.map(({ path, element: Element, isPrivate, roles }) =>
                    isPrivate ? (
                        <Route
                            key={path}
                            element={<ProtectedRoute requiredRoles={roles!} />}
                        >
                            <Route path="/" element={<Sidebar />}>
                                <Route path={path} element={<Element />} />
                            </Route>
                        </Route>
                    ) : (
                        <Route key={path} path={path} element={<Element />} />
                    )
                )}

                <Route path="/" element={<Navigate to={RoutesEnum.LOGIN} />} />// if this will be the first route then blink of sidebar wil not shown
                <Route path="*" element={<Navigate to={RoutesEnum.NOT_FOUND} />} />

            </Routes>
        </Suspense>
    )
}

export default App