import React, { use } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const{user}=use(AuthContext);
    const location=useLocation();
    console.log(location)

    if(user){
        return children;
    }
    return <Navigate to="/auth" state={location.pathname} replace></Navigate>
};

export default PrivateRoute;