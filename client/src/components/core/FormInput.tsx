import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaExclamationCircle } from "../../assets/icons";
import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    icon: React.ReactNode;
    error?: string;
    touched?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    icon,
    error,
    touched,
    ...props
}) => {
    return (
        <div className="mb-4">
            <Label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
                {label}
            </Label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    {icon}
                </span>
                <Input
                    name={name}
                    autoComplete="off"
                    className={`pl-10 w-full py-2 border ${error && touched ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-indigo-500 focus-visible:ring-transparent focus:border-indigo-500`}
                    {...props}
                />
                {error && touched && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                        <FaExclamationCircle />
                    </span>
                )}
            </div>
            {error && touched && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default FormInput;
