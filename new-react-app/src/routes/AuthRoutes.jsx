import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoutes = ({children}) => {
    const {checkAuth} = useContext(AuthContext);
    const location = useLocation();
    window.prevURL = location;
  return (
   checkAuth?.isAuth?
   [...children]
   :
   <Navigate to={'/login'}/>
  )
}

export default AuthRoutes
