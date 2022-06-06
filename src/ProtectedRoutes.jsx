import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Auth from './pages/Auth';

// Hook to check if there is auser who is logged in
const useAuth = () => {
    const user = {loggedIn: localStorage.getItem("loggedIn")};   
    return user && user.loggedIn
}

const ProtectedRoutes = () => {

    console.log(useAuth())

    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/auth" />
}

export default ProtectedRoutes