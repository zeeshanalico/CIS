import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { Role } from '@/types/Roles';
import { setCredentials, clearCredentials } from '@/store/slices/authSlice/authSlice';
import { useRefreshTokenMutation } from '@/store/slices/authSlice/authApiSlice';
import { useRef } from 'react';
import FullPageLoader from '../ui/FullPageLoader';
interface ProtectedRouteProps {
    requiredRoles?: Role[];
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles = [] }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { accessToken, user } = useSelector((state: RootState) => state.auth);

    const [refreshToken, { isLoading }] = useRefreshTokenMutation();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const refreshTokenCalled = useRef(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!accessToken) {
                if (!refreshTokenCalled.current) {
                    refreshTokenCalled.current = true;
                    try {
                        const result = await refreshToken().unwrap();
                        dispatch(setCredentials({ accessToken: result.accessToken }));
                    } catch (error) {
                        dispatch(clearCredentials());
                        navigate('/login', { replace: true });
                    }
                }
            }
            setIsAuthChecked(true);
        };

        checkAuth();
    }, [accessToken, dispatch, navigate, refreshToken]);

    useEffect(() => {
        if (isAuthChecked && accessToken) {
            if (requiredRoles.length > 0 && !requiredRoles.some(role => user?.roles?.includes(role))) {
                navigate('/unauthorized', { replace: true });
            }
        }
    }, [isAuthChecked, accessToken, requiredRoles, user, navigate]);

    if (isLoading || !isAuthChecked) {
        return <FullPageLoader/>; // Replace with your loading indicator
    }

    return <Outlet />;
};

export default ProtectedRoute