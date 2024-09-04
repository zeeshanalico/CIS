import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBan } from '../../assets/icons';
import ErrorComponent from '@/components/error/ErrorComponent';
const Unauthorized: React.FC = () => {
    const navigate = useNavigate();
    return (
        <ErrorComponent
            title='Unauthorized'
            message="You do not have the required permissions to access this page."
            buttonText='Go Back'
            onButtonClick={() => navigate(-1)}
            icon={<FaBan className="fa-5x text-8xl text-red-600" />} />
    );
};

export default Unauthorized;
