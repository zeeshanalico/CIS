import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation, } from '@/store/slices/authSlice/authApiSlice';
import { useNavigate,} from 'react-router-dom';
import { useDispatch,  } from 'react-redux';
import { FaUserAlt, FaLock, FaExclamationCircle, FaEyeSlash, FaEye } from "../../assets/icons";
import { clearCredentials, setCredentials, } from '@/store/slices/authSlice/authSlice';
import { Role } from '@/types/roles';
import { errorHandler } from '@/components/error/errorHandler';
// import { RootState } from '@/store/store';
import { successHandler } from '@/utils/successHandler';

export interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const dispatch = useDispatch();
  // const auth = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation();

  // useEffect(() => {
  //   if (auth.accessToken && auth.user) navigate('/dashboard', { replace: true })
  // })

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const response = await login(values).unwrap();
      const { accessToken, user } = response.result;
      
      dispatch(setCredentials({ accessToken, user }));
      if (user.roles?.includes(Role.SUPER_ADMIN)) {
        navigate('/dashboard', { replace: true })
      }
      if (user.roles?.includes(Role.USER)) {
        navigate('/userdashboard', { replace: true })
      }
      successHandler(response);
    } catch (err: unknown) {
      errorHandler(err)
    } finally {
      clearCredentials();
      setSubmitting(false);
      setSubmitting(false);

    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Login to Your Account
        </h2>
        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            remember: Yup.boolean()
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
                <Label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaUserAlt />
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='off'
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

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    name="remember"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.remember}
                    className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 h-4 w-4"
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          )}
        </Formik>
        <p className="mt-6 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
