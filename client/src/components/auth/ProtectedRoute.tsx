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
    console.log('ProtectedRoute');
    
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
                        const response = await refreshToken().unwrap();
                        dispatch(setCredentials({ accessToken: response.result.accessToken, user: response.result.user }));
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
            console.log(requiredRoles, user?.roles);

            if (requiredRoles.length > 0 && !requiredRoles.some(role => user?.roles?.includes(role))) {
                navigate('/unauthorized');
            }
        }
    }, [isAuthChecked, accessToken, requiredRoles, user, navigate]);

    // if (isLoading || !isAuthChecked) {
    //     return <FullPageLoader />;
    // }

    return <Outlet />;
};

export default ProtectedRoute