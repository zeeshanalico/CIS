import './index.css';
import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import FullPageLoader from './components/ui/FullPageLoader';
import ErrorBoundary from './components/error/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './layout/Sidebar'; // Import Sidebar here

import { Role } from './types/Roles';

// Lazy load components
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const User = lazy(() => import('./pages/User/User'));
const Kiosk = lazy(() => import('./pages/Kiosk/Kiosk'));

const Unauthorized = lazy(() => import('./components/error/Unauthorized'));
const NotFound = lazy(() => import('./components/error/NotFound'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<FullPageLoader />}>
            <Routes>
              {/* public routes */}
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/unauthorized' element={<Unauthorized />} />
              <Route path='/login' element={<Login />} />

              {/* private routes with persistent sidebar */}
              <Route element={<ProtectedRoute requiredRoles={[Role.SUPER_ADMIN]} />}>
                <Route path="/" element={<Sidebar />}>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<Home />} />
                  <Route path="user" element={<User />} />
                  <Route path="kiosk" element={<Kiosk />} />
                </Route>
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
      <Toaster />
    </ErrorBoundary>
  </StrictMode>
);
