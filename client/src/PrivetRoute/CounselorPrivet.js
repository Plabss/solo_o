/* eslint-disable prettier/prettier */
import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CounselorPrivet = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const location = useLocation();


    if (user?.role === 'Counselor'){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default CounselorPrivet;