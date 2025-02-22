import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
// import LoadingSpinner from "../component/LoadingSpinner";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredModule?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    requiredModule 
}) => {
    const { user, loading, isAuthorized } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        // Save the attempted location for redirect after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredModule && !isAuthorized(requiredModule)) {
        // Add unauthorized page or notification
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 
