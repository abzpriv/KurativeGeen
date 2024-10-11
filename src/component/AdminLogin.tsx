'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ThreeDots } from 'react-loader-spinner';

const Loader: React.FC = () => (
 <div className="flex flex-col items-center justify-center h-full">
    <ThreeDots 
      height="80" 
      width="80" 
      color="#4fa94d" 
      ariaLabel="three-dots-loading" 
      wrapperStyle={{}} 
      visible={true} 
    />
    <p className="text-xl text-black mt-4">Logging in...</p>
  </div>
);

interface ApiError {
  error?: string; 
  message?: string; 
}

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    setLoading(true); // Start loader

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Login failed'); 
      }

      const data = await response.json(); 
      alert(data.message); 
      router.push('/admin/dashboard'); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message); 
      } else {
        alert('An unknown error occurred'); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full border border-gray-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Admin Login</h2>

        {loading ? (
          <Loader /> 
        ) : (
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 ease-in-out"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 ease-in-out"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
