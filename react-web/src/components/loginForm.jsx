import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../actions/loginAction";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            // console.log('Login values:', values);
            setLoading(true);

            let apiData = {
                email: values.email.trim(),
                password: values.password.trim()
            };

            // Api call
            try {
                await loginUser(apiData);
                navigate('/');
                setTimeout(() => {
                    resetForm();
                }, 2000);
            } catch (error) {
                console.error('Login error:', error);
                // Handle error (e.g., show error message)
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="login-form bg-white/8 backdrop-blur-sm rounded-xl border shadow-md p-5 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-1 text-start text-gray-800">Login to your account</h1>
                <h6 className="text-sm text-gray-900 mb-4">Welcome back! Please enter your details below.</h6>

                <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email<span className="text-red-600">*</span></label>
                        <input
                            type="email"
                            id="email"
                            value={formik.values.email}
                            placeholder="Enter your email"
                            onChange={(e) => formik.handleChange(e)}
                            onBlur={formik.handleBlur}
                            className={`mt-1 block w-full px-3 py-2 border ${formik.touched.email && formik.errors.email ? 'border-red-600' : 'border-gray-300'} rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span className="text-red-600 text-sm mt-1">{formik.errors.email}</span>
                        ) : null}
                    </div>

                    <div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password<span className="text-red-600">*</span></label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formik.values.password}
                                placeholder="Enter your password"
                                onChange={(e) => formik.handleChange(e)}
                                onBlur={formik.handleBlur}
                                autoComplete="current-password"
                                className={`mt-1 block w-full px-3 py-2 border ${formik.touched.password && formik.errors.password ? 'border-red-600' : 'border-gray-300'} rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                required
                            />
                            <span
                                className="absolute right-5 top-12 -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <AiOutlineEye className="text-gray-500" size={20} />
                                ) : (
                                    <AiOutlineEyeInvisible className="text-gray-500" size={20} />
                                )}
                            </span>
                            {formik.touched.password && formik.errors.password ? (
                                <span className="text-red-600 text-sm mt-1">{formik.errors.password}</span>
                            ) : null}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            disabled={loading}
                            style={{ backgroundColor: loading ? '#ccc' : '#3b82f6', cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : (
                                <>
                                    <span>Login</span>
                                    <svg className="hidden sm:inline w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-sm text-center border-t border-gray-300 pt-4">
                    <p className="text-gray-600">
                        Don't have an account? <a href="#" className="text-blue-600 hover:underline">Register Now</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;