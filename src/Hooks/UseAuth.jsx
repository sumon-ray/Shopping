import React, { useContext } from 'react';
import { UserContext } from '../Components/AuthProvider/AuthProvider';
// import { UserContext } from '../AuthProvider/AuthProvider';

const UseAuth = () => {
    const useAuth = useContext(UserContext)
    return useAuth
};

export default UseAuth;