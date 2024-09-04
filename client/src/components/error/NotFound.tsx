import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "../../assets/icons";
import ErrorComponent from "@/components/error/ErrorComponent";

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <ErrorComponent
            title='Page Not Found'
            message="The page you are looking for does not exist."
            buttonText='Go Back'
            onButtonClick={() => { navigate('/', { replace: true }) }}
            icon={<FaExclamationTriangle className="fa-5x text-8xl text-yellow-400"
            />}
        />
    );
};
export default NotFoundPage;
