import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
    const auth = localStorage.getItem('auth');
    return (
    
        auth ? <Navigate to = '/dashboard' /> : <Outlet/>
    )
};

export default AuthRoute;