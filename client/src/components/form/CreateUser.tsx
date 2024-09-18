import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUserAlt, FaUserShield, FaLock, FaExclamationCircle, MdOutlineAlternateEmail, FaEyeSlash, FaEye } from "../../assets/icons";
import { useState } from 'react';
import { useCreateUserMutation } from '@/store/slices/userSlice/userApiSlice';
import { Role } from '@/types/Roles';
import { errorHandler } from '../error/errorHandler';
import { successHandler } from '@/utils/successHandler';

export interface FormValues {
    name: string;
    email: string;
    password: string;
    role: Role;
}

const CreateUser = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [createUser, { isLoading }] = useCreateUserMutation();

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const response = await createUser(values).unwrap();
            successHandler(response)
        } catch (err: unknown) {
            setSubmitting(false);
            errorHandler(err)
        } finally {
            resetForm()
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                    Create a New User
                </h2>
                <Formik
                    initialValues={{ name: '', email: '', password: '', role: Role.USER }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name is required'),
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                        role: Yup.string().required('Role is required'),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                                    Name
                                </Label>
                                <div className='relative'>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <FaUserAlt />
                                    </span>
                                    <Input
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        className={`pl-10 w-full py-2 border ${errors.name && touched.name
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } rounded-md focus:ring-indigo-500 focus-visible:ring-transparent focus:border-indigo-500`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && touched.name && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                                            <FaExclamationCircle />
                                        </span>
                                    )}
                                </div>
                            </div>
                            {errors.name && touched.name && (
                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                            )}

                            <div className="mb-4">
                                <Label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                                    Email
                                </Label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                        <MdOutlineAlternateEmail />
                                    </span>
                                    <Input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={`pl-10 w-full py-2 border ${errors.email && touched.email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } rounded-md focus:ring-indigo-500 focus-visible:ring-transparent focus:border-indigo-500`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && touched.email && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                                            <FaExclamationCircle />
                                        </span>
                                    )}
                                </div>
                                {errors.email && touched.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <FaLock />
                                    </span>
                                    <Input
                                        type={passwordVisibility ? "text" : "password"}
                                        name="password"
                                        autoComplete='off'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className={`pl-10 w-full py-2 border ${errors.password && touched.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } rounded-md focus:ring-indigo-500 focus-visible:ring-transparent focus:border-indigo-500`}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && touched.password
                                        ? <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                                            <FaExclamationCircle />
                                        </span>
                                        : <span className="absolute inset-y-0 right-0 flex items-center pe-3 text-gray-400">
                                            {passwordVisibility ? <FaEyeSlash onClick={togglePasswordVisibility} /> : <FaEye onClick={togglePasswordVisibility} />}
                                        </span>
                                    }
                                </div>
                                {errors.password && touched.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div className="mb-4">

                                <Label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">
                                    Role
                                </Label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                                        <FaUserShield className='w-8' />
                                    </span>
                                    <select
                                        disabled
                                        name="role"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.role}
                                        className="pl-10 w-full py-2 border border-gray-300 rounded-md focus-visible:ring-transparent outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        {Object.values(Role).map((value) => (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.role && touched.role && (
                                        <p className="mt-2 text-sm text-red-600 ">{errors.role}</p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={isSubmitting || isLoading}
                            >
                                {isSubmitting || isLoading ? 'Creating...' : 'Create User'}
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateUser;
