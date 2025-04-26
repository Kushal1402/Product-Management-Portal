import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('product_access_token');

    // Check if user is authenticated first
    if (!isAuthenticated || isAuthenticated === null || isAuthenticated === undefined) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export const AuthRoute = () => {
    const isAuthenticated = localStorage.getItem('product_access_token');
    
    // If not authenticated, allow access to auth routes (like login)
    if (!isAuthenticated) {
        return <Outlet />;
    }
    
    // If authenticated, get user role and redirect accordingly
    const userData = localStorage.getItem('user');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const userRole = parsedUserData ? parsedUserData.role : null;
    
    // Redirect based on role
    if (userRole === 'admin') {
        return <Navigate to="/" replace />;
    } else if (userRole === 'user') {
        return <Navigate to="/form" replace />;
    }
    
    // Default fallback
    return <Outlet />;
};

export const AdminRoute = () => {
    const isAuthenticated = localStorage.getItem('product_access_token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // Get user data and role
    const userData = localStorage.getItem('user');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const userRole = parsedUserData ? parsedUserData.role : null;
    
    if (userRole !== 'admin') {
        return <Navigate to="/form" replace />;
    }
    
    return <Outlet />;
};

export const UserRoute = () => {
    const isAuthenticated = localStorage.getItem('product_access_token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // Get user data and role
    const userData = localStorage.getItem('user');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const userRole = parsedUserData ? parsedUserData.role : null;

    if (userRole !== 'user') {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
};