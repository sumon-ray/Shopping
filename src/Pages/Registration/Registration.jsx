import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import signUp from '../../../src/assets/signUp.svg';
import UseAuth from '../../Hooks/UseAuth';

const Registration = () => {
    const { registerUser,loginWithGoogle } = UseAuth();
    const [product, setProduct] = useState({ email: '', password: '' });
  const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = product;
        registerUser(email, password);
        alert('regestered successfully')
        navigate("/login");

        // Pass email and password to the registerUser function
    };

    return (
        <div className='flex my-10 container mx-auto px-4 lg:px-24 lg:flex-row-reverse sm:flex-col justify-around items-center'>
            <div className="hidden md:block">
                <img className='w-full' src={signUp} alt="Sign Up" />
            </div>
            <div className="outline lg:w-4/12 flex mx-auto flex-col p-8 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                    <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
                </div>
                <form onSubmit={handleSubmit} noValidate className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input
                                type="email"
                                onChange={handleChange}
                                value={product.email}
                                name="email"
                                id="email"
                                placeholder="leroy@jenkins.com"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                onChange={handleChange}
                                value={product.password}
                                name="password"
                                id="password"
                                placeholder="*****"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 btn btn-outline font-semibold rounded-md dark:bg-lime-600 dark:text-gray-50">
                                Sign up
                            </button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-600">
                            Already have an account?
                            <NavLink to='/login' className="hover:underline dark:text-lime-600 text-blue-400">
                                Sign in
                            </NavLink>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
