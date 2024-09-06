import './index.css';
import { StrictMode, Suspense, lazy } from 'react';
import { LazyExoticComponent, FC } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import FullPageLoader from './components/ui/FullPageLoader';
import ErrorBoundary from './components/error/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './layout/Sidebar';
import { Role } from './types/Roles';
interface RouteInfo {
  label: string;
  path: RoutesEnum;
  element: LazyExoticComponent<FC<{}>>;
  isPrivate: boolean;
  roles?: Role[]
}

enum RoutesEnum {
  LOGIN = '/login',
  UNAUTHORIZED = '/unauthorized',
  DASHBOARD = '/dashboard',
  USER = '/user',
  KIOSK = 'kiosk',
  USER_DASHBOARD = '/userdashboard',
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
  }
];

const App = () => (
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<FullPageLoader />}>
            <Routes>

              <Route path="/" element={<Navigate to={RoutesEnum.LOGIN} />} />

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

              <Route path="*" element={<Navigate to={RoutesEnum.NOT_FOUND} />} />

            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
      <Toaster />
    </ErrorBoundary>
  </StrictMode>
);

createRoot(document.getElementById('root')!).render(<App />);
