import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // const { setAuthToken, setIsAuthenticated, authToken, isAuthenticated } = useAuth();
    // console.log("isAuthenticated 2:", isAuthenticated);
    // console.log("authToken 2:", authToken);
    const auth = localStorage.getItem('auth');
    return (
        // auth.token ? <Outlet/> : <Navigate to = '/' />
    
        auth ? <Outlet/> : <Navigate to = '/login' />
    )
};

export default ProtectedRoute;